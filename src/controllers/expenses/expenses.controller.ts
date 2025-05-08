import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ExpensesService } from '@services/expenses/expenses.service';
import { CreateExpensesDto, UpdateExpensesDto } from 'src/dtos/expenses/expenses.dto';
import { AuthGuard } from '../../guards/AuthGuard';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) { }

 
  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.expensesService.findAll();
  }

 
  @Get('date-range')
  @UseGuards(AuthGuard)
  async findByDateRange(@Query('startDate') startDate, @Query('endDate') endDate: string) {
    return await this.expensesService.findByDateRange(startDate, endDate);
  }

 
  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: number) {
    return await this.expensesService.findById(id);
  }

 
  @Post()
  @UseGuards(AuthGuard)
  async create(@Param('id') id, @Body() createExpensesDto: CreateExpensesDto) {
    return await this.expensesService.create({ ...createExpensesDto, user_id: id });
  }

 
  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id, @Body() updateExpensesDto: UpdateExpensesDto) {
    return await this.expensesService.update(id, updateExpensesDto);
  }

 
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id) {
    return await this.expensesService.remove(id);
  }
}