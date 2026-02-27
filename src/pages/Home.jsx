import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";

const Home = () => {
  const heroSectionStyle = {
    width: "100vw",
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    overflow: "hidden",
    boxSizing: "border-box",
    padding: 0,
    margin: 0,
  };

  const heroInnerStyle = {
    maxWidth: "1400px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "3.5rem",
    padding: "0 2rem",
    boxSizing: "border-box",
    flexWrap: "wrap",
  };

  const leftColStyle = {
    flex: "1 1 420px",
    minWidth: "340px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    maxWidth: "540px",
  };

  const heroTitleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    lineHeight: 1.18,
    color: "#161616",
    textAlign: "left",
  };

  const textGradient = {
    background: "linear-gradient(90deg,#ff445a 0%,#f6a700 85%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: "bold",
  };

  const heroDescStyle = {
    fontSize: "1.05rem",
    maxWidth: "385px",
    marginBottom: "2.2rem",
    color: "#494949",
    lineHeight: 1.6,
    textAlign: "left",
  };

  const heroBtnGroupStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "18px",
    marginTop: "0.3rem",
  };

  const btnPrimary = {
    padding: "0.78em 2.1em",
    fontSize: "1.06rem",
    background: "#161616",
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    fontWeight: 600,
    letterSpacing: ".03em",
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "0 2px 8px rgba(48, 24, 38, 0.04)",
    transition: "background 0.21s",
  };

  const btnOutline = {
    padding: "0.78em 2.1em",
    fontSize: "1.06rem",
    background: "transparent",
    color: "#161616",
    border: "1.7px solid #161616",
    borderRadius: "7px",
    fontWeight: 600,
    letterSpacing: ".03em",
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "none",
    transition: "background 0.21s, color 0.21s",
  };

  const rightColStyle = {
    flex: "1 1 340px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "340px",
    minHeight: "390px",
    width: "min(490px, 85vw)",
    height: "min(440px, 70vw)",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "25px",
    boxShadow: "0 6px 28px rgba(80,32,48,0.10)",
  };

  const topicStyle = {
    fontSize: "2.1rem",
    fontWeight: 600,
    margin: "2.2rem 0 1.2rem 0",
    textAlign: "center",
  };
  const textStyle = {
    fontSize: "1.18rem",
    marginBottom: "1.1rem",
    textAlign: "left",
  };

  return (
    <div className="home-page">
      <section className="hero-section" style={heroSectionStyle}>
        <div style={heroInnerStyle}>
          <div className="hero-content" style={leftColStyle}>
            <h1 className="hero-title" style={heroTitleStyle}>
              Your Heart Health,<br />
              <span className="text-gradient" style={textGradient}>
                Our Priority
              </span>
            </h1>
            <p className="hero-description" style={heroDescStyle}>
              Advanced heart disease prediction and monitoring system powered by
              AI. Take control of your cardiovascular health with data-driven
              insights.
            </p>
            <div className="hero-buttons" style={heroBtnGroupStyle}>
              <Link to="/predict" style={btnPrimary}>
                Start Prediction
              </Link>
              <Link to="/dashboard" style={btnOutline}>
                View Dashboard
              </Link>
            </div>
          </div>
          <div className="hero-image" style={rightColStyle}>
            <img
              src="/image.png"
              alt="Heart Health"
              style={imageStyle}
              loading="eager"
              draggable={false}
            />
          </div>
        </div>
      </section>
      <section className="landing-brief">
        <div className="container">
          <ScrollReveal>
            <div style={topicStyle}>Why Use Our ML Heart Risk System?</div>
          </ScrollReveal>
          <ScrollReveal stagger>
            <div style={textStyle}>
              <b>Continuous Prediction:</b> Your heart risk changes every
              day—not just once at the doctor. Our system gives ongoing
              predictions as your data updates, offering real-time insights.
            </div>
            <div style={textStyle}>
              <b>Early Screening Before Symptoms:</b> Most people visit hospitals
              only after problems occur. Our solution screens you early, alerting
              you to risks years before major tests are needed.
            </div>
            <div style={textStyle}>
              <b>Cost-Effective:</b> Medical tests can be expensive and
              repetitive. Our AI tells you when tests are actually necessary,
              helping you avoid unnecessary spending.
            </div>
            <div style={textStyle}>
              <b>Works with Partial Data:</b> Even if you don't have complete
              medical information (like cholesterol or ECG), our model predicts
              risk with the data you provide.
            </div>
            <div style={textStyle}>
              <b>Ideal for Rural & Remote Areas:</b> No cardiologist nearby? Our
              tool acts as a rapid pre-diagnosis system, bringing expert-level
              screening everywhere.
            </div>
            <div style={textStyle}>
              <b>Doctor Support & Patient Prioritization:</b> Hospitals can
              instantly identify and prioritize high-risk patients, speeding up
              care before lab results arrive.
            </div>
            <div style={textStyle}>
              <b>Long-Term Health Tracking:</b> Track trends in blood pressure,
              sleep, stress, and smoking. Our app visualizes your health patterns
              over time—something a single clinic visit can't do.
            </div>
            <div style={textStyle}>
              <b>Preventive Healthcare Focus:</b> We enable you to Predict →
              Prevent → Protect—catching problems before symptoms start.
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div style={topicStyle}>How Our ML System Works</div>
          </ScrollReveal>
          <ScrollReveal stagger>
            <div style={textStyle}>
              <b>Multi-Model Hybrid:</b> Combines Logistic Regression and Random
              Forest for highly accurate results.
            </div>
            <div style={textStyle}>
              <b>Smart Missing Data Handling:</b> Uses imputation and feature
              weighting—rare among typical hackathon projects.
            </div>
            <div style={textStyle}>
              <b>Personalized Risk Scoring:</b> Adapts to diabetes, obesity,
              gender, age, and your lifestyle factors.
            </div>
            <div style={textStyle}>
              <b>Explainable Results:</b> Dashboard shows key risk factors,
              feature importance, and condition severity, so you know <em>why</em>{" "}
              the model predicts a certain risk.
            </div>
            <div style={textStyle}>
              <b>Trend-Based Analysis:</b> Monitors your health data over time,
              revealing patterns like rising blood pressure or increased stress
              for deeper insights.
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div style={topicStyle}>Our Data Approach</div>
          </ScrollReveal>
          <ScrollReveal stagger>
            <div style={textStyle}>
              <b>Primary Database: MongoDB</b> — Flexible for messy, varied health
              records; perfectly fits our user health history storage; grows
              easily to support thousands of patients.
            </div>
            <div style={textStyle}>
              <b>What We Store:</b> User profile, medical details (BP,
              cholesterol, diabetes, obesity), lifestyle factors (sleep, stress,
              smoking), risk scores, and timestamps.
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div
              className="final-judge-statement"
              style={{
                marginTop: "2rem",
                background: "rgba(0,0,0,0.04)",
                borderRadius: 8,
                padding: "1.5rem",
              }}
            >
              <strong>Hackathon-Ready Summary:</strong>
              <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
                "Our project is not a replacement for doctors; it is an
                early-warning system. We help users know when they actually need
                medical tests. We predict risk even with missing data, track
                long-term health patterns, and support doctors with fast
                prioritisation. Hospitals can use this for pre-screening thousands
                of patients. That's the real complexity."
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
