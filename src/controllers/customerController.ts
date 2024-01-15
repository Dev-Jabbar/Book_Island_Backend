// CustomerController.ts

import { Request, Response } from "express";
import CustomerService from "../services/customerService";
import { CustomerEntity } from "../entities/customerEntity";

const customerService = CustomerService();

export const getCustomerPoints = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const points = await customerService.getCustomerPoints(Number(customerId));
    res.json({ points });
  } catch (error) {
    console.error("Error getting customer points:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const newCustomerData: CustomerEntity = req.body;

    // Validate that required fields are not empty
    if (!newCustomerData.customer_name || !newCustomerData.customer_password) {
      return res
        .status(400)
        .json({ error: "Customer name and password are required fields" });
    }

    const createdCustomer: CustomerEntity | undefined =
      await customerService.createCustomer(newCustomerData);

    if (createdCustomer) {
      res.status(201).json({
        data: createdCustomer,
        message: "Customer created successfully",
      });
    } else {
      res.status(400).json({ error: "Failed to create customer" });
    }
  } catch (error) {
    console.error("Error creating customer:", error);

    if (error instanceof customerService.DuplicateCustomerError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const loginCustomer = async (req: Request, res: Response) => {
  try {
    const { customer_name, customer_password } = req.body;

    // Call the login function in the service
    const { user, error } = await customerService.loginCustomer(
      customer_name,
      customer_password
    );

    if (error) {
      // Handle the error accordingly
      if (error === "Incorrect password") {
        return res.status(401).json({ error: "Incorrect password" });
      }
      if (error === "User not found") {
        return res.status(401).json({ error: "Username not found" });
      }
    }

    // If there is a valid user, you can use it as needed
    if (user) {
      // You can generate a session token and store it in a cookie or send it in the response header
      // For simplicity, let's assume the user is authenticated without a token
      return res.status(200).json({ message: "Login successful.", user });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
