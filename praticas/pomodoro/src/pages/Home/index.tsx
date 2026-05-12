import React from 'react';
import { Container } from '../../components/Container';
import { CountDown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';
import { MainTemplate } from '../../components/templates/MainTemplate';
// Certifica-te de que o nome do ficheiro abaixo é TaskStateModel ou TaskModels
import type { TaskStateModel } from '../../models/TaskStateModel';

// 1. Definição do "contrato" das propriedades
type HomeProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

export function Home(props: HomeProps) {
  const { state, setState } = props;

  return (
    <MainTemplate>
      <Container>
        {/* O CountDown e o MainForm estão aqui dentro */}
        {/* Nas próximas aulas, passaremos o state para eles */}
        <CountDown />
      </Container>

      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
  );
}