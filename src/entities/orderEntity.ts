export interface OrderEntity {
    order_id?: number;
    customer_name: number; // Assuming this is a foreign key referencing a customer
     created_at?: Date;
    updated_at?: Date;
  }
  