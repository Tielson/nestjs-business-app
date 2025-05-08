import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PurchaseHistory } from '@prisma/client';
import { CreatePurchaseHistoryDto, UpdatePurchaseHistoryDto } from 'src/dtos/purchase-history/pursh-history.dto';
import { formatDateToISO } from 'src/utils/format-Date-To-ISO';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PurchaseHistoryService {
  constructor(private readonly prisma: PrismaService) { }

  // Lista todos os históricos de compra
  async findAll(): Promise<PurchaseHistory[]> {
    return await this.prisma.purchaseHistory.findMany();
  }

  // Busca um histórico de compra por ID
  async findById(id: number): Promise<PurchaseHistory | null> {
    const purchaseHistory = await this.prisma.purchaseHistory.findUnique({
      where: { id },
    });
    if (!purchaseHistory) {
      throw new NotFoundException('Histórico de compra não encontrado');
    }
    return purchaseHistory;
  }

  // Busca históricos de compra por intervalo de datas
  async findByDateRange(startDate: string, endDate: string): Promise<PurchaseHistory[]> {
    const start = formatDateToISO(startDate);
    const end = formatDateToISO(endDate);
    return await this.prisma.purchaseHistory.findMany({
      where: {
        purchase_date: {
          gte: start,
          lte: end,
        },
      },
    });
}

  // Cria um novo histórico de compra
  async create(createPurchaseHistoryDto: CreatePurchaseHistoryDto): Promise<PurchaseHistory> {
    const FormatDateToISO = formatDateToISO(createPurchaseHistoryDto.purchase_date)
    try {
      return await this.prisma.purchaseHistory.create({
        data: {
          payment_method: createPurchaseHistoryDto.payment_method,
          purchase_date: FormatDateToISO,
          item_description: createPurchaseHistoryDto.item_description,
          sales_channel: createPurchaseHistoryDto.sales_channel,
          value: createPurchaseHistoryDto.value,
          customer_id: createPurchaseHistoryDto.customer_id,
          user_id: createPurchaseHistoryDto.user_id,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Atualiza um histórico de compra por ID
  async update(id: number, updatePurchaseHistoryDto: UpdatePurchaseHistoryDto): Promise<PurchaseHistory> {
    const FormatDateToISO = formatDateToISO(updatePurchaseHistoryDto.purchase_date)
    try {
      const purchaseHistory = await this.prisma.purchaseHistory.update({
        where: { id },
        data: {
          payment_method: updatePurchaseHistoryDto.payment_method,
          purchase_date: FormatDateToISO,
          item_description: updatePurchaseHistoryDto.item_description,
          sales_channel: updatePurchaseHistoryDto.sales_channel,
          value: updatePurchaseHistoryDto.value,
        },
      });
      if (!purchaseHistory) {
        throw new NotFoundException('Histórico de compra não encontrado');
      }
      return purchaseHistory;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Remove um histórico de compra por ID
  async remove(id: number): Promise<PurchaseHistory> {
    try {
      const purchaseHistory = await this.prisma.purchaseHistory.delete({
        where: { id },
      });
      return purchaseHistory;
    } catch (error) {
      throw new NotFoundException('Histórico de compra não encontrado');
    }
  }
}