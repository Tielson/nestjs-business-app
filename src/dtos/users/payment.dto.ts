export class PaymentDto {
  id: string;
  amount: number;
  date: Date;
  user_id: string;
  stripe_payment_id: string;
}