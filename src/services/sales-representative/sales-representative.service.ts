import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SalesRepresentative } from '@prisma/client';
import { CreateSalesRepresentativeDto, UpdateSalesRepresentativeDto } from '../../dtos/users/salesRepresentative.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { convertToDDMMYYYY } from '../../utils/date-utils';

@Injectable()
export class SalesRepresentativeService {
  constructor(private readonly prisma: PrismaService) { }

  // Lista todos os representantes de vendas
  async findAll(): Promise<SalesRepresentative[]> {
    return await this.prisma.salesRepresentative.findMany();
  }

  // Busca um representante de vendas por ID
  async findById(id: number): Promise<SalesRepresentative | null> {
    const salesRepresentative = await this.prisma.salesRepresentative.findUnique({
      where: { id },
    });
    if (!salesRepresentative) {
      throw new NotFoundException('Representante de vendas não encontrado');
    }
    return salesRepresentative;
  }

  // Cria um novo representante de vendas
  async create(createSalesRepresentativeDto: CreateSalesRepresentativeDto): Promise<SalesRepresentative> {
    const formattedDateOfBirth = convertToDDMMYYYY(createSalesRepresentativeDto.date_of_birth);
    try {
      return await this.prisma.salesRepresentative.create({
        data: {
          full_name: createSalesRepresentativeDto.full_name,
          date_of_birth: formattedDateOfBirth,
          user_id: createSalesRepresentativeDto.user_id, // Certifique-se de que o user_id é uma string
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Atualiza um representante de vendas por ID
  async update(id: number, updateSalesRepresentativeDto: UpdateSalesRepresentativeDto): Promise<SalesRepresentative> {
    const formattedDateOfBirth = convertToDDMMYYYY(updateSalesRepresentativeDto.date_of_birth);
    try {
      const salesRepresentative = await this.prisma.salesRepresentative.update({
        where: { id },
        data: {
          ...updateSalesRepresentativeDto,
          date_of_birth: formattedDateOfBirth,
          user_id: updateSalesRepresentativeDto.user_id, // Certifique-se de que o user_id é uma string
        },
      });
      if (!salesRepresentative) {
        throw new NotFoundException('Representante de vendas não encontrado');
      }
      return salesRepresentative;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Remove um representante de vendas por ID
  async remove(id: number): Promise<SalesRepresentative> {
    try {
      const salesRepresentative = await this.prisma.salesRepresentative.delete({
        where: { id },
      });
      return salesRepresentative;
    } catch (error) {
      throw new NotFoundException('Representante de vendas não encontrado');
    }
  }
}