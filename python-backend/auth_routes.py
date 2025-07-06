from datetime import timedelta
from typing import Optional
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from email_validator import validate_email, EmailNotValidError
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase

from database import get_database
from models import UserCreate, UserLogin, TokenRefresh, User, Token, UserInDB, TokenData
from auth_utils import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token,
    verify_token,
    verify_refresh_token,
    validate_password,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

# Create router
router = APIRouter(prefix="/auth", tags=["authentication"])

# Security
security = HTTPBearer()

async def get_user_by_email(db: AsyncIOMotorDatabase, email: str) -> Optional[UserInDB]:
    """Get user by email from database."""
    user_doc = await db.users.find_one({"email": email})
    if user_doc:
        user_doc["id"] = str(user_doc["_id"])
        return UserInDB(**user_doc)
    return None

async def get_user_by_id(db: AsyncIOMotorDatabase, user_id: str) -> Optional[UserInDB]:
    """Get user by ID from database."""
    try:
        user_doc = await db.users.find_one({"_id": ObjectId(user_id)})
        if user_doc:
            user_doc["id"] = str(user_doc["_id"])
            return UserInDB(**user_doc)
    except Exception:
        pass
    return None

async def create_user(db: AsyncIOMotorDatabase, user: UserCreate) -> UserInDB:
    """Create new user in database."""
    user_dict = {
        "name": user.name,
        "email": user.email,
        "hashed_password": get_password_hash(user.password),
        "provider": "local",
        "resumes": [],
        "preferences": {},
        "is_active": True
    }
    
    result = await db.users.insert_one(user_dict)
    user_dict["id"] = str(result.inserted_id)
    user_dict["_id"] = result.inserted_id
    
    return UserInDB(**user_dict)

async def authenticate_user(db: AsyncIOMotorDatabase, email: str, password: str) -> Optional[UserInDB]:
    """Authenticate user credentials."""
    user = await get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> User:
    """Get current authenticated user."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    token_data = verify_token(credentials.credentials, credentials_exception)
    user = await get_user_by_id(db, token_data.user_id)
    
    if user is None:
        raise credentials_exception
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user"
        )
    
    return User(
        id=user.id,
        name=user.name,
        email=user.email,
        created_at=user.created_at
    )

@router.post("/signup", response_model=Token, status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    """Register a new user."""
    # Validate email format
    try:
        validate_email(user.email)
    except EmailNotValidError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email format"
        )
    
    # Validate password strength
    if not validate_password(user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long and contain uppercase, lowercase, and digit"
        )
    
    # Check if user already exists
    existing_user = await get_user_by_email(db, user.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    try:
        db_user = await create_user(db, user)
        
        # Create tokens
        access_token = create_access_token(
            data={"sub": db_user.id, "email": db_user.email}
        )
        refresh_token = create_refresh_token(
            data={"sub": db_user.id, "email": db_user.email}
        )
        
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating user"
        )

@router.post("/login", response_model=Token)
async def login(user: UserLogin, db: AsyncIOMotorDatabase = Depends(get_database)):
    """Authenticate user and return tokens."""
    # Validate email format
    try:
        validate_email(user.email)
    except EmailNotValidError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email format"
        )
    
    # Authenticate user
    db_user = await authenticate_user(db, user.email, user.password)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    if not db_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is disabled"
        )
    
    # Create tokens
    access_token = create_access_token(
        data={"sub": db_user.id, "email": db_user.email}
    )
    refresh_token = create_refresh_token(
        data={"sub": db_user.id, "email": db_user.email}
    )
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

@router.post("/refresh", response_model=Token)
async def refresh_token(
    token_data: TokenRefresh,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Refresh access token using refresh token."""
    # Verify refresh token
    token_payload = verify_refresh_token(token_data.refresh_token)
    
    # Get user from database
    user = await get_user_by_id(db, token_payload.user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is disabled"
        )
    
    # Create new tokens
    access_token = create_access_token(
        data={"sub": user.id, "email": user.email}
    )
    refresh_token = create_refresh_token(
        data={"sub": user.id, "email": user.email}
    )
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

@router.get("/me", response_model=User)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user profile."""
    return current_user

@router.get("/verify")
async def verify_token_endpoint(current_user: User = Depends(get_current_user)):
    """Verify if token is valid."""
    return {"valid": True, "user": current_user}
