import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    // Deletar todas as entradas de todas as tabelas
    await prisma.payment.deleteMany({});
    await prisma.salesRepresentative.deleteMany({});
    await prisma.customer.deleteMany({});
    await prisma.purchaseHistory.deleteMany({});
    await prisma.expectedExpenses.deleteMany({});
    await prisma.expenses.deleteMany({});
    await prisma.otherIncome.deleteMany({});
    await prisma.user.deleteMany({});

    console.log('Banco de dados limpo com sucesso.');
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();