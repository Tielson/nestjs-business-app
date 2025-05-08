import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PurchaseHistoryService } from '@services/purchase-history/purchase-history.service';
import { CreatePurchaseHistoryDto, UpdatePurchaseHistoryDto } from 'src/dtos/purchase-history/pursh-history.dto';
import { AuthGuard } from '../../guards/AuthGuard';


@Controller('purchase-history')
export class PurchaseHistoryController {
  constructor(private readonly purchaseHistoryService: PurchaseHistoryService) { }

 
  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.purchaseHistoryService.findAll();
  }

 
  @Get('date-range')
  @UseGuards(AuthGuard)
  async findByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return await this.purchaseHistoryService.findByDateRange(startDate, endDate);
  }

 
  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: number) {
    return await this.purchaseHistoryService.findById(id);
  }


 
  @Post()
  @UseGuards(AuthGuard)
  async create(@Param('id') id: string, @Body() createPurchaseHistoryDto: CreatePurchaseHistoryDto) {
    return await this.purchaseHistoryService.create({ ...createPurchaseHistoryDto, user_id: id });
  }

 
  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: number, @Body() updatePurchaseHistoryDto: UpdatePurchaseHistoryDto) {
    return await this.purchaseHistoryService.update(id, updatePurchaseHistoryDto);
  }

 
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: number) {
    return await this.purchaseHistoryService.remove(id);
  }
}