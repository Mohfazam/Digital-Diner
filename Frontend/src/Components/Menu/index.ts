// Define TypeScript interfaces for the application
export interface MenuItem {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }
  
  export interface CartItem extends MenuItem {
    quantity: number;
  }
  
  export interface AddItemForm {
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }