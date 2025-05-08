import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Expenses } from '@prisma/client';
import { CreateExpensesDto, UpdateExpensesDto } from 'src/dtos/expenses/expenses.dto';
import { formatDateToISO } from 'src/utils/format-Date-To-ISO';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  // Lista todas as despesas
  async findAll(): Promise<Expenses[]> {
    return await this.prisma.expenses.findMany();
  }

  // Busca uma despesa por ID
  async findById(id: number): Promise<Expenses | null> {
    const expenses = await this.prisma.expenses.findUnique({
      where: { id },
    });
    if (!expenses) {
      throw new NotFoundException('Despesa não encontrada');
    }
    return expenses;
  }

  // Busca despesas por intervalo de datas
  async findByDateRange(startDate: string, endDate: string): Promise<Expenses[]> {
    const start = formatDateToISO(startDate);
    const end = formatDateToISO(endDate);
    const expenses = await this.prisma.expenses.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
    });
    return expenses;
  }

  // Cria uma nova despesa
  async create(createExpensesDto: CreateExpensesDto): Promise<Expenses> {
    try {
      const isoDate = formatDateToISO(createExpensesDto.date);
      return await this.prisma.expenses.create({
        data: {
          title: createExpensesDto.title,
          description: createExpensesDto.description,
          value: createExpensesDto.value, // Valor em centavos
          method: createExpensesDto.method,
          user_id: createExpensesDto.user_id,
          date: isoDate, // Data no formato YYYY-MM-DD
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Atualiza uma despesa por ID
  async update(id: number, updateExpensesDto: UpdateExpensesDto): Promise<Expenses> {
    try {
      const isoDate = updateExpensesDto.date ? formatDateToISO(updateExpensesDto.date) : undefined;
      const expenses = await this.prisma.expenses.update({
        where: { id },
        data: {
          title: updateExpensesDto.title,
          description: updateExpensesDto.description,
          value: updateExpensesDto.value, // Valor em centavos
          method: updateExpensesDto.method,
          date: isoDate, // Data no formato YYYY-MM-DD
        },
      });
      if (!expenses) {
        throw new NotFoundException('Despesa não encontrada');
      }
      return expenses;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Remove uma despesa por ID
  async remove(id: number): Promise<Expenses> {
    try {
      const expenses = await this.prisma.expenses.delete({
        where: { id },
      });
      return expenses;
    } catch (error) {
      throw new NotFoundException('Despesa não encontrada');
    }
  }
}