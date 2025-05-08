import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { OtherIncomeService } from '@services/other-income/other-income.service';
import { CreateOtherIncomeDto, UpdateOtherIncomeDto } from 'src/dtos/other-income/other-income.dto';
import { AuthGuard } from '../../guards/AuthGuard';

@Controller('other-income')
export class OtherIncomeController {
  constructor(private readonly otherIncomeService: OtherIncomeService) {}

 
  @Get()
    @UseGuards(AuthGuard)
  async findAll() {
    return await this.otherIncomeService.findAll();
  }

 
  @Get('date-range')
    @UseGuards(AuthGuard)
  async findByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return await this.otherIncomeService.findByDateRange(startDate, endDate);
  }

 
  @Get(':id')
    @UseGuards(AuthGuard)
  async findById(@Param('id') id: number) {
    return await this.otherIncomeService.findById(id);
  }

 
  @Post()
    @UseGuards(AuthGuard)
  async create(@Param('id') id: string, @Body() createOtherIncomeDto: CreateOtherIncomeDto) {
    return await this.otherIncomeService.create({ ...createOtherIncomeDto, user_id: id });
  }

 
  @Put(':id')
    @UseGuards(AuthGuard)
  async update(@Param('id') id: number, @Body() updateOtherIncomeDto: UpdateOtherIncomeDto) {
    return await this.otherIncomeService.update(id, updateOtherIncomeDto);
  }

 
  @Delete(':id')
    @UseGuards(AuthGuard)
  async remove(@Param('id') id: number) {
    return await this.otherIncomeService.remove(id);
  }
}