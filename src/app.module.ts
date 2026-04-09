import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PersonsModule } from './lib/persons/persons.module';

import { RolsModule } from './lib/rols/rols.module';
import { CustomersModule } from './lib/customers/customers.module';
import { UsersModule } from './lib/users/users.module';
import { AuthModule } from './lib/auth/auth.module';

@Module({
  imports: [
    PersonsModule,
    RolsModule,
    CustomersModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
