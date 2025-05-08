import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SalesRepresentativeService } from '@services/sales-representative/sales-representative.service';
import { AuthGuard } from '../../guards/AuthGuard';

import { CreateSalesRepresentativeDto, UpdateSalesRepresentativeDto } from '../../dtos/users/salesRepresentative.dto';

@Controller('sales-representative')
export class SalesRepresentativeController {
  constructor(private readonly salesRepresentativeService: SalesRepresentativeService) { }

 
  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.salesRepresentativeService.findAll();
  }

 
  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: number) {
    return await this.salesRepresentativeService.findById(id);
  }

 
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createSalesRepresentativeDto: CreateSalesRepresentativeDto) {
    return await this.salesRepresentativeService.create({ ...createSalesRepresentativeDto });
  }

 
  @Put()
  @UseGuards(AuthGuard)
  async update(@Param('id') id: number, @Body() updateSalesRepresentativeDto: UpdateSalesRepresentativeDto) {
    return await this.salesRepresentativeService.update(id, updateSalesRepresentativeDto);
  }

 
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: number) {
    return await this.salesRepresentativeService.remove(id);
  }
}