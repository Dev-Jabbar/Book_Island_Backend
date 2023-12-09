import express from 'express';
import cors from 'cors'; // Import the cors middleware
import { Client } from 'pg';
import { AuthController } from './controllers/authController';
import { AuthService } from './services/authService';
import { AuthRepository } from './repositories/authRepository';

import db from './db';
import { getAllBooks, getBookById } from './controllers/bookController';

// Create an instance of Express
const app = express();

// Use the cors middleware to enable CORS for all routes
app.use(cors());

// Use the exported client from db.ts
const client = db;

// Set up routes
app.get('/api/books', getAllBooks);
app.get('/api/books/:id', getBookById);

// Initialize components
const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

// Set up routes
app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/logout', authController.logout);

app.get('/api/books', getAllBooks);

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
