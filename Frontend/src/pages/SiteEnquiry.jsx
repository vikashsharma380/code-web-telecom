import React, { useState } from "react";

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  header: {
    background: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  headerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  logo: {
    width: "50px",
    height: "50px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  brandInfo: {
    display: "flex",
    flexDirection: "column",
  },
  brandTitle: {
    margin: 0,
    fontSize: "1.25rem",
    color: "#2d3748",
    fontWeight: "600",
  },
  brandSubtitle: {
    margin: 0,
    fontSize: "0.875rem",
    color: "#718096",
  },
  heroSection: {
    padding: "3rem 2rem",
  },
  heroContent: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  greetingSection: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    padding: "2rem",
    color: "white",
  },
  greeting: {
    margin: "0 0 0.5rem 0",
    fontSize: "2rem",
    fontWeight: "600",
  },
  subtitle: {
    margin: 0,
    fontSize: "1rem",
    opacity: "0.9",
  },
  dataSection: {
    maxWidth: "1400px",
    margin: "0 auto 2rem auto",
    padding: "0 2rem",
  },
  sectionHeader: {
    background: "white",
    borderRadius: "12px 12px 0 0",
    padding: "1.5rem",
    borderBottom: "2px solid #e2e8f0",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1.25rem",
    color: "#2d3748",
    fontWeight: "600",
  },
  tableContainer: {
    background: "white",
    overflowX: "auto",
    borderRadius: "0 0 12px 12px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  thead: {
    background: "#f7fafc",
  },
  th: {
    padding: "1rem",
    textAlign: "left",
    fontSize: "0.875rem",
    color: "#4a5568",
    fontWeight: "600",
    borderBottom: "2px solid #e2e8f0",
  },
  tr: {
    borderBottom: "1px solid #e2e8f0",
    transition: "all 0.2s ease",
  },
  td: {
    padding: "1rem",
    fontSize: "0.875rem",
    color: "#2d3748",
  },
  footer: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    padding: "2rem",
    textAlign: "center",
    marginTop: "2rem",
  },
  footerText: {
    margin: 0,
    color: "white",
    fontSize: "0.875rem",
  },
  footerStrong: {
    fontWeight: "700",
  },
};

export default function SiteEnquiry() {
  const [enquiries] = useState([
    {
      srNo: 1,
      name: "Joeann Maiden",
      email: "register@indexwebsearch.pro",
      contactNumber: "887407008",
      message:
        "Hello, Your codewebtelecom.com is not indexed in Google Search Index - Search Results. Submit codewebtelecom.com to https://searchregister.org",
    },
    {
      srNo: 2,
      name: "1win_qvMn",
      email: "twewbwzmnivn@igurant1.online",
      contactNumber: "86787336797",
      message:
        "This means players can adjust their bets dynamically, maximizing their chances of winning in 1win ??????? 2025",
    },
    {
      srNo: 3,
      name: "Mike Guilherme Bertrand",
      email: "mike@monkeydigital.co",
      contactNumber: "82327524383",
      message:
        "Hello, This is Mike from Monkey Digital. We are getting in touch to discuss a mutual opportunity - we would like to show our banners on your website and connect via your personalized traffic stream to high-demand products from our advertisers. You would receive a recurring 35% commission per month from any transactions that are made on your website. Think about it, even if this is a huge opportunity. We already work with affiliates and our",
    },
    {
      srNo: 4,
      name: "minecraft_rnKr",
      email: "rwgknxzkxKr@ingushetdomaz.pro",
      contactNumber: "84911277457",
      message:
        "Such updates guarantee that players always have new elements to discover, maintaining the game's excitement. minecraft 1.21",
    },
  ]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoSection}>
            <div style={styles.logo}>SE</div>
            <div style={styles.brandInfo}>
              <h1 style={styles.brandTitle}>Site Enquiry</h1>
              <p style={styles.brandSubtitle}>Contact Form Management</p>
            </div>
          </div>
        </div>
      </header>

      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.greetingSection}>
            <h2 style={styles.greeting}>Contact Form Submissions</h2>
            <p style={styles.subtitle}>
              Manage and review all enquiries submitted from your website
            </p>
          </div>
        </div>
      </section>

      <div style={styles.dataSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>
            List of Contact Form Submitted from Website
          </h3>
        </div>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Sr No</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Contact Number</th>
                <th style={styles.th}>Message</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr
                  key={enquiry.srNo}
                  style={styles.tr}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f7fafc")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "white")
                  }
                >
                  <td style={styles.td}>{enquiry.srNo}</td>
                  <td style={styles.td}>{enquiry.name}</td>
                  <td style={styles.td}>{enquiry.email}</td>
                  <td style={styles.td}>{enquiry.contactNumber}</td>
                  <td style={styles.td}>{enquiry.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          <span style={styles.footerStrong}>Site Enquiry</span> - Powered by
          Your Company © 2025
        </p>
      </footer>
    </div>
  );
}
