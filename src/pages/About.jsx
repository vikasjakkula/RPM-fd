import { Goal, UsersRound, Cpu, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Goal,
      title: "Our Mission",
      description:
        "To provide accessible, accurate heart disease prediction tools that empower individuals to take control of their cardiovascular health.",
    },
    {
      icon: UsersRound,
      title: "Our Team",
      description:
        "A dedicated group of healthcare professionals, data scientists, and engineers working together to improve heart health outcomes.",
    },
    {
      icon: Cpu,
      title: "Our Technology",
      description:
        "State-of-the-art machine learning algorithms trained on extensive medical datasets to deliver reliable predictions.",
    },
    {
      icon: Heart,
      title: "Our Commitment",
      description:
        "Committed to patient privacy, data security, and providing the highest quality health information and tools.",
    },
  ];

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1 className="about-title">
            About <span className="text-primary">Cardio360</span>
          </h1>
          <p className="about-description">
            We're on a mission to make heart disease prediction and prevention
            accessible to everyone, combining advanced AI technology with
            medical expertise.
          </p>
        </div>

        <div className="story-card">
          <h2 className="story-title">Our Story</h2>
          <div className="story-content">
            <p>
              Cardio360 was founded in 2023 with a simple yet powerful vision:
              to leverage technology to save lives by detecting heart disease
              risk early. Cardiovascular disease remains the leading cause of
              death globally, yet many cases could be prevented with early
              detection and intervention.
            </p>
            <p>
              Our platform uses advanced machine learning algorithms trained on
              thousands of patient records, validated by medical professionals,
              and designed to be accessible to everyone. We believe that everyone
              deserves access to quality healthcare insights, regardless of their
              location or circumstances.
            </p>
            <p>
              Today, we're proud to serve thousands of users worldwide, helping
              them understand and monitor their cardiovascular health with
              confidence.
            </p>
          </div>
        </div>

        <div className="values-grid">
          {values.map((value, index) => (
            <div
              key={index}
              className="value-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="value-icon">
                <value.icon className="icon-svg" size={32} />
              </div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="stats-card">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">95%</div>
              <p className="stat-label">Prediction Accuracy</p>
            </div>
            <div className="stat-item">
              <div className="stat-value">10,000+</div>
              <p className="stat-label">Active Users</p>
            </div>
            <div className="stat-item">
              <div className="stat-value">50+</div>
              <p className="stat-label">Healthcare Partners</p>
            </div>
          </div>
        </div>

        <div className="disclaimer">
          <p>
            <strong>Medical Disclaimer:</strong> Cardio360 is designed for
            educational and informational purposes. It is not a substitute for
            professional medical advice, diagnosis, or treatment. Always seek
            the advice of qualified health providers with questions about
            medical conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
