from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from PyPDF2 import PdfReader
import spacy
import uvicorn
import os
import re
from typing import Optional, List, Dict
from docx import Document
import json
from datetime import datetime

# Auth imports
from auth_routes import auth_router
from database import connect_to_mongo, close_mongo_connection

directory = os.path.dirname(__file__)
nlp = spacy.load('en_core_web_sm')

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include auth router
app.include_router(auth_router, prefix="/api/auth", tags=["authentication"])

# Database event handlers
@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

def parse_pdf(file_path: str) -> str:
    with open(file_path, 'rb') as file:
        reader = PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text() or ''
    return text

def parse_docx(file_path: str) -> str:
    doc = Document(file_path)
    text = ''
    for paragraph in doc.paragraphs:
        text += paragraph.text + '\n'
    return text

def extract_email(text: str) -> Optional[str]:
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, text)
    return emails[0] if emails else None

def extract_phone(text: str) -> Optional[str]:
    phone_patterns = [
        r'\(\d{3}\)\s*\d{3}[-.]?\d{4}',
        r'\d{3}[-.]?\d{3}[-.]?\d{4}',
        r'\+\d{1,3}\s*\d{3}\s*\d{3}\s*\d{4}'
    ]
    for pattern in phone_patterns:
        phones = re.findall(pattern, text)
        if phones:
            return phones[0]
    return None

def extract_linkedin(text: str) -> Optional[str]:
    linkedin_pattern = r'(?:https?://)?(?:www\.)?linkedin\.com/in/[A-Za-z0-9-]+'
    matches = re.findall(linkedin_pattern, text, re.IGNORECASE)
    return matches[0] if matches else None

def detect_sections(text: str) -> Dict[str, bool]:
    sections = {
        'contact_info': bool(extract_email(text) or extract_phone(text)),
        'summary': bool(re.search(r'\b(summary|objective|profile)\b', text, re.IGNORECASE)),
        'experience': bool(re.search(r'\b(experience|employment|work history)\b', text, re.IGNORECASE)),
        'education': bool(re.search(r'\b(education|degree|university|college)\b', text, re.IGNORECASE)),
        'skills': bool(re.search(r'\b(skills|competencies|technologies)\b', text, re.IGNORECASE)),
        'projects': bool(re.search(r'\b(projects|portfolio)\b', text, re.IGNORECASE)),
        'certifications': bool(re.search(r'\b(certifications?|licenses?)\b', text, re.IGNORECASE))
    }
    return sections

def extract_keywords_from_job_description(job_desc: str) -> List[str]:
    if not job_desc:
        return []
    
    doc = nlp(job_desc.lower())
    # Extract technical skills, tools, and important terms
    keywords = []
    
    # Common technical terms and skills
    tech_patterns = [
        r'\b(python|java|javascript|react|node\.?js|sql|aws|docker|kubernetes)\b',
        r'\b(machine learning|ai|data science|analytics|agile|scrum)\b',
        r'\b(git|github|ci/cd|devops|api|rest|microservices)\b'
    ]
    
    for pattern in tech_patterns:
        matches = re.findall(pattern, job_desc.lower())
        keywords.extend(matches)
    
    # Extract entities and noun phrases
    for ent in doc.ents:
        if ent.label_ in ['ORG', 'PRODUCT', 'SKILL']:
            keywords.append(ent.text)
    
    # Extract important nouns
    for token in doc:
        if (token.pos_ == 'NOUN' and 
            len(token.text) > 2 and 
            not token.is_stop and 
            token.is_alpha):
            keywords.append(token.text)
    
    return list(set(keywords))

def calculate_ats_score(resume_text: str, sections: Dict[str, bool], 
                       job_keywords: List[str] = None) -> Dict:
    score = 0
    max_score = 100
    feedback = []
    
    # Section completeness (40 points)
    required_sections = ['contact_info', 'experience', 'education', 'skills']
    section_score = sum(20 if sections.get(section, False) else 0 for section in required_sections[:2])
    section_score += sum(10 if sections.get(section, False) else 0 for section in required_sections[2:])
    
    if not sections.get('contact_info'):
        feedback.append("Add contact information (email, phone number)")
    if not sections.get('experience'):
        feedback.append("Include work experience section")
    if not sections.get('education'):
        feedback.append("Add education section")
    if not sections.get('skills'):
        feedback.append("Include a skills section")
    
    score += section_score
    
    # Content quality (30 points)
    word_count = len(resume_text.split())
    if word_count < 200:
        feedback.append("Resume is too brief. Add more details about your experience")
        score += 5
    elif word_count > 800:
        feedback.append("Resume is too lengthy. Consider condensing to 1-2 pages")
        score += 20
    else:
        score += 30
    
    # Keyword matching (30 points) - only if job description provided
    if job_keywords:
        resume_lower = resume_text.lower()
        matched_keywords = [kw for kw in job_keywords if kw in resume_lower]
        keyword_score = min(30, len(matched_keywords) * 3)
        score += keyword_score
        
        if len(matched_keywords) < len(job_keywords) * 0.3:
            feedback.append(f"Include more relevant keywords from the job description")
    else:
        score += 15  # Partial score when no job description provided
    
    return {
        'score': min(score, max_score),
        'max_score': max_score,
        'feedback': feedback
    }

def generate_correction_suggestions(resume_text: str, sections: Dict[str, bool], 
                                  job_keywords: List[str] = None) -> List[Dict]:
    suggestions = []
    
    # Format suggestions
    if len(resume_text.split()) > 800:
        suggestions.append({
            'type': 'format',
            'priority': 'high',
            'title': 'Resume Length',
            'description': 'Your resume is too long. Aim for 1-2 pages maximum.',
            'suggestion': 'Remove outdated experiences and focus on recent, relevant accomplishments.'
        })
    
    # Section suggestions
    if not sections.get('summary'):
        suggestions.append({
            'type': 'content',
            'priority': 'medium',
            'title': 'Professional Summary',
            'description': 'Add a professional summary at the top of your resume.',
            'suggestion': 'Include 2-3 sentences highlighting your key qualifications and career goals.'
        })
    
    if not sections.get('projects') and 'developer' in resume_text.lower():
        suggestions.append({
            'type': 'content',
            'priority': 'medium',
            'title': 'Projects Section',
            'description': 'Consider adding a projects section to showcase your work.',
            'suggestion': 'Include 2-3 relevant projects with brief descriptions and technologies used.'
        })
    
    # Keyword suggestions
    if job_keywords:
        resume_lower = resume_text.lower()
        missing_keywords = [kw for kw in job_keywords[:10] if kw not in resume_lower]
        
        if missing_keywords:
            suggestions.append({
                'type': 'keywords',
                'priority': 'high',
                'title': 'Missing Keywords',
                'description': f'Your resume is missing key terms from the job description.',
                'suggestion': f'Consider incorporating: {", ".join(missing_keywords[:5])}'
            })
    
    # Contact info suggestions
    if not extract_email(resume_text):
        suggestions.append({
            'type': 'contact',
            'priority': 'high',
            'title': 'Email Address',
            'description': 'No email address found.',
            'suggestion': 'Add a professional email address to your contact information.'
        })
    
    if not extract_phone(resume_text):
        suggestions.append({
            'type': 'contact',
            'priority': 'medium',
            'title': 'Phone Number',
            'description': 'No phone number found.',
            'suggestion': 'Include a phone number in your contact information.'
        })
    
    return suggestions

def analyze_resume(file: UploadFile, job_description: Optional[str] = None) -> dict:
    # Save the file locally
    file_name = f"{directory}/{file.filename}"
    with open(file_name, "wb") as buffer:
        buffer.write(file.file.read())

    # Read and parse the file based on its type
    content = ''
    if file.filename.lower().endswith('.pdf'):
        content = parse_pdf(file_name)
    elif file.filename.lower().endswith(('.docx', '.doc')):
        content = parse_docx(file_name)
    else:
        # For other file types, try to read as text
        try:
            with open(file_name, 'r', encoding='utf-8') as f:
                content = f.read()
        except:
            content = ''

    if not content:
        os.remove(file_name)
        return {"error": "Could not extract text from the uploaded file"}

    # Perform NLP analysis
    doc = nlp(content)

    # Extract basic information
    email = extract_email(content)
    phone = extract_phone(content)
    linkedin = extract_linkedin(content)
    
    # Detect resume sections
    sections = detect_sections(content)
    
    # Extract keywords from resume
    resume_keywords = [token.text.lower() for token in doc 
                      if token.is_alpha and not token.is_stop and len(token.text) > 2]
    unique_resume_keywords = list(set(resume_keywords))[:20]
    
    # Extract job description keywords if provided
    job_keywords = extract_keywords_from_job_description(job_description) if job_description else []
    
    # Calculate ATS score
    ats_analysis = calculate_ats_score(content, sections, job_keywords)
    
    # Generate correction suggestions
    suggestions = generate_correction_suggestions(content, sections, job_keywords)
    
    # Find matching and missing keywords
    matched_keywords = [kw for kw in job_keywords if kw in content.lower()] if job_keywords else []
    missing_keywords = [kw for kw in job_keywords if kw not in content.lower()] if job_keywords else []
    
    # Build comprehensive response
    response = {
        "analysis_date": datetime.now().isoformat(),
        "file_info": {
            "filename": file.filename,
            "file_type": file.filename.split('.')[-1].lower()
        },
        "contact_info": {
            "email": email,
            "phone": phone,
            "linkedin": linkedin
        },
        "sections_detected": sections,
        "ats_score": {
            "score": ats_analysis['score'],
            "max_score": ats_analysis['max_score'],
            "percentage": round((ats_analysis['score'] / ats_analysis['max_score']) * 100, 1),
            "feedback": ats_analysis['feedback']
        },
        "keywords": {
            "resume_keywords": unique_resume_keywords,
            "job_keywords": job_keywords,
            "matched_keywords": matched_keywords,
            "missing_keywords": missing_keywords[:10],  # Limit to top 10
            "match_percentage": round((len(matched_keywords) / len(job_keywords)) * 100, 1) if job_keywords else 0
        },
        "suggestions": suggestions,
        "word_count": len(content.split()),
        "has_job_description": bool(job_description)
    }

    # Clean up the file
    os.remove(file_name)

    return response

@app.post("/analyze")
async def analyze_resume_endpoint(
    file: UploadFile = File(...),
    job_description: Optional[str] = Form(None)
):
    try:
        result = analyze_resume(file, job_description)
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/")
async def root():
    return {"message": "Resume Analyzer API", "version": "1.0.0"}

@app.post("/analyze/bulk")
async def analyze_multiple_resumes(
    files: List[UploadFile] = File(...),
    job_description: Optional[str] = Form(None)
):
    """Analyze multiple resumes against a job description"""
    results = []
    
    for file in files:
        try:
            result = analyze_resume(file, job_description)
            result["file_index"] = len(results)
            results.append(result)
        except Exception as e:
            results.append({
                "file_index": len(results),
                "filename": file.filename,
                "error": str(e)
            })
    
    return JSONResponse(content={"results": results, "total_files": len(files)})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

