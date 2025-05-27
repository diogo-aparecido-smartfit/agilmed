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
