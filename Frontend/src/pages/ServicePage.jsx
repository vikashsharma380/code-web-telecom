import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ServicePage() {
  const { id } = useParams(); // service id from card click (e.g., "airtel", "jio")
  const [formData, setFormData] = useState({
    number: "",
    amount: "",
    operatorcode: "",
    circlecode: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Optional mapping: if card id corresponds to operatorcode, prefill it
  const serviceMap = {
    airtel: { operatorcode: "AT", circlecode: "" },
    jio: { operatorcode: "RJ", circlecode: "" },
    vi: { operatorcode: "VI", circlecode: "" },
    bsnl: { operatorcode: "BS", circlecode: "" },
    dth: { operatorcode: "DTH", circlecode: "" },
  };

  // Prefill operator if we have mapping for clicked card
  useEffect(() => {
    if (id && serviceMap[id]) {
      setFormData((p) => ({
        ...p,
        operatorcode: serviceMap[id].operatorcode,
        circlecode: serviceMap[id].circlecode || p.circlecode,
      }));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setResult(null);
  };

  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const { number, amount, operatorcode, circlecode } = formData;
    const orderid = "ORD" + Date.now();

    try {
      const res = await fetch("http://localhost:5000/api/recharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number,
          amount,
          operatorcode,
          circlecode,
          orderid,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Server error");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Recharge failed:", err);
      setResult({ error: err.message || "Failed to connect to API" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>
        {id ? id.toUpperCase() + " Recharge" : "Recharge"}
      </h2>

      <form
        onSubmit={handleRecharge}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "420px",
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

        <input
          type="text"
          name="operatorcode"
          placeholder="Operator Code (e.g., AT, RJ)"
          value={formData.operatorcode}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="circlecode"
          placeholder="Circle Code (e.g., MP, DL)"
          value={formData.circlecode}
          onChange={handleChange}
          required
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
            maxWidth: "420px",
            marginInline: "auto",
          }}
        >
          {result.error ? (
            <p style={{ color: "red" }}>Error: {result.error}</p>
          ) : (
            <p style={{ color: "green" }}>Response from provider:</p>
          )}
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
