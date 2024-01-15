import { BookEntity } from "../entities/bookEntity";
import client from "../config/db";
export const BookRepository = () => {
  const getAllBooks = async (): Promise<BookEntity[]> => {
    try {
      const result = await client.query("SELECT * FROM books");
      return result.rows;
    } catch (error) {
      console.error("Error fetching all books:", error);
      throw error;
    }
  };

  const getBookById = async (
    bookId: number
  ): Promise<BookEntity | undefined> => {
    try {
      const result = await client.query("SELECT * FROM books WHERE id = $1", [
        bookId,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error fetching book with ID ${bookId}:`, error);
      throw error;
    }
  };

  const createBook = async (
    newBook: BookEntity
  ): Promise<BookEntity | undefined> => {
    try {
      const { title, writer, cover_image, price, tags } = newBook;

      const query = `
        INSERT INTO books (title, writer, cover_image, price, tags /* add other columns as needed */)
        VALUES ($1, $2, $3, $4, $5 /* add other placeholders as needed */)
        RETURNING *`;

      const values = [title, writer, cover_image, price, tags];

      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  };

  return {
    getAllBooks,
    getBookById,
    createBook,
  };
};
