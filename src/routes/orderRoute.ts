import express from "express";
import OrderController from "../controllers/orderController";

const orderRouter = express.Router();
const orderController = OrderController();

// Create a new order
orderRouter.post(
  "/createFromCart/:customerId",
  orderController.createOrderFromCart
);

// Get details for a specific order
orderRouter.get("/api/order/:orderId/details", orderController.getOrderDetails);

// Get details for all orders for a specific customer
orderRouter.get(
  "/api/order/details/:customerId/:totalOrderPoints",
  orderController.getAllOrderDetailsForCustomer
);

// Delete a specific order
orderRouter.delete(
  "/api/order/:customerId/:orderId/delete",
  orderController.deleteOrder
);

export default orderRouter;
