import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();
  
  // Cálculo do próximo ciclo para exibir a mensagem de "Futuro"
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCyleType = getNextCycleType(nextCycle);

  // Mensagens para quando a tarefa JÁ ESTÁ em andamento (Presente)
  const tipsForWhenActiveTask = {
    workTime: <span>Foque por {state.config.workTime}min</span>,
    shortBreakTime: <span>Descanse por {state.config.shortBreakTime}min</span>,
    longBreakTime: <span>Descanso longo</span>,
  };

  // Mensagens para quando NÃO HÁ tarefa ativa (Futuro)
  const tipsForNoActiveTask = {
    workTime: (
      <span>
        Próximo ciclo é de <b>{state.config.workTime}min</b>
      </span>
    ),
    shortBreakTime: (
      <span>Próximo descanso é de {state.config.shortBreakTime}min</span>
    ),
    longBreakTime: <span>Próximo descanso será longo</span>,
  };

  return (
    <>
      {/* Se houver tarefa ativa, mostra a dica baseada no tipo da tarefa atual */}
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      
      {/* Se não houver, mostra a dica baseada no que virá no próximo clique */}
      {!state.activeTask && tipsForNoActiveTask[nextCyleType]}
    </>
  );
}