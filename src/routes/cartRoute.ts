import express from 'express';
import * as CartController from '../controllers/cartController';

const cartrouter = express.Router();

// Create a new cart
cartrouter.post('/api/cart/create', CartController.createCart);
cartrouter.get('/api/cart/:cartId/details', CartController.getCartDetails);
// Add other cart routes as needed


// In cartRouter.ts

// Get details for all carts for a specific customer
cartrouter.get('/api/cart/details/:customerId', CartController.getAllCartDetailsForCustomer);

// In cartRouter.ts

// Delete a specific cart
cartrouter.delete('/api/cart/:customerId/delete/:cartId', CartController.deleteCart);


export default cartrouter;
