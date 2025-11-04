const API_URL = 'http://localhost:3001/api';

let authToken: string | null = localStorage.getItem('authToken');

export function setAuthToken(token: string) {
  authToken = token;
  localStorage.setItem('authToken', token);
}

export function clearAuthToken() {
  authToken = null;
  localStorage.removeItem('authToken');
}

async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const headers: any = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
  },

  profile: {
    get: (userId: string) => fetchApi(`/profile/${userId}`),
  },

  panchayats: {
    list: () => fetchApi('/panchayats'),
  },

  attendance: {
    getToday: (workerId: string) => fetchApi(`/attendance/${workerId}/today`),
    checkIn: (data: any) =>
      fetchApi('/attendance/checkin', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    checkOut: (id: string, data: any) =>
      fetchApi(`/attendance/${id}/checkout`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  wasteLogs: {
    getToday: (workerId: string) => fetchApi(`/waste-logs/${workerId}/today`),
    create: (data: any) =>
      fetchApi('/waste-logs', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  dashboard: {
    getStats: (panchayatId: string) => fetchApi(`/dashboard/${panchayatId}/stats`),
  },

  feedback: {
    list: (panchayatId: string, status?: string) => {
      const query = status ? `?status=${status}` : '';
      return fetchApi(`/feedback/${panchayatId}${query}`);
    },
    create: (data: any) =>
      fetchApi('/feedback', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateStatus: (id: string, status: string) =>
      fetchApi(`/feedback/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }),
  },
};
