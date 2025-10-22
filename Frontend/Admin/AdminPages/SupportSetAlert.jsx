import React, { useState } from "react";
import { Bell, Send, Info } from "lucide-react";

export default function SupportSetAlert() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (!message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setMessage("");

      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <Bell size={40} style={styles.headerIcon} />
          <div>
            <h1 style={styles.title}>Set Alert / News</h1>
            <p style={styles.subtitle}>
              Broadcast important messages and alerts to users
            </p>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>
              <Bell size={24} style={styles.cardTitleIcon} />
              Create New Alert
            </div>
            <p style={styles.cardDescription}>
              Compose your alert message that will be sent to all users
            </p>
          </div>

          <div style={styles.formContent}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Alert Message
                <span style={styles.required}>*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="For Any Help and Support Contact us 08069578467"
                style={styles.textarea}
                rows={6}
              />
              <div style={styles.charCount}>{message.length} characters</div>
            </div>

            <div style={styles.infoBox}>
              <Info size={18} style={styles.infoIcon} />
              <div style={styles.infoText}>
                <strong>Note:</strong> This message will be visible to all
                active users across the platform.
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button
                type="button"
                style={styles.clearButton}
                onClick={() => setMessage("")}
              >
                Clear
              </button>
              <button
                type="button"
                style={{
                  ...styles.submitButton,
                  ...(isSubmitting || !message.trim()
                    ? styles.submitButtonDisabled
                    : {}),
                }}
                onClick={handleSubmit}
                disabled={isSubmitting || !message.trim()}
              >
                {isSubmitting ? (
                  <>
                    <div style={styles.spinner}></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Alert
                  </>
                )}
              </button>
            </div>
          </div>

          {showSuccess && (
            <div style={styles.successMessage}>
              <div style={styles.successIcon}>✓</div>
              Alert sent successfully!
            </div>
          )}
        </div>

        <div style={styles.sideCard}>
          <div style={styles.sideCardHeader}>
            <Info size={20} />
            Quick Tips
          </div>
          <ul style={styles.tipsList}>
            <li style={styles.tipItem}>
              <span style={styles.arrow}>→</span>
              Keep messages clear and concise
            </li>
            <li style={styles.tipItem}>
              <span style={styles.arrow}>→</span>
              Include contact information when needed
            </li>
            <li style={styles.tipItem}>
              <span style={styles.arrow}>→</span>
              Use professional language
            </li>
            <li style={styles.tipItem}>
              <span style={styles.arrow}>→</span>
              Double-check before sending
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
  },
  header: {
    maxWidth: "1200px",
    margin: "0 auto 40px",
    color: "white",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  headerIcon: {
    flexShrink: 0,
  },
  title: {
    fontSize: "42px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  subtitle: {
    fontSize: "18px",
    margin: 0,
    opacity: "0.95",
    fontWeight: "400",
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "30px",
    alignItems: "start",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    overflow: "hidden",
    position: "relative",
  },
  cardHeader: {
    padding: "30px",
    background: "linear-gradient(to right, #f8f9fa, #ffffff)",
    borderBottom: "1px solid #e9ecef",
  },
  cardTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#212529",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  cardTitleIcon: {
    color: "#667eea",
  },
  cardDescription: {
    margin: 0,
    color: "#6c757d",
    fontSize: "15px",
  },
  formContent: {
    padding: "30px",
  },
  formGroup: {
    marginBottom: "24px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#495057",
    marginBottom: "10px",
  },
  required: {
    color: "#dc3545",
    marginLeft: "4px",
  },
  textarea: {
    width: "100%",
    padding: "16px",
    border: "2px solid #e9ecef",
    borderRadius: "12px",
    fontSize: "15px",
    fontFamily: "inherit",
    resize: "vertical",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },
  charCount: {
    marginTop: "8px",
    fontSize: "13px",
    color: "#6c757d",
    textAlign: "right",
  },
  infoBox: {
    display: "flex",
    gap: "12px",
    padding: "16px",
    background: "#e7f3ff",
    border: "1px solid #b3d9ff",
    borderRadius: "8px",
    marginBottom: "24px",
  },
  infoIcon: {
    color: "#0066cc",
    flexShrink: 0,
  },
  infoText: {
    fontSize: "14px",
    color: "#004085",
    lineHeight: "1.5",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  },
  clearButton: {
    padding: "12px 28px",
    background: "white",
    color: "#495057",
    border: "2px solid #e9ecef",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
  },
  submitButton: {
    padding: "12px 32px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
    fontFamily: "inherit",
  },
  submitButtonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  successMessage: {
    position: "absolute",
    bottom: "30px",
    left: "30px",
    right: "30px",
    padding: "16px 20px",
    background: "#d4edda",
    color: "#155724",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "15px",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    animation: "slideUp 0.3s ease-out",
  },
  successIcon: {
    width: "24px",
    height: "24px",
    background: "#155724",
    color: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "16px",
  },
  sideCard: {
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    overflow: "hidden",
  },
  sideCardHeader: {
    padding: "20px",
    background: "linear-gradient(to right, #f8f9fa, #ffffff)",
    borderBottom: "1px solid #e9ecef",
    fontSize: "18px",
    fontWeight: "700",
    color: "#212529",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  tipsList: {
    padding: "20px",
    margin: 0,
    listStyle: "none",
  },
  tipItem: {
    padding: "12px 0",
    paddingLeft: "8px",
    fontSize: "14px",
    color: "#495057",
    borderBottom: "1px solid #f1f3f5",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  arrow: {
    color: "#667eea",
    fontWeight: "bold",
    fontSize: "16px",
  },
};
