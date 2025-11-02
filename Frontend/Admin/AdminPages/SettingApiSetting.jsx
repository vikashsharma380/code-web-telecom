import React, { useState } from "react";
import Header from "../Header";

export default function SettingApiSetting() {
  const [selectedProvider, setSelectedProvider] = useState("A1Topup");
  const [userName, setUserName] = useState("9266982764");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);

  const apiList = [
    {
      provider: "A1Topup",
      userId: "500150",
      token: "0913a298280fc612d983d6e9674c3e5121233",
      balance: "--",
    },
    {
      provider: "A1TOPUP-UTILITY",
      userId: "500150",
      token: "0913a298280fc612d983d6e9674c3e5121233",
      balance: "--",
    },
  ];

  const handleEdit = (provider) => setSelectedProvider(provider);
  const handleUpdate = () =>
    alert(`✅ Updated settings for ${selectedProvider}`);

  return (
    <>
      {" "}
      <Header />
      <div style={styles.page}>
        <h1 style={styles.pageTitle}>API Settings</h1>

        {/* List of API Section */}
        <div style={styles.card}>
          <div style={styles.header}>List of API</div>
          <div style={styles.body}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>API Provider</th>
                  <th>User ID</th>
                  <th>Token</th>
                  <th>Balance</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {apiList.map((api, i) => (
                  <tr key={i}>
                    <td>{api.provider}</td>
                    <td>{api.userId}</td>
                    <td style={styles.truncate}>{api.token}</td>
                    <td>{api.balance}</td>
                    <td>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleEdit(api.provider)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* API Configuration Section */}
        <div style={styles.card}>
          <div style={styles.header}>API Configuration</div>
          <div style={styles.body}>
            <div style={styles.formGroup}>
              <label>API Provider</label>
              <input
                type="text"
                value={selectedProvider}
                disabled
                style={styles.inputDisabled}
              />
            </div>

            <div style={styles.formGroup}>
              <label>User Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Password</label>
              <div style={styles.passwordBox}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.inputPassword}
                />
                <button
                  type="button"
                  style={styles.showBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div style={styles.btnContainer}>
              <button onClick={handleUpdate} style={styles.updateBtn}>
                Update Settings
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

/* ---------- Inline CSS Styles ---------- */
const styles = {
  page: {
    background: "#f3f4f6",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#1e3a8a",
    marginBottom: "25px",
  },
  card: {
    width: "100%",
    maxWidth: "900px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    overflow: "hidden",
    marginBottom: "30px",
  },
  header: {
    background: "#2563eb",
    color: "#fff",
    padding: "14px 20px",
    fontSize: "17px",
    fontWeight: "600",
  },
  body: {
    padding: "25px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  truncate: {
    maxWidth: "200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "18px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.2s",
  },
  inputDisabled: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#f3f4f6",
    color: "#555",
    fontSize: "14px",
  },
  inputPassword: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px 0 0 6px",
    border: "1px solid #ccc",
    borderRight: "none",
    fontSize: "14px",
    outline: "none",
  },
  passwordBox: {
    display: "flex",
    alignItems: "center",
  },
  showBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "0 6px 6px 0",
    cursor: "pointer",
    fontSize: "13px",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  editBtn: {
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "6px 12px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  updateBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    fontWeight: "500",
    cursor: "pointer",
    fontSize: "15px",
  },
};

/* Responsive adjustments */
styles["@media (max-width: 600px)"] = {
  page: { padding: "20px 10px" },
  card: { width: "100%", maxWidth: "100%" },
};
