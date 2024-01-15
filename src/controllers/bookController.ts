import { Request, Response } from "express";
import BookService from "../services/bookService";
import { BookEntity } from "../entities/bookEntity";

const bookService = BookService();

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books: BookEntity[] = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const bookId: number = parseInt(req.params.id, 10);

  try {
    const book: BookEntity | undefined = await bookService.getBookById(bookId);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const newBookData: BookEntity = req.body;

    // Validate that required fields are not empty
    if (!newBookData.title || !newBookData.writer) {
      return res
        .status(400)
        .json({ error: "Title and Writer are required fields" });
    }
    const createdBook: BookEntity | undefined = await bookService.createBook(
      newBookData
    );

    if (createdBook) {
      res
        .status(201)
        .json({ data: createdBook, message: "Book created successfully" });
    } else {
      res.status(400).json({ error: "Failed to create book" });
    }
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
