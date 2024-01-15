import { CartEntity } from '../entities/cartEntity'; // Assuming you have a CartEntity or relevant model
import client from '../config/db';

const CartRepository = () => {
  const createCart = async (customerId: number, bookId: number): Promise<CartEntity | undefined> => {
    const query = 'INSERT INTO shopping_cart (customer_id, book_id) VALUES ($1, $2) RETURNING *';
    const values = [customerId, bookId];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating cart:', error);
      throw new Error('Internal Server Error');
    }
  };

  // ... (other functions)
  const getCartDetails = async (cartId: number): Promise<CartEntity[] | undefined> => {
    const query = `
    SELECT 
      shopping_cart.cart_id,
      shopping_cart.customer_id,
      books.title,
      books.cover_image,
      books.price
    FROM shopping_cart
    JOIN books ON shopping_cart.book_id = books.id
    WHERE shopping_cart.cart_id = $1
  `;
  

    const values = [cartId];

    try {
      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error retrieving cart details:', error);
      throw new Error('Internal Server Error');
    }
  };



  const getAllCartDetailsForCustomer = async (customerId: number): Promise<CartEntity[] | undefined> => {
    const query = `
      SELECT 
        shopping_cart.cart_id,
        shopping_cart.customer_id,
        shopping_cart.book_id,
        books.title,
        books.cover_image,
        books.price
      FROM shopping_cart
      JOIN books ON shopping_cart.book_id = books.id
      WHERE shopping_cart.customer_id = $1
    `;
  
    const values = [customerId];
  
    try {
      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error retrieving all cart details for a customer:', error);
      throw new Error('Internal Server Error');
    }
  };
  

  const deleteCart = async (customerId: number, cartId: number): Promise<void> => {
    const query = 'DELETE FROM shopping_cart WHERE customer_id = $1 AND cart_id = $2';
    const values = [customerId, cartId];
  
    try {
      await client.query(query, values);
    } catch (error) {
      console.error('Error deleting cart:', error);
      throw new Error('Internal Server Error');
    }
  };
  

  return {
    createCart,
    getCartDetails,getAllCartDetailsForCustomer,deleteCart
    // ... (other functions)
  };
};

export default CartRepository;
