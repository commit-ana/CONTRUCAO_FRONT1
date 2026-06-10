import type { TaskModel } from '../models/TaskModel';

// Define os parâmetros esperados pela função
export type SortTasksOptions = {
  tasks: TaskModel[]; // Lista de tarefas que será ordenada
  direction?: 'asc' | 'desc'; // Direção da ordenação: crescente ou decrescente (opcional)
  field?: keyof TaskModel; // Qual campo da tarefa será usado para ordenar (opcional)
};

export function sortTasks({
  field = 'startDate', // Se o campo não for informado, usamos 'startDate' como padrão
  direction = 'desc', // Se a direção não for informada, usamos 'desc' (decrescente)
  tasks = [], // Se nenhuma lista for passada, usamos uma lista vazia
}: SortTasksOptions): TaskModel[] {
  
  // ✨ CÓPIA DEFENSIVA: O spread [...tasks] evita mutar diretamente o estado do React
  return [...tasks].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    // --- TRATANDO VALORES NULOS ---
    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return 1;
    if (bValue === null) return -1;

    // --- COMPARAÇÃO NUMÉRICA ---
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc'
        ? aValue - bValue // Ex: 1, 2, 3...
        : bValue - aValue; // Ex: 3, 2, 1...
    }

    // --- COMPARAÇÃO DE STRINGS ---
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc'
        ? aValue.localeCompare(bValue) // A -> Z
        : bValue.localeCompare(aValue); // Z -> A
    }

    return 0;
  });
}