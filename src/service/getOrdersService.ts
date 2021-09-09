import { getOrdersData } from '../data';

export const getOrdersService = (): Promise<any[]> => getOrdersData();
