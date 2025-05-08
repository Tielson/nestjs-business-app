export class PurchaseHistoryDto {
  id: number;
  payment_method: string;
  purchase_date: string; 
  item_description: string;
  sales_channel: string;
  value: number;
  customer_id: number;
  user_id: string;
}

export class CreatePurchaseHistoryDto {
  payment_method: string;
  purchase_date: string; 
  item_description: string;
  sales_channel: string;
  value: number;
  customer_id: number;
  user_id: string;
}

export class UpdatePurchaseHistoryDto {
  payment_method?: string;
  purchase_date?: string; 
  item_description?: string;
  sales_channel?: string;
  value?: number;
}

