export function formatDateToISO(date: string): string {
  // Verifica se a data está no formato correto
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  if (!dateRegex.test(date)) {
    throw new Error("A data deve estar no formato DD-MM-YYYY");
  }

  // Divide a data nos componentes dia, mês e ano
  const [day, month, year] = date.split('-');
  
  // Retorna a data no formato YYYY-MM-DD
  return `${year}-${month}-${day}`;
}
