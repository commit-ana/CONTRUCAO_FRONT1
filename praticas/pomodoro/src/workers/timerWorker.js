/* eslint-disable no-restricted-globals */

// 💡 TRUQUE: Começa em 0. O TypeScript entende que é um número e o Babel não quebra!
let timerId = 0;

self.addEventListener('message', (e) => {
  const state = e.data;

  // Se a tarefa não estiver ativa ou sumir, limpa tudo e para
  if (!state || !state.activeTask) {
    if (timerId) {
      clearInterval(timerId);
      timerId = 0;
    }
    return;
  }

  // Se o timer já está rodando (diferente de 0), ignora para não duplicar
  if (timerId) return;

  let secondsRemaining = state.secondsRemaining;

  timerId = setInterval(() => {
    secondsRemaining--;
    
    // Envia os segundos atualizados de volta para o Contexto
    self.postMessage(secondsRemaining);

    if (secondsRemaining <= 0) {
      clearInterval(timerId);
      timerId = 0;
    }
  }, 1000);
});