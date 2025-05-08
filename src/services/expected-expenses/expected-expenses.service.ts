import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ExpectedExpenses } from '@prisma/client';
import { CreateExpectedExpensesDto, UpdateExpectedExpensesDto } from 'src/dtos/expected-expenses/expected-expenses.dto';
import { formatDateToISO } from 'src/utils/format-Date-To-ISO';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ExpectedExpensesService {
  constructor(private readonly prisma: PrismaService) { }

  // Lista todas as despesas esperadas
  async findAll(): Promise<ExpectedExpenses[]> {
    return await this.prisma.expectedExpenses.findMany();
  }

  // Busca uma despesa esperada por ID
  async findById(id: number): Promise<ExpectedExpenses | null> {
    const expectedExpenses = await this.prisma.expectedExpenses.findUnique({
      where: { id },
    });
    if (!expectedExpenses) {
      throw new NotFoundException('Despesa esperada não encontrada');
    }
    return expectedExpenses;
  }

  async findByDateRange(startDate: string, endDate: string): Promise<ExpectedExpenses[]> {
    const start = formatDateToISO(startDate);
    const end = formatDateToISO(endDate);
    const expenses = await this.prisma.expectedExpenses.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
    });
    return expenses;
  }

  async create(createExpectedExpensesDto: CreateExpectedExpensesDto): Promise<ExpectedExpenses> {
    try {
      return await this.prisma.expectedExpenses.create({
        data: {
          title: createExpectedExpensesDto.title,
          description: createExpectedExpensesDto.description,
          value: createExpectedExpensesDto.value,
          method: createExpectedExpensesDto.method,
          recurrence: createExpectedExpensesDto.recurrence,
          date: createExpectedExpensesDto.date,
          user_id: createExpectedExpensesDto.user_id, // Certifique-se de que o user_id é uma string
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Atualiza uma despesa esperada por ID
  async update(id: number, updateExpectedExpensesDto: UpdateExpectedExpensesDto): Promise<ExpectedExpenses> {
    try {
      const FormatDateToISO = formatDateToISO(updateExpectedExpensesDto.date)
      const expectedExpenses = await this.prisma.expectedExpenses.update({
        where: { id },
        data: {
          title: updateExpectedExpensesDto.title,
          description: updateExpectedExpensesDto.description,
          value: updateExpectedExpensesDto.value,
          method: updateExpectedExpensesDto.method,
          recurrence: updateExpectedExpensesDto.recurrence,
          date: FormatDateToISO,
        },
      });
      if (!expectedExpenses) {
        throw new NotFoundException('Despesa esperada não encontrada');
      }
      return expectedExpenses;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Remove uma despesa esperada por ID
  async remove(id: number): Promise<ExpectedExpenses> {
    try {
      const expectedExpenses = await this.prisma.expectedExpenses.delete({
        where: { id },
      });
      return expectedExpenses;
    } catch (error) {
      throw new NotFoundException('Despesa esperada não encontrada');
    }
  }
}