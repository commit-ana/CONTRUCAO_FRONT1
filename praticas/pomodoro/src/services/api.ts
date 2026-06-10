const API_URL = "http://localhost:3333";

function getToken() {
  return localStorage.getItem('chronos_token');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  };
}

// SETTINGS
export async function getSettings() {
  const response = await fetch(`${API_URL}/settings`, {
    headers: authHeaders(),
  });
  return response.json();
}

export async function saveSettings(data: {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
}) {
  const response = await fetch(`${API_URL}/settings`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

// TASKS
export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: authHeaders(),
  });
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
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function completeTask(id: string, completeDate: number) {
  const response = await fetch(`${API_URL}/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ completeDate }),
  });
  return response.json();
}

export async function interruptTask(id: string, interruptDate: number) {
  const response = await fetch(`${API_URL}/tasks/${id}/interrupt`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ interruptDate }),
  });
  return response.json();
}

export async function deleteTasks() {
  await fetch(`${API_URL}/tasks`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
}

// AUTH
export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}

export async function forgotPassword(email: string) {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return response.json();
}

export async function resetPassword(token: string, password: string) {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}