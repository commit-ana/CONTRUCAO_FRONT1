let intervalId = null;

self.onmessage = function (event) {
  const state = event.data;

  // 1. Se não recebeu o estado ou não tem tarefa ativa, paramos o relógio
  if (!state || !state.activeTask) {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    return;
  }

  // 2. Extraímos a tarefa ativa de forma segura
  const activeTask = state.activeTask;

  // 3. Limpamos qualquer timer antigo para não duplicar
  if (intervalId) {
    clearInterval(intervalId);
  }

  // 4. Iniciamos o novo contador
  intervalId = setInterval(() => {
    // Calculamos quanto tempo já passou desde o startDate
    const timeElapsedInSeconds = Math.floor(
      (Date.now() - activeTask.startDate) / 1000
    );

    const totalDurationInSeconds = activeTask.duration * 60;
    const remainingSeconds = totalDurationInSeconds - timeElapsedInSeconds;

    // Enviamos os segundos restantes de volta para a tela (TaskContextProvider)
    self.postMessage(remainingSeconds);

    // Se zerou, para o relógio interno
    if (remainingSeconds <= 0) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }, 1000); // Roda a cada 1 segundo (1000ms)
};