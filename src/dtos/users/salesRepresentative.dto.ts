export class SalesRepresentativeDto {
  id: number;
  full_name: string;
  date_of_birth: string;
  user_id: string;
}

export class CreateSalesRepresentativeDto {
  full_name: string;
  date_of_birth: string;
  user_id: string;
}

export class UpdateSalesRepresentativeDto {
  full_name: string;
  date_of_birth: string;
  user_id: string;
}
