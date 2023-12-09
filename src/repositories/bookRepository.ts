// src/repository/bookRepository.ts
import { Pool } from 'pg';
import { BookEntity } from '../entities/bookEntity';

const pool = new Pool();

export const getAllBooks = async (): Promise<BookEntity[]> => {
  const result = await pool.query('SELECT * FROM books');
  return result.rows;
};
