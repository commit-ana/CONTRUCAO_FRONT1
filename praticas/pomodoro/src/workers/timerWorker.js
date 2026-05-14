let isRunning = false;

self.onmessage = function (event) {
  const state = event.data;

  // 🛡️ TRAVA DE SEGURANÇA: Se não tiver tarefa ativa (null), ignora e não faz nada!
  if (!state || !state.activeTask) {
    return; 
  }

  // Se já estiver rodando, não duplica o timer
  if (isRunning) return;
  isRunning = true;

  const { activeTask, secondsRemaining } = state;

  // Agora é seguro ler o startDate, porque sabemos que a activeTask existe!
  const startTimestamp = new Date(activeTask.startDate).getTime();
  const endDate = startTimestamp + (secondsRemaining * 1000);

  function tick() {
    const now = Date.now();
    const countDownSeconds = Math.floor((endDate - now) / 1000);

    if (countDownSeconds <= 0) {
      self.postMessage(0);
      isRunning = false;
      return;
    }

    self.postMessage(countDownSeconds);
    setTimeout(tick, 1000); // Roda de novo em 1 segundo
  }

  tick();
};