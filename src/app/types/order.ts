export interface OrderItem {
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
}
  
export interface Order {
  id: number;
  date: string;
  total: number;
  items: OrderItem[];
}
