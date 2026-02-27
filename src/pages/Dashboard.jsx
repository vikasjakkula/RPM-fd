import { BarChart, TrendingUp, AlertCircle } from "lucide-react";
import { useMemo } from "react";

const Dashboard = () => {
  const metrics = [
    {
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "normal",
      change: "+2%",
    },
    {
      title: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "normal",
      change: "-3%",
    },
    {
      title: "Cholesterol",
      value: "185",
      unit: "mg/dL",
      status: "normal",
      change: "+5%",
    },
    {
      title: "Blood Sugar",
      value: "95",
      unit: "mg/dL",
      status: "normal",
      change: "0%",
    },
  ];

  const recentReadings = [
    {
      date: "2025-11-20",
      time: "08:30 AM",
      bp: "118/78",
      hr: "70",
      status: "Normal",
    },
    {
      date: "2025-11-19",
      time: "09:15 AM",
      bp: "122/82",
      hr: "74",
      status: "Normal",
    },
    {
      date: "2025-11-18",
      time: "07:45 AM",
      bp: "120/80",
      hr: "72",
      status: "Normal",
    },
    {
      date: "2025-11-17",
      time: "08:00 AM",
      bp: "125/85",
      hr: "75",
      status: "Elevated",
    },
  ];

  const heartRateData = useMemo(() => {
    return recentReadings
      .slice()
      .reverse()
      .map((r, idx) => ({
        date: r.date.slice(5),
        heartRate: parseInt(r.hr, 10),
      }));
  }, []);

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Health Dashboard</h1>
          <p className="dashboard-subtitle">
            Monitor your heart health metrics in real-time
          </p>
        </div>

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
                    metric.change.startsWith("+")
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
            <h2
              className="card-title"
              style={{ display: "flex", alignItems: "center" }}
            >
              <TrendingUp size={20} style={{ marginRight: "0.5rem" }} /> Heart
              Rate Trend
            </h2>
            <div
              className="chart-placeholder"
              style={{
                background: "#e6e6e6",
                border: "1px dashed #ccc",
                borderRadius: "8px",
                padding: "0",
                marginTop: "1rem",
                minHeight: "180px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p style={{ color: "#333", fontSize: "1rem" }}>
                Chart visualization coming soon
              </p>
            </div>
          </div>

          <div className="alerts-card">
            <h2 className="card-title">
              <AlertCircle size={20} /> Health Alerts
            </h2>
            <div className="alerts-list">
              <div className="alert-item success">
                <p className="alert-text">All metrics normal</p>
                <p className="alert-time">Last checked: 2 hours ago</p>
              </div>
              <div className="alert-item info">
                <p className="alert-text">Check-up reminder</p>
                <p className="alert-time">Scheduled for tomorrow</p>
              </div>
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
                {recentReadings.map((reading, index) => (
                  <tr key={index}>
                    <td>{reading.date}</td>
                    <td>{reading.time}</td>
                    <td>{reading.bp} mmHg</td>
                    <td>{reading.hr} bpm</td>
                    <td>
                      <span
                        className={`status-badge ${
                          reading.status === "Normal" ? "normal" : "elevated"
                        }`}
                      >
                        {reading.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
