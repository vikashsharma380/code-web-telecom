import React, { useState } from "react";
import Header from "../../Admin/Header";

export default function UpdateNews() {
  const [newsContent, setNewsContent] = useState("");

  const handleSubmit = () => {
    console.log("News submitted:", newsContent);
  };

  const handleClear = () => {
    setNewsContent("");
  };

  return (
    <>
      {" "}
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.iconWrapper}>
              <span style={styles.icon}>📰</span>
            </div>
            <div>
              <h1 style={styles.title}>Set Alert/News</h1>
              <p style={styles.subtitle}>
                Create and manage alerts and news updates for users
              </p>
            </div>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>News Editor</h3>
              <span style={styles.badge}>Broadcast Message</span>
            </div>

            <div style={styles.formContent}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>✍️</span>
                  News/Alert Content
                </label>
                <textarea
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  placeholder="For Any Help and Support Contact us 08069578467."
                  style={styles.textarea}
                  rows={6}
                />
                <div style={styles.helperText}>
                  Enter your news or alert message. This will be visible to all
                  users.
                </div>
              </div>

              <div style={styles.infoBox}>
                <span style={styles.infoIcon}>💡</span>
                <div>
                  <div style={styles.infoTitle}>Quick Tips</div>
                  <div style={styles.infoText}>
                    Keep messages clear and concise. Include contact information
                    for support queries. Preview your message before submitting.
                  </div>
                </div>
              </div>

              <div style={styles.buttonGroup}>
                <button onClick={handleSubmit} style={styles.primaryButton}>
                  <span style={styles.buttonIcon}>📤</span>
                  Submit
                </button>
                <button onClick={handleClear} style={styles.secondaryButton}>
                  <span style={styles.buttonIcon}>🔄</span>
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div style={styles.previewCard}>
            <div style={styles.previewHeader}>
              <h3 style={styles.previewTitle}>Preview</h3>
            </div>
            <div style={styles.previewContent}>
              {newsContent ? (
                <div style={styles.previewMessage}>
                  <span style={styles.previewIcon}>📢</span>
                  <div style={styles.previewText}>{newsContent}</div>
                </div>
              ) : (
                <div style={styles.emptyPreview}>
                  <div style={styles.emptyIcon}>📝</div>
                  <div style={styles.emptyText}>
                    Your message preview will appear here
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    padding: "32px 40px",
  },
  headerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  iconWrapper: {
    width: "70px",
    height: "70px",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(79, 172, 254, 0.4)",
  },
  icon: {
    fontSize: "36px",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "32px",
    fontWeight: "800",
    color: "#1f2937",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    margin: 0,
    fontSize: "16px",
    color: "#6b7280",
    fontWeight: "500",
  },
  content: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "40px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  card: {
    background: "white",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
    paddingBottom: "20px",
    borderBottom: "2px solid #f3f4f6",
  },
  cardTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#1f2937",
  },
  badge: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    color: "white",
    padding: "8px 18px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "700",
  },
  formContent: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#374151",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    letterSpacing: "0.3px",
  },
  labelIcon: {
    fontSize: "16px",
  },
  textarea: {
    padding: "16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    outline: "none",
    fontWeight: "500",
    color: "#1f2937",
    fontFamily: "inherit",
    resize: "vertical",
    minHeight: "120px",
  },
  helperText: {
    fontSize: "13px",
    color: "#6b7280",
    fontStyle: "italic",
  },
  infoBox: {
    background: "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    border: "2px solid #bae6fd",
  },
  infoIcon: {
    fontSize: "24px",
  },
  infoTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#0369a1",
    marginBottom: "4px",
  },
  infoText: {
    fontSize: "14px",
    color: "#0c4a6e",
    lineHeight: "1.6",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
  },
  primaryButton: {
    flex: 1,
    padding: "14px 28px",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 8px 24px rgba(79, 172, 254, 0.4)",
    transition: "all 0.3s ease",
  },
  secondaryButton: {
    flex: 1,
    padding: "14px 24px",
    background: "white",
    color: "#6b7280",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },
  buttonIcon: {
    fontSize: "16px",
  },
  previewCard: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    height: "fit-content",
  },
  previewHeader: {
    padding: "24px 32px",
    borderBottom: "2px solid #f3f4f6",
    background: "#f9fafb",
  },
  previewTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#1f2937",
  },
  previewContent: {
    padding: "32px",
    minHeight: "300px",
  },
  previewMessage: {
    background: "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    gap: "16px",
    border: "2px solid #bae6fd",
  },
  previewIcon: {
    fontSize: "24px",
  },
  previewText: {
    fontSize: "15px",
    color: "#0c4a6e",
    lineHeight: "1.7",
    flex: 1,
  },
  emptyPreview: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "250px",
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "16px",
    opacity: 0.5,
  },
  emptyText: {
    fontSize: "16px",
    color: "#9ca3af",
    fontStyle: "italic",
  },
};
