
import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { listOrder, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.get("/userorders", authMiddleware, userOrders);
orderRouter.post("/verify", verifyOrder); // <-- Add this line
orderRouter.get("/list",listOrder)
orderRouter.post('/status',updateStatus)

export default orderRouter;