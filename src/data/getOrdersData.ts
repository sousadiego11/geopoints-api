import { pool } from '../database';

export const getOrdersData = async (): Promise<any[]> => {
  const client = await pool.connect();

  try {
    const orders = await client.query('select * from orders limit 10');
    return orders.rows;
  } catch (e: any) {
    throw new Error(e);
  }
};
