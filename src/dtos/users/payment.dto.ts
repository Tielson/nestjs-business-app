export class PaymentDto {
  id: number;
  amount: number;
  date: Date;
  user_id: string;
  stripe_payment_id: string;
}