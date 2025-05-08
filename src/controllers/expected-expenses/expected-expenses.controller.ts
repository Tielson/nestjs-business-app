import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ExpectedExpensesService } from '@services/expected-expenses/expected-expenses.service';
import { CreateExpectedExpensesDto, UpdateExpectedExpensesDto } from 'src/dtos/expected-expenses/expected-expenses.dto';
import { AuthGuard } from '../../guards/AuthGuard';

@Controller('expected-expenses')
export class ExpectedExpensesController {
  constructor(private readonly expectedExpensesService: ExpectedExpensesService) { }

 
  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.expectedExpensesService.findAll();
  }

 
  @Get('date-range')
  @UseGuards(AuthGuard)
  async findByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return await this.expectedExpensesService.findByDateRange(startDate, endDate);
  }

 
  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: number) {
    return await this.expectedExpensesService.findById(id);
  }

 
  @Post()
  @UseGuards(AuthGuard)
  async create(@Param('id') id: string ,@Body() createExpectedExpensesDto: CreateExpectedExpensesDto) {
    return await this.expectedExpensesService.create({ ...createExpectedExpensesDto, user_id: id });
  }

 
  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: number, @Body() updateExpectedExpensesDto: UpdateExpectedExpensesDto) {
    return await this.expectedExpensesService.update(id, updateExpectedExpensesDto);
  }

 
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: number) {
    return await this.expectedExpensesService.remove(id);
  }
}