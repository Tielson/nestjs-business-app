export class UserDto {
  id: string
  company: string
  email: string
  number: number
  cnpj: number
  payment: boolean
  sales_representative_id: string
}

export class CreateUserDto {
  company: string
  email: string
  number: number
  cnpj: number
  payment: boolean
  sales_representative_id: string
}


export class UpdateUserDto {
  id: string
  company: string
  email: string
  number: number
  cnpj: number
  payment: string
}