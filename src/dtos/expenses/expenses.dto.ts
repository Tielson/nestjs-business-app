export class ExpensesDto {
  id: number
  title: string;
  description?: string;
  date: string; 
  value: number; 
  method: string;
  user_id: string;
}

export class CreateExpensesDto {
  title: string;
  description?: string;
  date: string; 
  value: number; 
  method: string;
  user_id: string;
}

export class UpdateExpensesDto {
  title?: string;
  description?: string;
  date?: string; 
  value?: number; 
  method?: string;
}