// controllers/bookController.ts

import { Request, Response } from 'express';
import db from '../db'; // Import the exported client from db.ts
import { BookService } from '../services/bookService';

const bookService = new BookService(db);

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id, 10);

  try {
    const book = await bookService.getBookById(bookId);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
