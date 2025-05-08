export class OtherIncomeDto {
  id: number;
  title: string;
  description?: string;
  date: string; 
  value: number; 
  method: string;
  user_id: string;
}

export class CreateOtherIncomeDto {
  title: string;
  description?: string;
  date: string; 
  value: number; 
  method: string;
  user_id: string;
}

export class UpdateOtherIncomeDto {
  title?: string;
  description?: string;
  date?: string; 
  value?: number; 
  method?: string;
}