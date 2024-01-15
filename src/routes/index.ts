import express from "express";
import bookRouter from "./BookRoute";

import customerRouter from "./CustomerRoute";
import cartrouter from "./cartRoute";
import orderRouter from "./orderRoute";

const router = express.Router();

router.use(customerRouter);
router.use(bookRouter);
router.use(cartrouter);
router.use(orderRouter);
export default router;
