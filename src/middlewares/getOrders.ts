import { pool } from '../database';

export const getOrders = async (req: any, res: any, next: any) => {
  const client = await pool.connect();

  try {
    const orders = await client.query('select * from orders limit 10');
    res.send(orders.rows);
    await client.release();
    next();
  } catch (e: any) {
    await client.release();
    throw new Error(e);
  }
};
