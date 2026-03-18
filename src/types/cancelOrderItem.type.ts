enum cancelOrderItemStatus {
  PLACED = "PLACED",
  SHIPPED = "SHIPPED",
  PROCESSING = "PROCESSING",
}
export type T_cancelOrderItem = {
  price: number;
  quantity: number;
  status: cancelOrderItemStatus;
};
