import { CartEntity } from '../entities/cartEntity';
import CartRepository from '../repositories/cartRepository';

const cartRepository = CartRepository(); // Initialize the CartRepository

export const createCart = async (customerId: number, bookId: number): Promise<CartEntity | undefined> => {
  try {
    return await cartRepository.createCart(customerId, bookId);
  } catch (error) {
    console.error('Error creating cart:', error);
    throw new Error('Internal Server Error');
  }
};

export const getCartDetails = async (cartId: number): Promise<CartEntity[] | undefined> => {
    try {
      return await cartRepository.getCartDetails(cartId);
    } catch (error) {
      console.error('Error getting cart details:', error);
      throw new Error('Internal Server Error');
    }
  };



// In cartService.ts

export const getAllCartDetailsForCustomer = async (customerId: number): Promise<CartEntity[] | undefined> => {
    try {
      return await cartRepository.getAllCartDetailsForCustomer(customerId);
    } catch (error) {
      console.error('Error getting all cart details for a customer:', error);
      throw new Error('Internal Server Error');
    }
  };
  
  export const deleteCart = async (customerId: number, cartId: number): Promise<void> => {
    try {
      await cartRepository.deleteCart(customerId, cartId);
    } catch (error) {
      console.error('Error deleting cart:', error);
      throw new Error('Internal Server Error');
    }
  };
  

// Other functions in CartService (e.g., getCartInfo) can be added based on your requirements
