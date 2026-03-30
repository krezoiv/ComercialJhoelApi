/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CaseMapper } from '../mappers/case.mapper';

@Injectable()
export class SpExecutorService {
  constructor(private readonly prisma: PrismaService) {}

  async execute<T>(
    query: TemplateStringsArray,
    ...values: any[]
  ): Promise<T[]> {
    try {
      const result = await this.prisma.$queryRaw<any[]>(query, ...values);

      const mapped = CaseMapper.toCamelCase(result);

      return mapped as T[];
    } catch (error) {
      console.error('SP Error:', error);
      throw new Error('Database error executing stored procedure');
    }
  }
}
