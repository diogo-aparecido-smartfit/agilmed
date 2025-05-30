import { parse, format, isValid } from "date-fns";

export function formatFileName(fileName: string): string {
  return fileName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9-_\.]/g, "");
}

/**
 * Recebe uma string de data em formatos como "28/05", "28/05/2025" ou ISO
 * e retorna no formato "yyyy-MM-dd" (SQL Server).
 * Se não conseguir converter, retorna a string original.
 */
export function formatAppointmentDate(dateStr: string): string {
  if (!dateStr) return dateStr;

  // "28/05"
  if (/^\d{2}\/\d{2}$/.test(dateStr)) {
    const now = new Date();
    const parsed = parse(
      dateStr + "/" + now.getFullYear(),
      "dd/MM/yyyy",
      new Date()
    );
    if (isValid(parsed)) return format(parsed, "yyyy-MM-dd");
  }

  // "28/05/2025"
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    const parsed = parse(dateStr, "dd/MM/yyyy", new Date());
    if (isValid(parsed)) return format(parsed, "yyyy-MM-dd");
  }

  // ISO ou Date parseável
  if (!isNaN(Date.parse(dateStr))) {
    return format(new Date(dateStr), "yyyy-MM-dd");
  }

  // Não conseguiu converter
  return dateStr;
}

/**
 * Remove propriedades nulas ou indefinidas de um objeto
 * @param obj Objeto a ser limpo
 * @returns Objeto sem propriedades nulas ou indefinidas
 */
export function removeEmptyFields<T extends Record<string, any>>(
  obj: T
): Partial<T> {
  const result: Partial<T> = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key as keyof T] !== undefined && obj[key as keyof T] !== null) {
      result[key as keyof T] = obj[key as keyof T];
    }
  });

  return result;
}

/**
 * Verifica se um objeto está vazio (sem propriedades)
 */
export function isEmptyObject(obj: Record<string, any>): boolean {
  return obj && Object.keys(obj).length === 0;
}

/**
 * Mescla dois objetos, sobrescrevendo propriedades do objeto base com
 * valores do objeto de origem se eles não forem nulos ou indefinidos
 */
export function mergeObjects<T extends Record<string, any>>(
  base: T,
  source: Partial<T>
): T {
  const result = { ...base };

  Object.keys(source).forEach((key) => {
    const value = source[key as keyof T];
    if (value !== undefined && value !== null) {
      result[key as keyof T] = value;
    }
  });

  return result;
}
