import express from 'express';
import { getAllBooks, getBookById, createBook } from '../controllers/bookController';

const bookRouter = express.Router();

bookRouter.get('/api/books', getAllBooks);
bookRouter.get('/api/books/:id', getBookById);
bookRouter.post('/api/books', createBook); 

export default bookRouter;
