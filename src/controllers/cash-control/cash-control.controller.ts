import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CashControl } from '@services/cash-control/cash-control.service';
import { AuthGuard } from '../../guards/AuthGuard';

@Controller('cash-control')
export class CashControlController {
  constructor(private readonly cashControl: CashControl) {}

  /**
   * Retorna o saldo de dinheiro dentro de um intervalo de datas.
   * @param startDate Data de início no formato DD/MM/YYYY.
   * @param endDate Data de término no formato DD/MM/YYYY.
   * @returns Saldo de dinheiro.
   */
 
  @Get('balance')
  @UseGuards(AuthGuard)
  async getCashBalance(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return await this.cashControl.calculateCashBalance(startDate, endDate);
  }

  /**
   * Retorna o rendimento mensal dentro de um intervalo de datas.
   * @param startDate Data de início no formato DD/MM/YYYY.
   * @param endDate Data de término no formato DD/MM/YYYY.
   * @returns Rendimento mensal.
   */
 
  @Get('monthly-earnings')
  @UseGuards(AuthGuard)
  async getMonthlyEarnings(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return await this.cashControl.calculateMonthlyEarnings(startDate, endDate);
  }

  /**
   * Retorna o total de compras dos clientes dentro de um intervalo de datas.
   * @param startDate Data de início no formato DD/MM/YYYY.
   * @param endDate Data de término no formato DD/MM/YYYY.
   * @returns Total de compras dos clientes.
   */
 
  @Get('customers-total')
  @UseGuards(AuthGuard)
  async getCustomersTotal(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return await this.cashControl.calculateCustomersTotal(startDate, endDate);
  }

  /**
   * Retorna o total de despesas dentro de um intervalo de datas.
   * @param startDate Data de início no formato DD/MM/YYYY.
   * @param endDate Data de término no formato DD/MM/YYYY.
   * @returns Total de despesas.
   */
 
  @Get('expenses-total')
  @UseGuards(AuthGuard)
  async getExpensesTotal(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return await this.cashControl.calculateExpensesTotal(startDate, endDate);
  }

  /**
   * Retorna o total de despesas esperadas dentro de um intervalo de datas.
   * @param startDate Data de início no formato DD/MM/YYYY.
   * @param endDate Data de término no formato DD/MM/YYYY.
   * @returns Total de despesas esperadas.
   */
 
  @Get('expected-expenses-total')
  @UseGuards(AuthGuard)
  async getExpectedExpensesTotal(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return await this.cashControl.calculateExpectedExpensesTotal(startDate, endDate);
  }

  /**
   * Retorna o total de outras rendas dentro de um intervalo de datas.
   * @param startDate Data de início no formato DD/MM/YYYY.
   * @param endDate Data de término no formato DD/MM/YYYY.
   * @returns Total de outras rendas.
   */
 
  @Get('other-income-total')
  @UseGuards(AuthGuard)
  async getOtherIncomeTotal(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return await this.cashControl.calculateOtherIncomeTotal(startDate, endDate);
  }
}