import express from 'express';
import { getOrders } from '../middlewares';

export const router = express.Router();

router.get('/orders', getOrders, (req, res) => {
  res.status(200);
});
