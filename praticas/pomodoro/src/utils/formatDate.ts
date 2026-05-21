import { format } from 'date-fns';

/**
 * Converte um timestamp numérico em uma string de data legível (padrão PT-BR).
 * @param timestamp Milissegundos desde a época Unix (ex: task.startDate)
 * @returns String formatada como: dd/MM/yyyy HH:mm
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return format(date, 'dd/MM/yyyy HH:mm');
}