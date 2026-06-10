export class TimerWorkerManager {
  private static instance: TimerWorkerManager;
  private worker: Worker | null = null;

  private constructor() {}

  public static getInstance(): TimerWorkerManager {
    if (!TimerWorkerManager.instance) {
      TimerWorkerManager.instance = new TimerWorkerManager();
    }
    return TimerWorkerManager.instance;
  }

  // Garante que se o worker for nulo (ou deletado), um novo será criado
  private getWorker(): Worker {
    if (!this.worker) {
      this.worker = new Worker(
        new URL('./TimerWorkerManager.ts', import.meta.url),
        { type: 'module' }
      );
    }
    return this.worker;
  }

  public postMessage(message: any): void {
    this.getWorker().postMessage(message);
  }

  public onmessage(callback: (e: MessageEvent) => void): void {
    this.getWorker().onmessage = callback;
  }

  public terminate(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null; // ✨ CRUCIAL: Abre espaço para um novo Worker nascer no próximo clique
    }
  }
}