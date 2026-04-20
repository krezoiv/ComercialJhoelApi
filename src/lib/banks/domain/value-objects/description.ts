import { ValueObject } from 'src/shared/domain/index-shared-domin';

export class Description extends ValueObject<string> {
  constructor(value: string) {
    const normalized = value.trim();
    super(normalized);
    this.ensuereIsValidDescription();
  }

  private ensuereIsValidDescription() {
    if (this.value === '') {
      throw new Error('Description no debe de estar vacia');
    }

    if (this.value.length < 5 || this.value.length > 255) {
      throw new Error(
        'La descripción debe de contener entre 5 a 255 caracters',
      );
    }
  }
}
