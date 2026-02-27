import { useState, useEffect } from 'react';
import { api } from './api';

function App() {
  const [message, setMessage] = useState('');
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getHello(), api.getHealth()])
      .then(([helloRes, healthRes]) => {
        setMessage(helloRes.message);
        setHealth(healthRes);
      })
      .catch(() => setMessage('Backend not running — start it with: cd backend && npm run dev'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="app">Loading...</div>;

  return (
    <div className="app">
      <header>
        <h1>RPM Hackathon App</h1>
        <p>React + Node.js — ready to build</p>
      </header>
      <main>
        <section className="card">
          <h2>API Status</h2>
          <p>{message}</p>
          {health && <pre>{JSON.stringify(health, null, 2)}</pre>}
        </section>
      </main>
    </div>
  );
}

export default App;
