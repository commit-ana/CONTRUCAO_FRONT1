import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../components/templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate'; // ✨ Novo Import!
import styles from './styles.module.css';

export function History() {
  const { state } = useTaskContext();

  /** 🔄 Mais recente primeiro: Inverte o array original sem mutá-lo diretamente */
  const tasksNewestFirst = [...state.tasks].reverse();

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color='red'
              aria-label='Apagar todo o histórico'
              title='Apagar histórico'
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {tasksNewestFirst.map((task) => {
                // Lógica provisória para exibir o status bruto no debug
                let statusExibido = 'Em andamento';
                if (task.completeDate) statusExibido = 'Completa';
                else if (task.interruptDate) statusExibido = 'Interrompida';

                return (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration}min</td>
                    
                    {/* ✨ PASSO 3: Utilizando a formatação profissional do date-fns */}
                    <td>{formatDate(task.startDate)}</td>
                    
                    <td>{statusExibido}</td>
                    <td>{task.type}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}