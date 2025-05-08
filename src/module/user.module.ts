import { Module, forwardRef } from '@nestjs/common';
import { CashControl } from '@services/cash-control/cash-control.service';
import { CustomerService } from '@services/customer/customer.service';
import { ExpectedExpensesService } from '@services/expected-expenses/expected-expenses.service';
import { ExpensesService } from '@services/expenses/expenses.service';
import { OtherIncomeService } from '@services/other-income/other-income.service';
import { PurchaseHistoryService } from '@services/purchase-history/purchase-history.service';
import { SalesRepresentativeService } from '@services/sales-representative/sales-representative.service';
import { UserService } from '@services/user/user.service';
import { CashControlController } from 'src/controllers/cash-control/cash-control.controller';
import { CustomerController } from 'src/controllers/customer/customer.controller';
import { ExpectedExpensesController } from 'src/controllers/expected-expenses/expected-expenses.controller';
import { ExpensesController } from 'src/controllers/expenses/expenses.controller';
import { OtherIncomeController } from 'src/controllers/other-income/other-income.controller';
import { PurchaseHistoryController } from 'src/controllers/purchase-history/purchase-history.controller';
import { SalesRepresentativeController } from 'src/controllers/sales-representative/sales-representative.controller';
import { UserController } from 'src/controllers/user/user.controller';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],
  providers: [UserService, CustomerService, PurchaseHistoryService,
    ExpectedExpensesService, SalesRepresentativeService,
    ExpensesService, OtherIncomeService, CashControl],

  controllers: [UserController, SalesRepresentativeController,
    CustomerController, PurchaseHistoryController, ExpectedExpensesController,
    ExpensesController, OtherIncomeController, CashControlController],

  exports: [UserService, CustomerService, PurchaseHistoryService,
    ExpectedExpensesService, SalesRepresentativeService, ExpensesService,
    OtherIncomeService, CashControl],
})
export class UserModule { }
