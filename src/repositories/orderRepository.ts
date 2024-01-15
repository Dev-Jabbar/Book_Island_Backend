// OrderRepository.ts
import { OrderEntity } from "../entities/orderEntity"; // Assuming you have an OrderEntity or relevant model
import client from "../config/db";
import { CartEntity } from "../entities/cartEntity";

const OrderRepository = () => {
  const createOrderFromCart = async (
    customerId: number,
    cartItems: CartEntity[]
  ): Promise<OrderEntity[]> => {
    try {
      // Delete existing orders for the customer
      const deleteQuery = "DELETE FROM orders WHERE customer_id = $1";
      const deleteValues = [customerId];
      await client.query(deleteQuery, deleteValues);

      // Create new orders
      const orderPromises = cartItems.map(async (cartItem) => {
        const { book_id: bookId } = cartItem;
        const insertQuery =
          "INSERT INTO orders (customer_id, book_id) VALUES ($1, $2) RETURNING *";
        const insertValues = [customerId, bookId];

        const result = await client.query(insertQuery, insertValues);

        return result.rows[0];
      });

      const orders = await Promise.all(orderPromises);

      return orders;
    } catch (error) {
      console.error("Error creating orders from cart:", error);
      throw new Error("Internal Server Error");
    }
  };

  const getOrderDetails = async (
    orderId: number
  ): Promise<OrderEntity | undefined> => {
    const query = `
    SELECT 
      orders.order_id,
      orders.customer_id,
      books.title,
      books.cover_image,
      books.price
    FROM orders
    JOIN books ON orders.book_id = books.id
    WHERE orders.order_id = $1
  `;
    const values = [orderId];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error retrieving order details:", error);
      throw new Error("Internal Server Error");
    }
  };

  const getAllOrderDetailsForCustomer = async (
    customerId: number,
    totalOrderPoints: number
  ): Promise<OrderEntity[] | undefined> => {
    try {
      // Fetch customer points
      const customerPointsResult = await client.query(
        "SELECT points FROM customers WHERE customer_id = $1",
        [customerId]
      );
      const customerPoints = customerPointsResult.rows[0]?.points;

      // Check if the customer exists
      if (customerPoints === undefined) {
        throw new Error("Customer not found");
      }

      // Check if total order points exceed customer points
      if (totalOrderPoints > customerPoints) {
        throw new Error(
          "Order total exceeds available points. Please remove some items from the order."
        );
      }

      // Calculate updated customer points
      const updatedPoints = customerPoints - totalOrderPoints;

      // Ensure customer points do not go below 0
      const newPoints = Math.max(0, updatedPoints);

      // Update customer points in the database
      await client.query(
        "UPDATE customers SET points = $1 WHERE customer_id = $2",
        [newPoints, customerId]
      );

      // Proceed to fetch order details
      const query = `
            SELECT 
                orders.order_id,
                orders.created_at,
                customers.customer_name
            FROM orders
            JOIN customers ON orders.customer_id = customers.customer_id
            WHERE orders.customer_id = $1
            GROUP BY orders.order_id, orders.created_at, customers.customer_name
            ORDER BY orders.created_at DESC;
        `;
      const values = [customerId];

      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      console.error(
        "Error retrieving all order details for a customer:",
        (error as Error).message
      );

      throw new Error("Internal Server Error");
    }
  };

  const deleteOrder = async (
    customerId: number,
    orderId: number
  ): Promise<void> => {
    const query = "DELETE FROM orders WHERE customer_id = $1 AND order_id = $2";
    const values = [customerId, orderId];

    try {
      await client.query(query, values);
    } catch (error) {
      console.error("Error deleting order:", error);
      throw new Error("Internal Server Error");
    }
  };

  return {
    createOrderFromCart,
    getOrderDetails,
    getAllOrderDetailsForCustomer,
    deleteOrder,
  };
};

export default OrderRepository;
