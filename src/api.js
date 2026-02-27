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

  // RPM Flask backend – vitals
  async getVitalsLatest() {
    const res = await fetch(`${BASE}/api/vitals/latest`);
    if (!res.ok) throw new Error('Vitals error');
    return res.json();
  },
  async getVitalsHistory(limit = 50) {
    const res = await fetch(`${BASE}/api/vitals/history?limit=${limit}`);
    if (!res.ok) throw new Error('Vitals history error');
    return res.json();
  },

  // Alerts
  async getAlerts(limit = 20) {
    const res = await fetch(`${BASE}/api/alerts?limit=${limit}`);
    if (!res.ok) throw new Error('Alerts error');
    return res.json();
  },

  // Thresholds
  async getThresholds() {
    const res = await fetch(`${BASE}/api/thresholds`);
    if (!res.ok) throw new Error('Thresholds error');
    return res.json();
  },
  async putThresholds(thresholds) {
    const res = await fetch(`${BASE}/api/thresholds`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(thresholds),
    });
    if (!res.ok) throw new Error('Update thresholds error');
    return res.json();
  },

  // Emergency workflow (demo)
  async triggerEmergency(alert = null, source = 'manual') {
    const res = await fetch(`${BASE}/api/emergency/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alert, source }),
    });
    if (!res.ok) throw new Error('Emergency trigger error');
    return res.json();
  },
};
