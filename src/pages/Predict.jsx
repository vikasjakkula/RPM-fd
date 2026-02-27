import React, { useState } from "react";
import { Stethoscope } from "lucide-react";

function Predict() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    sex: "",
    cholesterol: "",
    bp: "",
    fbs: false,
    thalachh: "",
    diabetes: false,
    obesity: false,
    shortness_of_breath: false,
    chest_pain: false,
    sweating: false,
    stress: false,
    poor_sleep: false,
    smoking: false,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Server Error!");
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to fetch prediction.");
    }
    setLoading(false);
  };

  return (
    <div className="predict-page">
      <div className="container">
        <div className="predict-content">
          <h1
            className="predict-title"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <Stethoscope size={32} />
            Heart Attack Risk Factors
          </h1>
          <form className="predict-form" onSubmit={handleSubmit}>
            <fieldset className="form-section">
              <legend>Report Information</legend>
              <div className="form-group">
                <label>
                  Name
                  <input
                    type="text"
                    name="name"
                    value={form.name || ""}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Age
                  <input
                    type="number"
                    name="age"
                    value={form.age || ""}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Sex
                  <select
                    name="sex"
                    value={form.sex || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </select>
                </label>
              </div>
            </fieldset>

            <fieldset className="form-section">
              <legend>Clinical Measurements</legend>
              <div className="form-group">
                <label>
                  Cholesterol (mg/dL)
                  <input
                    type="number"
                    name="cholesterol"
                    value={form.cholesterol}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Blood Pressure (mmHg)
                  <input
                    type="number"
                    name="bp"
                    value={form.bp}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Resting Blood Sugar &gt; 120mg/dl
                  <input
                    type="checkbox"
                    name="fbs"
                    checked={form.fbs || false}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Max Heart Rate Achieved
                  <input
                    type="number"
                    name="thalachh"
                    value={form.thalachh || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className="form-section">
              <legend>Symptoms & Risk Factors</legend>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="diabetes"
                    checked={form.diabetes}
                    onChange={handleChange}
                  />
                  Diabetes
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="obesity"
                    checked={form.obesity}
                    onChange={handleChange}
                  />
                  Obesity
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="shortness_of_breath"
                    checked={form.shortness_of_breath}
                    onChange={handleChange}
                  />
                  Shortness of breath
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="chest_pain"
                    checked={form.chest_pain}
                    onChange={handleChange}
                  />
                  Chest pain
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="sweating"
                    checked={form.sweating}
                    onChange={handleChange}
                  />
                  Sweating
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="stress"
                    checked={form.stress}
                    onChange={handleChange}
                  />
                  Stress
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="poor_sleep"
                    checked={form.poor_sleep}
                    onChange={handleChange}
                  />
                  Poor sleep
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="smoking"
                    checked={form.smoking}
                    onChange={handleChange}
                  />
                  Smoking
                </label>
              </div>
            </fieldset>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1.5rem",
              }}
            >
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span className="button-spinner"></span>
                    Calculating...
                  </span>
                ) : (
                  "Predict Heart Attack Risk"
                )}
              </button>
            </div>
          </form>

          <div className="predict-output">
            {loading && (
              <div className="loading-container">
                <div className="spinner"></div>
                <p className="loading-text">Analyzing your data...</p>
              </div>
            )}
            {result !== null && (
              <div className="result-card">
                <h2>Prediction Results</h2>
                {form.name && (
                  <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
                    <strong>{form.name}</strong>
                  </p>
                )}
                <div style={{ marginBottom: "1rem" }}>
                  <p>
                    <strong>Health Status:</strong>{" "}
                    <span
                      style={{
                        color:
                          result.health_status === "High Risk"
                            ? "#dc3545"
                            : "#28a745",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      {result.health_status}
                    </span>
                  </p>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <p>
                    <strong>Risk Percentage:</strong>{" "}
                    <span className="probability-score">
                      {result.risk_percentage?.toFixed(2) ||
                        (result.probability * 100).toFixed(2)}
                      %
                    </span>
                  </p>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <p>
                    <strong>Prediction:</strong>{" "}
                    {result.prediction === 1 ? (
                      <span
                        style={{
                          color: "#dc3545",
                          fontWeight: "bold",
                        }}
                      >
                        At Risk
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "#28a745",
                          fontWeight: "bold",
                        }}
                      >
                        Not At Risk
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Probability Score:</strong>{" "}
                    <span>
                      {(result.probability * 100).toFixed(2)}%
                    </span>
                  </p>
                </div>
              </div>
            )}
            {error && <p className="error">{error}</p>}
          </div>
          <div
            className="risk-report"
            style={{ marginTop: "2rem" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Predict;
