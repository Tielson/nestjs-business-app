export class ExpectedExpensesDto {
  id: number;
  title: string;
  description?: string;
  value: number;
  method: string;
  recurrence: string;
  date: string;
  user_id: string;
}

export class CreateExpectedExpensesDto {
  title: string;
  description?: string;
  value: number;
  method: string;
  recurrence: string;
  date: string;
  user_id: string;
}

export class UpdateExpectedExpensesDto {
  title?: string;
  description?: string;
  value?: number;
  method?: string;
  recurrence: string;
  date: string;
}

