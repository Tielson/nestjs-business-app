export class CustomerDto {
  full_name: string;
  surname: string;
  person_type: string;
  date_of_birth: string;
  phone: string;
  cpf: string;
  rg: string;
  rg_state: string;
  cnpj: string;
  email: string;
  trade_name: string;
  company_name: string;
  number: string;
  is_active: boolean;
  is_client: boolean;
  is_supplier: boolean;
  is_recurring: boolean;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
  user_id: string;
}

export class CreateCustomerDto {
  full_name: string;
  surname: string;
  person_type: string;
  date_of_birth: string;
  phone: string;
  cpf: string;
  rg: string;
  rg_state: string;
  cnpj: string;
  email: string;
  trade_name: string;
  company_name: string;
  number: string;
  is_active: boolean;
  is_client: boolean;
  is_supplier: boolean;
  is_recurring: boolean;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
  user_id: string;
}

export class UpdateCustomerDto {
  full_name?: string;
  surname?: string;
  person_type?: string;
  phone?: string;
  date_of_birth?: string;
  cpf?: string;
  rg?: string;
  rg_state?: string;
  cnpj?: string;
  email?: string;
  trade_name?: string;
  company_name?: string;
  number?: string;
  is_active?: boolean;
  is_client?: boolean;
  is_supplier?: boolean;
  is_recurring?: boolean;
  cep?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  complement?: string;
  user_id?: string; // Certifique-se de que o tipo é string
}









