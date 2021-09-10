import { db } from '../database';

export const getOrdersData = async (): Promise<any[]> => {
  try {
    const orders = await db.query('select * from orders limit 10');
    return orders;
  } catch (e: any) {
    throw new Error(e);
  }
};
