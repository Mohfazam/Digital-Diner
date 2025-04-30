import axios from 'axios';
import { MenuItem, CartItem } from './index';

const API_BASE_URL = 'https://dinerbackend.vercel.app';

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items`);
    return response.data.items;
  } catch (error) {
    console.error('Failed to fetch menu items:', error);
    throw error;
  }
};

export const placeOrder = async (
  phoneNumber: string,
  items: CartItem[],
  totalPrice: number
): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/orders`, {
      phoneNumber,
      items: items.map(({ name, price, quantity }) => ({ 
        name, 
        price, 
        quantity 
      })),
      totalPrice
    });
  } catch (error) {
    console.error('Failed to place order:', error);
    throw error;
  }
};

export const addMenuItem = async (item: Omit<MenuItem, '_id'>): Promise<MenuItem> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/items`, item);
    return response.data.item;
  } catch (error) {
    console.error('Failed to add menu item:', error);
    throw error;
  }
};