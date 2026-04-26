import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PersonsModule } from './lib/persons/persons.module';

import { RolsModule } from './lib/rols/rols.module';
import { CustomersModule } from './lib/customers/customers.module';
import { UsersModule } from './lib/users/users.module';
import { AuthModule } from './lib/auth/auth.module';
import { BanksModude } from './lib/banks/banks.module';
import { AccountTypeModule } from './lib/account-type/account-type.module';
import { BanksAccountsModule } from './lib/banks-account/banks-accounts.module';
import { ExpenseModule } from './lib/expenses/expense.module';
import { BankAgentsModule } from './lib/banks-agents/bank-agents.module';

@Module({
  imports: [
    PersonsModule,
    RolsModule,
    CustomersModule,
    UsersModule,
    AuthModule,
    BanksModude,
    AccountTypeModule,
    BanksAccountsModule,
    ExpenseModule,
    BankAgentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
