import OrderRepository from '../repositories/orderRepository';
import { OrderEntity } from '../entities/orderEntity';
import { CartEntity } from '../entities/cartEntity';

const OrderService = () => {
  const orderRepository = OrderRepository();

  const createOrderFromCart = async (customerId: number, cartItems: CartEntity[]): Promise<OrderEntity[]> => {
    try {
      // Use the provided function from the repository to create orders from cart items
      const orders = await orderRepository.createOrderFromCart(customerId, cartItems);
      return orders;
    } catch (error) {
      console.error('Error creating orders from cart:', error);
      throw new Error('Internal Server Error');
    }
  };


  const getOrderDetails = async (orderId: number): Promise<OrderEntity | undefined> => {
    return orderRepository.getOrderDetails(orderId);
  };

  const getAllOrderDetailsForCustomer = async (customerId: number, totalOrderPoints: number): Promise<OrderEntity[] | undefined> => {
    return orderRepository.getAllOrderDetailsForCustomer(customerId, totalOrderPoints);
  };

  const deleteOrder = async (customerId: number, orderId: number): Promise<void> => {
    return orderRepository.deleteOrder(customerId, orderId);
  };

  return {
    createOrderFromCart,
    getOrderDetails,
    getAllOrderDetailsForCustomer,
    deleteOrder,
  };
};

export default OrderService;
