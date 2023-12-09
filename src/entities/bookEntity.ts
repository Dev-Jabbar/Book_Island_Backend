// src/entity/Book.ts
export interface BookEntity {
    id?: number;
    title: string;
    writer: string;
    cover_image: string;
    price: number;
    created_at?: Date;
    updated_at?: Date;
  }
  