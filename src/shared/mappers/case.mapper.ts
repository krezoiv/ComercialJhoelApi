export class CaseMapper {
  static toCamelCase<T>(obj: unknown): T {
    // ✅ arrays
    if (Array.isArray(obj)) {
      return obj.map((item) => this.toCamelCase(item)) as T;
    }

    // ✅ detectar Date real
    if (obj instanceof Date) {
      return obj as T;
    }

    // ✅ detectar objetos vacíos (tu caso)
    if (
      obj !== null &&
      typeof obj === 'object' &&
      Object.keys(obj).length === 0
    ) {
      return null as T; // 🔥 AQUÍ ESTÁ LA MAGIA
    }

    // ✅ objetos normales
    if (obj !== null && typeof obj === 'object') {
      const result: Record<string, unknown> = {};

      for (const key in obj as Record<string, unknown>) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          letter.toUpperCase(),
        );

        const value = (obj as Record<string, unknown>)[key];

        result[camelKey] = this.toCamelCase(value);
      }

      return result as T;
    }

    return obj as T;
  }
}
