import { Request, Response } from "express";
import OrderService from "../services/orderService";
import { CartEntity } from "../entities/cartEntity";

const OrderController = () => {
  const orderService = OrderService();

  const createOrderFromCart = async (req: Request, res: Response) => {
    const { customerId } = req.params;
    const cartItems: CartEntity[] = req.body; // Assuming the cart items are sent in the request body

    try {
      const orders = await orderService.createOrderFromCart(
        Number(customerId),
        cartItems
      );
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  const getOrderDetails = async (req: Request, res: Response) => {
    const { orderId } = req.params;

    try {
      const order = await orderService.getOrderDetails(Number(orderId));
      res.json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  const getAllOrderDetailsForCustomer = async (req: Request, res: Response) => {
    const { customerId, totalOrderPoints } = req.params;

    try {
      const orders = await orderService.getAllOrderDetailsForCustomer(
        Number(customerId),
        Number(totalOrderPoints)
      );
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteAllOrders = async (req: Request, res: Response) => {
    try {
      await orderService.deleteAllOrders();
      res.json({ message: "All orders deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  return {
    createOrderFromCart,
    getOrderDetails,
    getAllOrderDetailsForCustomer,
    deleteAllOrders,
  };
};

export default OrderController;
