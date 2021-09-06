import { getOrders } from "../middlewares";
import express from 'express'

export const router = express.Router()

router.get('/orders', getOrders, (req, res) => {
    res.status(200);
});