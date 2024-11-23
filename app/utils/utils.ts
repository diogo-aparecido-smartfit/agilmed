export const convertToISODate = (dateStr: string) => {
  // Extrai o dia, mês e ano da string DDMMYYYY
  const day = dateStr.substring(0, 2); // Pegando os 2 primeiros caracteres (dia)
  const month = dateStr.substring(2, 4); // Pegando os 2 caracteres do meio (mês)
  const year = dateStr.substring(4, 8); // Pegando os 4 últimos caracteres (ano)

  // Monta a data no formato YYYY-MM-DD
  const formattedDate = `${year}-${month}-${day}`;

  // Converte para um objeto Date e retorna a data no formato ISO
  const isoDate = new Date(formattedDate).toISOString();

  return isoDate;
};

export function getFirstAndLastName(fullName: string): string {
  if (!fullName || typeof fullName !== "string") {
    return "";
  }

  const nameParts = fullName.trim().split(" ");

  if (nameParts.length === 1) {
    return nameParts[0];
  }

  return `${nameParts[0]} ${nameParts[1]}`;
}
