import { Link } from "react-router-dom";
import { BarChart, TrendingUp, AlertCircle, History } from "lucide-react";
import { useMemo, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ZAxis,
} from "recharts";
import { api } from "../api";

const Dashboard = () => {
  const [vitalsLatest, setVitalsLatest] = useState(null);
  const [vitalsHistory, setVitalsHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [latest, history, alertsRes] = await Promise.all([
          api.getVitalsLatest().catch(() => null),
          api.getVitalsHistory(50).catch(() => []),
          api.getAlerts(20).catch(() => []),
        ]);
        if (!cancelled) {
          setVitalsLatest(latest);
          setVitalsHistory(Array.isArray(history) ? history : []);
          setAlerts(Array.isArray(alertsRes) ? alertsRes : []);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    const interval = setInterval(load, 4000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const metrics = useMemo(() => {
    const v = vitalsLatest;
    if (!v) {
      return [
        { title: "Blood Pressure", value: "—", unit: "mmHg", status: "normal", change: "—" },
        { title: "Heart Rate", value: "—", unit: "bpm", status: "normal", change: "—" },
        { title: "SpO₂", value: "—", unit: "%", status: "normal", change: "—" },
        { title: "Temp", value: "—", unit: "°C", status: "normal", change: "—" },
      ];
    }
    const sys = v.systolic ?? 0;
    const dia = v.diastolic ?? 0;
    const hr = v.heartRate ?? 0;
    const spo2 = v.bloodOxygen ?? 0;
    const temp = v.temperature ?? 0;
    return [
      {
        title: "Blood Pressure",
        value: `${sys}/${dia}`,
        unit: "mmHg",
        status: sys > 140 || dia > 90 ? "elevated" : "normal",
        change: "live",
      },
      {
        title: "Heart Rate",
        value: String(hr),
        unit: "bpm",
        status: hr > 100 || hr < 50 ? "elevated" : "normal",
        change: "live",
      },
      {
        title: "SpO₂",
        value: String(spo2),
        unit: "%",
        status: spo2 < 95 ? "elevated" : "normal",
        change: "live",
      },
      {
        title: "Temp",
        value: typeof temp === "number" ? temp.toFixed(1) : String(temp),
        unit: "°C",
        status: "normal",
        change: "live",
      },
    ];
  }, [vitalsLatest]);

  const lineChartData = useMemo(() => {
    return vitalsHistory
      .slice()
      .reverse()
      .map((r, i) => ({
        index: i + 1,
        time: new Date(r.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        heartRate: r.heartRate ?? 0,
        systolic: r.systolic ?? 0,
        diastolic: r.diastolic ?? 0,
      }));
  }, [vitalsHistory]);

  const scatterData = useMemo(() => {
    return vitalsHistory.map((r) => ({
      x: r.systolic ?? 0,
      y: r.diastolic ?? 0,
      z: r.heartRate ?? 0,
      timestamp: r.timestamp,
    }));
  }, [vitalsHistory]);

  const recentReadings = useMemo(() => {
    return vitalsHistory
      .slice(-8)
      .reverse()
      .map((r) => ({
        date: new Date(r.timestamp).toLocaleDateString(),
        time: new Date(r.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        bp: `${r.systolic ?? 0}/${r.diastolic ?? 0}`,
        hr: String(r.heartRate ?? 0),
        status: (r.systolic > 140 || r.diastolic > 90 || r.heartRate > 100) ? "Elevated" : "Normal",
      }));
  }, [vitalsHistory]);

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <h1 className="dashboard-title">Health Dashboard</h1>
            <p className="dashboard-subtitle">
              Monitor your heart health metrics in real-time
            </p>
          </div>
          <Link
            to="/dashboard/patient-history"
            className="nav-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              background: "rgba(0,0,0,0.06)",
              borderRadius: 8,
            }}
          >
            <History size={18} /> Patient History
          </Link>
        </div>

        {error && (
          <p style={{ color: "#dc3545", marginBottom: "1rem" }}>{error}</p>
        )}
        {loading && !vitalsLatest && (
          <p style={{ color: "rgba(0,0,0,0.7)" }}>Loading vitals…</p>
        )}

        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="metric-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="metric-header">
                <div className="metric-icon">
                  <BarChart size={24} />
                </div>
                <span
                  className={`metric-change ${
                    metric.change === "live"
                      ? "neutral"
                      : metric.change.startsWith("+")
                        ? "positive"
                        : metric.change.startsWith("-")
                          ? "negative"
                          : "neutral"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <h3 className="metric-label">{metric.title}</h3>
              <div className="metric-value-group">
                <span className="metric-value">{metric.value}</span>
                <span className="metric-unit">{metric.unit}</span>
              </div>
              <div className="metric-status">{metric.status}</div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="chart-card">
            <h2 className="card-title" style={{ display: "flex", alignItems: "center" }}>
              <TrendingUp size={20} style={{ marginRight: "0.5rem" }} /> Heart Rate Trend
            </h2>
            <div style={{ width: "100%", height: 220, marginTop: "1rem" }}>
              {lineChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineChartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                    <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="rgba(0,0,0,0.5)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="rgba(0,0,0,0.5)" domain={["auto", "auto"]} />
                    <Tooltip
                      contentStyle={{ fontSize: 12, borderRadius: 8 }}
                      formatter={(value) => [value, "Heart rate"]}
                      labelFormatter={(_, payload) => payload?.[0]?.payload?.time}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="heartRate"
                      name="Heart rate (bpm)"
                      stroke="#0f172a"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="chart-placeholder" style={{ minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ color: "#333", fontSize: "1rem" }}>Waiting for vitals…</p>
                </div>
              )}
            </div>
          </div>

          <div className="chart-card">
            <h2 className="card-title" style={{ display: "flex", alignItems: "center" }}>
              <TrendingUp size={20} style={{ marginRight: "0.5rem" }} /> BP Scatter (Systolic vs Diastolic)
            </h2>
            <div style={{ width: "100%", height: 220, marginTop: "1rem" }}>
              {scatterData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                    <XAxis type="number" dataKey="x" name="Systolic" unit=" mmHg" tick={{ fontSize: 11 }} stroke="rgba(0,0,0,0.5)" domain={["dataMin - 5", "dataMax + 5"]} />
                    <YAxis type="number" dataKey="y" name="Diastolic" unit=" mmHg" tick={{ fontSize: 11 }} stroke="rgba(0,0,0,0.5)" domain={["dataMin - 5", "dataMax + 5"]} />
                    <ZAxis type="number" dataKey="z" range={[80, 400]} name="HR" />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      contentStyle={{ fontSize: 12, borderRadius: 8 }}
                      formatter={(value, name) => [value, name === "x" ? "Systolic" : name === "y" ? "Diastolic" : "Heart rate"]}
                    />
                    <Scatter name="Readings" data={scatterData} fill="#0f172a" fillOpacity={0.7} />
                  </ScatterChart>
                </ResponsiveContainer>
              ) : (
                <div className="chart-placeholder" style={{ minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ color: "#333", fontSize: "1rem" }}>Waiting for vitals…</p>
                </div>
              )}
            </div>
          </div>

          <div className="alerts-card" style={{ gridColumn: "1 / -1" }}>
            <h2 className="card-title">
              <AlertCircle size={20} /> Health Alerts
            </h2>
            <div className="alerts-list">
              {alerts.length === 0 ? (
                <div className="alert-item success">
                  <p className="alert-text">No recent alerts</p>
                  <p className="alert-time">Thresholds within range</p>
                </div>
              ) : (
                alerts.slice(0, 5).map((a, i) => (
                  <div key={i} className={`alert-item ${a.severity === "critical" ? "info" : "success"}`}>
                    <p className="alert-text">{a.message || a.type}</p>
                    <p className="alert-time">{a.timestamp ? new Date(a.timestamp).toLocaleString() : ""}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="readings-card">
          <h2 className="card-title">Recent Readings</h2>
          <div className="table-wrapper">
            <table className="readings-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Pressure</th>
                  <th>Heart Rate</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentReadings.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: "1.5rem", color: "rgba(0,0,0,0.6)" }}>
                      No readings yet. Start the backend to stream vitals.
                    </td>
                  </tr>
                ) : (
                  recentReadings.map((reading, index) => (
                    <tr key={index}>
                      <td>{reading.date}</td>
                      <td>{reading.time}</td>
                      <td>{reading.bp} mmHg</td>
                      <td>{reading.hr} bpm</td>
                      <td>
                        <span className={`status-badge ${reading.status === "Normal" ? "normal" : "elevated"}`}>
                          {reading.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
