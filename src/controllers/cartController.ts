import { Request, Response } from "express";
import * as CartService from "../services/cartService";

export const createCart = async (req: Request, res: Response) => {
  const { customerId, bookId } = req.body;

  try {
    // Validate that required fields are not empty
    if (!customerId || !bookId) {
      return res
        .status(400)
        .json({ error: "Customer ID and Book ID are required fields" });
    }

    const cart = await CartService.createCart(customerId, bookId);
    res.status(201).json(cart);
  } catch (error) {
    console.error("Error in creatingCart :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCartDetails = async (req: Request, res: Response) => {
  const { cartId } = req.params;

  try {
    const cartDetails = await CartService.getCartDetails(Number(cartId));
    res.status(200).json(cartDetails);
  } catch (error) {
    console.error("Error in getCartDetails:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// In cartController.ts

// In cartController.ts

export const getAllCartDetailsForCustomer = async (
  req: Request,
  res: Response
) => {
  const { customerId } = req.params;

  try {
    const cartDetails = await CartService.getAllCartDetailsForCustomer(
      Number(customerId)
    );
    res.status(200).json(cartDetails);
  } catch (error) {
    console.error("Error in getAllCartDetailsForCustomer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  const { customerId, cartId } = req.params;

  try {
    await CartService.deleteCart(Number(customerId), Number(cartId));
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Other controller functions can be added based on your requirements
