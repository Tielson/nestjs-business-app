import { PaymentDto } from "./payment.dto";
import { SalesRepresentativeDto } from "./salesRepresentative.dto";

export class UserDto {
  id: string;
  company: string;
  email: string;
  number: string;
  cnpj: string;
  payments: PaymentDto[] | null;
  sales_representative: SalesRepresentativeDto | null;
}

export class CreateUserDto {
  id: string;
  company: string;
  email: string;
  number: string;
  cnpj: string;
}

export class UpdateUserDto {
  company?: string;
  email?: string;
  number?: string;
  cnpj?: string;
}