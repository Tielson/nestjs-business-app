import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OtherIncome } from '@prisma/client';
import { CreateOtherIncomeDto, UpdateOtherIncomeDto } from 'src/dtos/other-income/other-income.dto';
import { formatDateToISO } from 'src/utils/format-Date-To-ISO';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OtherIncomeService {
  constructor(private readonly prisma: PrismaService) {}

  // Lista todas as outras rendas
  async findAll(): Promise<OtherIncome[]> {
    return await this.prisma.otherIncome.findMany();
  }

  // Busca uma outra renda por ID
  async findById(id: number): Promise<OtherIncome | null> {
    const otherIncome = await this.prisma.otherIncome.findUnique({
      where: { id },
    });
    if (!otherIncome) {
      throw new NotFoundException('Outra renda não encontrada');
    }
    return otherIncome;
  }

  // Busca outras rendas por intervalo de datas
  async findByDateRange(startDate: string, endDate: string): Promise<OtherIncome[]> {
    const start = formatDateToISO(startDate);
    const end = formatDateToISO(endDate);
    const otherIncome = await this.prisma.otherIncome.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
    });
    return otherIncome;
  }

  // Cria uma nova outra renda
  async create(createOtherIncomeDto: CreateOtherIncomeDto): Promise<OtherIncome> {
    try {
      const isoDate = formatDateToISO(createOtherIncomeDto.date);
      return await this.prisma.otherIncome.create({
        data: {
          title: createOtherIncomeDto.title,
          description: createOtherIncomeDto.description,
          value: createOtherIncomeDto.value, // Valor em centavos
          method: createOtherIncomeDto.method,
          user_id: createOtherIncomeDto.user_id,
          date: isoDate, // Data no formato YYYY-MM-DD
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Atualiza uma outra renda por ID
  async update(id: number, updateOtherIncomeDto: UpdateOtherIncomeDto): Promise<OtherIncome> {
    try {
      const isoDate = updateOtherIncomeDto.date ? formatDateToISO(updateOtherIncomeDto.date) : undefined;
      const otherIncome = await this.prisma.otherIncome.update({
        where: { id },
        data: {
          title: updateOtherIncomeDto.title,
          description: updateOtherIncomeDto.description,
          value: updateOtherIncomeDto.value, // Valor em centavos
          method: updateOtherIncomeDto.method,
          date: isoDate, // Data no formato YYYY-MM-DD
        },
      });
      if (!otherIncome) {
        throw new NotFoundException('Outra renda não encontrada');
      }
      return otherIncome;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Remove uma outra renda por ID
  async remove(id: number): Promise<OtherIncome> {
    try {
      const otherIncome = await this.prisma.otherIncome.delete({
        where: { id },
      });
      return otherIncome;
    } catch (error) {
      throw new NotFoundException('Outra renda não encontrada');
    }
  }
}