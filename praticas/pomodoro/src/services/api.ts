const API_URL = "http://localhost:3333";

// SETTINGS
export async function getSettings() {
  const response = await fetch(`${API_URL}/settings`);
  return response.json();
}

export async function saveSettings(data: {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
}) {
  const response = await fetch(`${API_URL}/settings`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

// TASKS
export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks`);
  return response.json();
}

export async function createTask(task: {
  id: string;
  name: string;
  duration: number;
  type: string;
  startDate: number;
}) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function completeTask(id: string, completeDate: number) {
  const response = await fetch(`${API_URL}/tasks/${id}/complete`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completeDate }),
  });
  return response.json();
}

export async function interruptTask(id: string, interruptDate: number) {
  const response = await fetch(`${API_URL}/tasks/${id}/interrupt`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ interruptDate }),
  });
  return response.json();
}

export async function deleteTasks() {
  await fetch(`${API_URL}/tasks`, { method: "DELETE" });
}