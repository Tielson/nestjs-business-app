const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  // Criar usuários
  for (let i = 0; i < 50; i++) {
    const user = await prisma.user.create({
      data: {
        company: faker.company.name(),
        email: faker.internet.email(),
        number: faker.phone.number(),
        cnpj: faker.string.uuid()
      },
    });

    // Criar pagamentos para cada usuário
    for (let j = 0; j < 5; j++) {
      await prisma.payment.create({
        data: {
          amount: faker.number.int({ min: 100, max: 1000 }),
          date: faker.date.recent(),
          user_id: user.id,
          stripe_payment_id: faker.string.uuid()
        },
      });
    }

    // Criar representantes de vendas para cada usuário
    await prisma.salesRepresentative.create({
      data: {
        full_name: faker.person.fullName(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString(),
        user_id: user.id
      },
    });

    // Criar clientes para cada usuário
    for (let k = 0; k < 10; k++) {
      const customer = await prisma.customer.create({
        data: {
          full_name: faker.person.fullName(),
          date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString(),
          email: faker.internet.email(),
          number: faker.phone.number(),
          cpf: faker.string.uuid(),
          instagram: faker.internet.userName(),
          user_id: user.id
        },
      });

      // Criar histórico de compras para cada cliente
      for (let l = 0; l < 3; l++) {
        await prisma.purchaseHistory.create({
          data: {
            payment_method: faker.finance.transactionType(),
            purchase_date: faker.date.recent().toISOString(),
            item_description: faker.commerce.productDescription(),
            sales_channel: faker.company.name(),
            value: faker.number.int({ min: 100, max: 1000 }),
            customer_id: customer.id,
            user_id: user.id
          },
        });
      }
    }

    // Criar despesas esperadas para cada usuário
    for (let m = 0; m < 3; m++) {
      await prisma.expectedExpenses.create({
        data: {
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          value: faker.number.int({ min: 100, max: 1000 }),
          method: faker.finance.transactionType(),
          recurrence: faker.date.future().toISOString(),
          date: faker.date.recent().toISOString(),
          user_id: user.id
        },
      });
    }

    // Criar despesas para cada usuário
    for (let n = 0; n < 3; n++) {
      await prisma.expenses.create({
        data: {
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          value: faker.number.int({ min: 100, max: 1000 }),
          method: faker.finance.transactionType(),
          date: faker.date.recent().toISOString(),
          user_id: user.id
        },
      });
    }

    // Criar outras rendas para cada usuário
    for (let o = 0; o < 3; o++) {
      await prisma.otherIncome.create({
        data: {
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          value: faker.number.int({ min: 100, max: 1000 }),
          method: faker.finance.transactionType(),
          date: faker.date.recent().toISOString(),
          user_id: user.id
        },
      });
    }
  }
  console.log('Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });