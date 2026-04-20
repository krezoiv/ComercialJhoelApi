import { randomUUID } from 'crypto';
import {
  BankId,
  BankName,
  Banks,
  Description,
} from '../../domain/index-banks-domain';
import { createBanksInput } from '../../infrastructure/index-banks-infrastructure';

export class BanksMapper {
  static toEntity(input: createBanksInput): Banks {
    const id = new BankId(randomUUID());
    const bankName = new BankName(input.bankName);
    const description = new Description(input.description);
    const now = new Date();

    return new Banks(id, bankName, description, now, now, null);
  }

  static toResponseDto(bank: Banks) {
    return {
      id: bank.id.value,
      bankName: bank.bankName.value,
      description: bank.description.value,
    };
  }
}
