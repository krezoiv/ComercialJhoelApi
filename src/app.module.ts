import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PersonsModule } from './lib/persons/persons.module';
import { CustomersModule } from './lib/customers/customers.module';

@Module({
  imports: [PersonsModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
