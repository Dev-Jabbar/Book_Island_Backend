
import { BookRepository } from '../repositories/bookRepository'; 
import { BookEntity } from '../entities/bookEntity';

const BookService = () => {
  const bookRepository = BookRepository();

  const getAllBooks = async (): Promise<BookEntity[]> => {
    return bookRepository.getAllBooks();
  };

  const getBookById = async (bookId: number): Promise<BookEntity | undefined> => {
    return bookRepository.getBookById(bookId);
  };

  const createBook = async (bookData: BookEntity): Promise<BookEntity | undefined> => {
    const createdBook = await bookRepository.createBook(bookData);
    return createdBook;
  };

  return {
    getAllBooks,
    getBookById,
    createBook,
  };
};

export default BookService;
