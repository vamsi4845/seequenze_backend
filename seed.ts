import mongoose from 'mongoose';
import { Task, ITask } from "./models/taskModel";
require('dotenv').config();
// Connect to the MongoDB database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
      
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

// Sample seed data
const seedData: ITask[] = [
  {
    title: 'Design Home Page',
    description: 'Create a responsive home page design using Figma.',
    status: 'todo',
    priority: 'high',
    deadline: new Date('2024-08-15'),
    assignedTo: 'Alice',
  },
  {
    title: 'Implement Authentication',
    description: 'Add user authentication with JWT and OAuth.',
    status: 'in-progress',
    priority: 'medium',
    deadline: new Date('2024-08-20'),
    assignedTo: 'Bob',
  },
  {
    title: 'Setup Database',
    description: 'Initialize MongoDB with Mongoose schemas.',
    status: 'completed',
    priority: 'low',
    deadline: new Date('2024-08-10'),
    assignedTo: 'Charlie',
  },
  {
    title: 'Integrate Payment Gateway',
    description: 'Add Stripe payment processing to the checkout page.',
    status: 'todo',
    priority: 'high',
    deadline: new Date('2024-08-25'),
    assignedTo: 'Dave',
  },
  {
    title: 'Write Unit Tests',
    description: 'Create unit tests for all backend routes using Jest.',
    status: 'in-progress',
    priority: 'medium',
    deadline: new Date('2024-08-18'),
    assignedTo: 'Eve',
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Clear existing tasks
    await Task.deleteMany({});
    console.log('Cleared existing tasks');

    // Insert seed data
    await Task.insertMany(seedData);
    console.log('Seed data inserted successfully');

    // Close the database connection
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
};

// Run the seed function
seedDatabase();
