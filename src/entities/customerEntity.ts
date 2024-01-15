export interface CustomerEntity {
  customer_id?: number;
  customer_password: string;
  customer_name: string;
  points: number;
  authenticated: boolean; 
  created_at?: Date;
  updated_at?: Date;
}


