const BASE = import.meta.env.VITE_API_URL || '';

export const api = {
  async getHello() {
    const res = await fetch(`${BASE}/api/hello`);
    if (!res.ok) throw new Error('API error');
    return res.json();
  },
  async getHealth() {
    const res = await fetch(`${BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return res.json();
  },
};
