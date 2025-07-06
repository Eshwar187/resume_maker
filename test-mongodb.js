const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Import your models
const Resume = require('./src/models/Resume.ts').default;
const User = require('./src/models/User.ts').default;

async function testMongoDB() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully!');

    // Check if collections exist
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Existing collections:', collections.map(c => c.name));

    // Create a test user (this will create the 'users' collection)
    const testUser = new User({
      email: 'test@example.com',
      name: 'Test User',
      provider: 'credentials'
    });

    // Save the user (this creates the collection if it doesn't exist)
    const savedUser = await testUser.save();
    console.log('✅ Test user created:', savedUser._id);

    // Create a test resume (this will create the 'resumes' collection)
    const testResume = new Resume({
      title: 'Test Resume',
      userId: savedUser._id,
      personalInfo: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-0123',
        address: '123 Main St, City, State'
      },
      summary: 'A test resume summary',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: [{
        company: 'Test Company',
        position: 'Software Developer',
        startDate: '2023-01-01',
        current: true,
        description: ['Developed web applications'],
        location: 'Remote'
      }],
      education: [{
        institution: 'Test University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2019-09-01',
        endDate: '2023-05-01',
        location: 'City, State'
      }]
    });

    const savedResume = await testResume.save();
    console.log('✅ Test resume created:', savedResume._id);

    // Update user with resume reference
    await User.findByIdAndUpdate(savedUser._id, {
      $push: { resumes: savedResume._id }
    });

    // List collections again to confirm they were created
    const newCollections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections after test:', newCollections.map(c => c.name));

    // Clean up test data
    await Resume.findByIdAndDelete(savedResume._id);
    await User.findByIdAndDelete(savedUser._id);
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 MongoDB setup is working correctly!');
    console.log('Your collections are ready to use in your application.');

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

testMongoDB();
