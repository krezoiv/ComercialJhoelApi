import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ProcessBankAgentItemDto } from './process-bank-agent-item.dto';

export class ProcessBankAgentsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProcessBankAgentItemDto)
  data!: ProcessBankAgentItemDto[];
}
