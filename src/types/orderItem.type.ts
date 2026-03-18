enum orderItemStatus {
  PLACED = "PLACED",
  CANCELLED = "CANCELLED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
}

export type T_orderItem = {
  id: string;
  medicine_id: string;
  order_id: string;
  seller_id: string;
  price: number;
  quantity: number;
  price_paying_status: boolean;
  status: orderItemStatus;
  medicine?: {
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
