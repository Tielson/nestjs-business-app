import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CustomerService } from '@services/customer/customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customers/customer.dto';
import { AuthGuard } from '../../guards/AuthGuard';


@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

 
  @Get()
  // @UseGuards(AuthGuard)
  async findAll(@Query('user_id') user_id: string) {
    return await this.customerService.findAll(user_id);
  }

 
  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: number) {
    return await this.customerService.findById(id);
  }

 
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    console.log(createCustomerDto)
    return await this.customerService.create({ ...createCustomerDto });
  }

 
  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    return await this.customerService.update(id, updateCustomerDto);
  }

 
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: number) {
    return await this.customerService.remove(id);
  }
}