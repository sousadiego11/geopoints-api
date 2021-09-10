import express from 'express';
import { getOrdersService } from '../service';

export const router = express.Router();

router.get('/orders', async (_, res) => {
  const orders = await getOrdersService();
  res.send(orders);
});
