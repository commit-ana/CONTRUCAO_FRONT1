// 1. Aponta para aquele arquivo de áudio que baixamos na Prática 60
// Se o seu arquivo se chama beep.mp3, troque o nome aqui!
import beepSound from '../assets/audios/beep.mp3';

export function loadBeep() {
  // Prepara o áudio na memória
  const audio = new Audio(beepSound);
  audio.load();

  // Retorna uma função pronta para ser disparada a qualquer momento
  return () => {
    audio.currentTime = 0; // Volta a fita pro começo
    audio.play().catch(error => console.log('Erro ao tocar áudio', error));
  };
}