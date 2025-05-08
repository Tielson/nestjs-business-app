import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customers/customer.dto';
import { convertToDDMMYYYY } from 'src/utils/date-utils';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) { }

  // Lista todos os clientes
  async findAll(user_id: string): Promise<Customer[]> {
    return await this.prisma.customer.findMany({
      where: {
        user_id: user_id,
      },
    });
  }

  // Busca um cliente por ID
  async findById(id: number): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });
    if (!customer) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return customer;
  }

  // Cria um novo cliente

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    let formattedDateOfBirth = null
    if(createCustomerDto.date_of_birth){
       formattedDateOfBirth = convertToDDMMYYYY(createCustomerDto.date_of_birth);
    }
    try {
      return await this.prisma.customer.create({
        data: {
          full_name: createCustomerDto.full_name,
          surname: createCustomerDto.surname,
          person_type: createCustomerDto.person_type,
          date_of_birth: formattedDateOfBirth || null,
          phone: createCustomerDto.phone,
          cpf: createCustomerDto.cpf || null,
          rg: createCustomerDto.rg || null,
          rg_state: createCustomerDto.rg_state || null,
          cnpj: createCustomerDto.cnpj || null,
          email: createCustomerDto.email,
          trade_name: createCustomerDto.trade_name || null,
          company_name: createCustomerDto.company_name || null,
          number: createCustomerDto.number || null,
          is_client: createCustomerDto.is_client ?? false,
          is_supplier: createCustomerDto.is_supplier ?? false,
          is_recurring: createCustomerDto.is_recurring ?? false,
          cep: createCustomerDto.cep || null,
          street: createCustomerDto.street || null,
          neighborhood: createCustomerDto.neighborhood || null,
          city: createCustomerDto.city || null,
          state: createCustomerDto.state || null,
          complement: createCustomerDto.complement || null,
          is_active: createCustomerDto.is_active ?? true,
          user: {
            connect: {
              id: createCustomerDto.user_id,  // Conecte com o ID do usuário existente
            }
          }// Conecta o usuário existente
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Atualiza um cliente por ID
  // Atualiza um cliente por ID
  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    let formattedDateOfBirth = null;
    if(updateCustomerDto.date_of_birth){
       formattedDateOfBirth = convertToDDMMYYYY(updateCustomerDto.date_of_birth);
    }
    try {
      const customer = await this.prisma.customer.update({
        where: { id },
        data: {
          full_name: updateCustomerDto.full_name,
          surname: updateCustomerDto.surname,
          person_type: updateCustomerDto.person_type,
          date_of_birth: formattedDateOfBirth,
          phone: updateCustomerDto.phone,
          cpf: updateCustomerDto.cpf,
          rg: updateCustomerDto.rg,
          rg_state: updateCustomerDto.rg_state,
          cnpj: updateCustomerDto.cnpj,
          email: updateCustomerDto.email,
          trade_name: updateCustomerDto.trade_name,
          company_name: updateCustomerDto.company_name,
          number: updateCustomerDto.number,
          is_active: updateCustomerDto.is_active,
          is_client: updateCustomerDto.is_client,
          is_supplier: updateCustomerDto.is_supplier,
          is_recurring: updateCustomerDto.is_recurring,
          cep: updateCustomerDto.cep,
          street: updateCustomerDto.street,
          neighborhood: updateCustomerDto.neighborhood,
          city: updateCustomerDto.city,
          state: updateCustomerDto.state,
          complement: updateCustomerDto.complement,
          user: {
            connect: {
              id: updateCustomerDto.user_id, // Conecta o usuário existente
            },
          },
        },
      });
      if (!customer) {
        throw new NotFoundException('Cliente não encontrado');
      }
      return customer;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Remove um cliente por ID
  async remove(id: number): Promise<Customer> {
    try {
      const customer = await this.prisma.customer.delete({
        where: { id },
      });
      return customer;
    } catch (error) {
      throw new NotFoundException('Cliente não encontrado');
    }
  }
}