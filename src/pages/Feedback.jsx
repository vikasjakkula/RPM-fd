import { MessageCircle } from "lucide-react";

function Feedback() {
  return (
    <div className="feedback-page">
      <div className="container">
        <div className="feedback-content">
          <h1 className="feedback-title">Feedback</h1>
          <p className="feedback-description">
            Share your thoughts after experiencing the Cardio360 workflow.
          </p>
          <div className="feedback-placeholder">
            <div className="placeholder-icon">
              <MessageCircle size={64} />
            </div>
            <p>Feedback form coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
