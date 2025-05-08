import { Injectable } from '@nestjs/common';
import { formatDateToISO } from 'src/utils/format-Date-To-ISO';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CashControl {
  constructor(private readonly prisma: PrismaService) {}

  // Calcula o total de compras dos clientes com base no histórico de compras dentro de um intervalo de datas
  async calculateCustomersTotal(startDate: string, endDate: string): Promise<number> {
    const start = formatDateToISO(startDate);
    const end = formatDateToISO(endDate);
    const purchaseHistories = await this.prisma.purchaseHistory.findMany({
      where: {
        purchase_date: {
          gte: start,
          lte: end,
        },
      },
    });
    return purchaseHistories.reduce((total, purchase) => total + purchase.value, 0);
  }

  // Calcula o total de despesas dentro de um intervalo de datas
  async calculateExpensesTotal(startDate: string, endDate: string): Promise<number> {
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
    return expenses.reduce((total, expense) => total + expense.value, 0);
  }

  // Calcula o total de despesas esperadas dentro de um intervalo de datas
  async calculateExpectedExpensesTotal(startDate: string, endDate: string): Promise<number> {
    const start = formatDateToISO(startDate);
    const end = formatDateToISO(endDate);
    const expectedExpenses = await this.prisma.expectedExpenses.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
    });
    return expectedExpenses.reduce((total, expense) => total + expense.value, 0);
  }

  // Calcula o total de outras rendas dentro de um intervalo de datas
  async calculateOtherIncomeTotal(startDate: string, endDate: string): Promise<number> {
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
    return otherIncome.reduce((total, income) => total + income.value, 0);
  }

  // Calcula o saldo de dinheiro dentro de um intervalo de datas
  async calculateCashBalance(startDate: string, endDate: string): Promise<number> {
    const customersTotal = await this.calculateCustomersTotal(startDate, endDate);
    const expensesTotal = await this.calculateExpensesTotal(startDate, endDate);
    const expectedExpensesTotal = await this.calculateExpectedExpensesTotal(startDate, endDate);
    const otherIncomeTotal = await this.calculateOtherIncomeTotal(startDate, endDate);

    
    return customersTotal + otherIncomeTotal - expensesTotal - expectedExpensesTotal;
  }

  // Calcula o rendimento mensal dentro de um intervalo de datas
  async calculateMonthlyEarnings(startDate: string, endDate: string): Promise<number> {
    const customersTotal = await this.calculateCustomersTotal(startDate, endDate);
    const otherIncomeTotal = await this.calculateOtherIncomeTotal(startDate, endDate);

    return customersTotal + otherIncomeTotal;
  }
}