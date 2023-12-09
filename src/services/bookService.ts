// services/bookService.ts

import { Client } from 'pg';

export class BookService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getAllBooks() {
    const result = await this.client.query('SELECT * FROM books');
    return result.rows;
  }

  async getBookById(bookId: number) {
    const result = await this.client.query('SELECT * FROM books WHERE id = $1', [bookId]);
    return result.rows[0];
  }
}
