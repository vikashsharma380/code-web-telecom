import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ServicePage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    number: "",
    amount: "",
    operatorcode: "",
    circlecode: "",
  });
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState(null);

  const username = "8517007867"; // Replace with your API username
  const pwd = "0936Ec211013@"; // Replace with your API password

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Auto detect operator
  useEffect(() => {
    const detectOperator = async () => {
      if (formData.number.length === 10) {
        setDetecting(true);
        try {
          const res = await fetch(
            `http://localhost:5000/api/lookup?number=${formData.number}`
          );
          const data = await res.json();

          if (data.operatorcode && data.circlecode) {
            setFormData((prev) => ({
              ...prev,
              operatorcode: data.operatorcode,
              circlecode: data.circlecode,
            }));
          } else {
            setFormData((prev) => ({
              ...prev,
              operatorcode: "",
              circlecode: "",
            }));
          }
        } catch (error) {
          console.error("Detection failed:", error);
          setFormData((prev) => ({
            ...prev,
            operatorcode: "",
            circlecode: "",
          }));
        } finally {
          setDetecting(false);
        }
      }
    };

    detectOperator();
  }, [formData.number]);

  // Recharge handler
  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const { number, amount, operatorcode, circlecode } = formData;
    const orderid = "ORD" + Date.now();
    const format = "json";

    const url = `http://localhost:5000/api/recharge?username=${username}&pwd=${pwd}&operatorcode=${operatorcode}&circlecode=${circlecode}&number=${number}&amount=${amount}&orderid=${orderid}&format=json`;

    try {
        const response = await fetch(url);
const result = await response.json();
     
      setResult(data);
    } catch (error) {
      console.error("Recharge failed:", error);
      setResult({ error: "Failed to connect to API" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>
        {id.toUpperCase()} Recharge
      </h2>

      <form
        onSubmit={handleRecharge}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "400px",
          margin: "0 auto",
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          name="number"
          placeholder="Mobile / DTH Number"
          value={formData.number}
          onChange={handleChange}
          maxLength="10"
          required
        />
        {detecting && <small style={{ color: "orange" }}>Detecting operator...</small>}

        <input
          type="text"
          name="operatorcode"
          placeholder="Operator Code"
          value={formData.operatorcode}
          readOnly
        />
        <input
          type="text"
          name="circlecode"
          placeholder="Circle Code"
          value={formData.circlecode}
          readOnly
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#4f46e5",
            color: "#fff",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Processing..." : "Recharge Now"}
        </button>
      </form>

      {result && (
        <div
          style={{
            marginTop: "24px",
            background: "#f9f9f9",
            padding: "16px",
            borderRadius: "8px",
            textAlign: "left",
            maxWidth: "400px",
            marginInline: "auto",
          }}
        >
          {result.error ? (
            <p style={{ color: "red" }}>Error: {result.error}</p>
          ) : (
            <p style={{ color: "green" }}>Recharge processed successfully!</p>
          )}
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
