import express from "express";
import {
  createCustomer,
  getCustomerPoints,
  loginCustomer,
} from "../controllers/customerController";

const customerRouter = express.Router();

customerRouter.post("/api/register", createCustomer);

customerRouter.post("/api/login", loginCustomer);
customerRouter.get("/api/customer/:customerId/points", getCustomerPoints);

export default customerRouter;
