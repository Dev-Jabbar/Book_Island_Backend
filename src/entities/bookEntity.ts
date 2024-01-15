export interface BookEntity {
  id?: number;
  title: string;
  writer: string;
  cover_image: string;
  price: number;
  tags: string[]; // Array of strings representing book tags
  created_at?: Date;
  updated_at?: Date;
}
