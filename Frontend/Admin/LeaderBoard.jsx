import React, { useMemo, useState, useEffect } from "react";
import Nav from "../hero/nav";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const LeaderBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [periodFilter, setPeriodFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "business",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const [rawData, setRawData] = useState([]); // REAL DATA FROM BACKEND
  const itemsPerPage = 7;

  // ⭐ FETCH REAL LEADERBOARD FROM BACKEND
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${API_URL}/api/get-leaderboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        console.log("LEADERBOARD DATA:", data);

        if (data.success) {
          setRawData(data.records); // store real data
        }
      } catch (error) {
        console.error("Leaderboard fetch error:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  // ⭐ SORT HANDLER
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "desc" };
    });
  };

  // ⭐ FILTER + SEARCH + SORT
  const processedData = useMemo(() => {
    let filtered = [...rawData];

    if (roleFilter !== "All")
      filtered = filtered.filter((item) => item.role === roleFilter);

    if (periodFilter !== "All")
      filtered = filtered.filter((item) => item.period === periodFilter);

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.phone.toLowerCase().includes(term)
      );
    }

    // SORT
    filtered.sort((a, b) => {
      const key = sortConfig.key;
      const dir = sortConfig.direction === "asc" ? 1 : -1;

      let A = a[key];
      let B = b[key];

      if (typeof A === "string") {
        A = A.toLowerCase();
        B = B.toLowerCase();
        if (A < B) return -1 * dir;
        if (A > B) return 1 * dir;
        return 0;
      }
      return (A - B) * dir;
    });

    return filtered.map((item, index) => ({ ...item, rank: index + 1 }));
  }, [rawData, roleFilter, periodFilter, searchTerm, sortConfig]);

  const topThree = processedData.slice(0, 3);
  const others = processedData.slice(3);

  const totalPages = Math.max(1, Math.ceil(others.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const paginatedOthers = others.slice(startIndex, startIndex + itemsPerPage);

  const totals = useMemo(() => {
    const base = processedData;
    const business = base.reduce((sum, item) => sum + item.business, 0);
    const commission = base.reduce((sum, item) => sum + item.commission, 0);
    const txns = base.reduce((sum, item) => sum + item.transactions, 0);
    return { business, commission, txns };
  }, [processedData]);

  return (
    <>
      <Nav />
      <div
        style={{
          minHeight: "100vh",
          background: "#7064D7",
          padding: "20px",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "flex-end",
            marginBottom: "20px",
          }}
        >
          <div style={{ flex: "1 1 220px" }}>
            <div style={{ fontSize: "26px", fontWeight: 700 }}>
              Fintech Leaderboard
            </div>
            <div style={{ fontSize: "13px", opacity: 0.85 }}>
              Real-time ranking based on recharge performance.
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <SummaryChip
              label="Total Business"
              value={`₹${totals.business.toLocaleString()}`}
            />
            <SummaryChip
              label="Total Commission"
              value={`₹${totals.commission.toLocaleString()}`}
            />
            <SummaryChip
              label="Total Transactions"
              value={totals.txns.toLocaleString()}
            />
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "18px" }}>
          <input
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              flex: "1 1 220px",
              minWidth: "200px",
              padding: "10px 12px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.4)",
              background: "rgba(10,10,30,0.25)",
              color: "#fff",
              outline: "none",
              fontSize: "14px",
            }}
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={selectStyle}
          >
            <option value="All">All Roles</option>
            <option value="Master Distributor">Master Distributor</option>
            <option value="Distributor">Distributor</option>
            <option value="Retailer">Retailer</option>
          </select>

          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            style={selectStyle}
          >
            <option value="All">All Time</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
        </div>

        {/* TOP 3 */}
        {topThree.length > 0 && (
          <div style={topThreeGrid}>
            {topThree.map((item, index) => (
              <TopCard key={item.rank} item={item} index={index} />
            ))}
          </div>
        )}

        {/* MAIN TABLE */}
        <div style={tableCard}>
          {/* HEADER */}
          <div style={tableHeader}>
            <HeaderCell label="Rank" sortKey="rank" current={sortConfig} onClick={handleSort} />
            <HeaderCell label="Name" sortKey="name" current={sortConfig} onClick={handleSort} />
            <HeaderCell label="Phone" sortKey="phone" current={sortConfig} onClick={handleSort} />
            <HeaderCell label="Role" sortKey="role" current={sortConfig} onClick={handleSort} />
            <HeaderCell label="Business" sortKey="business" current={sortConfig} onClick={handleSort} />
            <HeaderCell label="Commission" sortKey="commission" current={sortConfig} onClick={handleSort} />
            <HeaderCell label="Today" sortKey="today" current={sortConfig} onClick={handleSort} />
            <HeaderCell label="Growth" sortKey="growth" current={sortConfig} onClick={handleSort} align="right" />
          </div>

          {/* BODY */}
          {paginatedOthers.length === 0 ? (
            <div style={emptyMsg}>No records found.</div>
          ) : (
            paginatedOthers.map((item, i) => (
              <div key={item.rank} style={rowStyle(i)}>
                <div>#{item.rank}</div>
                <div>{item.name}</div>
                <div>{item.phone}</div>
                <div>{item.role}</div>
                <div>₹{item.business.toLocaleString()}</div>
                <div>₹{item.commission.toLocaleString()}</div>
                <div>₹{item.today.toLocaleString()}</div>
                <div style={{ textAlign: "right", color: item.growth >= 0 ? "#4effa1" : "#ff6b6b" }}>
                  {item.growth >= 0 ? "+" : ""}
                  {item.growth}%
                </div>
              </div>
            ))
          )}

          {/* Pagination */}
          <div style={paginationFooter}>
            <span>Page {safePage} of {totalPages}</span>
            <div>
              <button style={pageBtn} disabled={safePage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
              <button style={pageBtn} disabled={safePage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ---------- SMALL COMPONENTS ---------- */

const SummaryChip = ({ label, value }) => (
  <div style={summaryChip}>
    <div style={chipLabel}>{label}</div>
    <div style={chipValue}>{value}</div>
  </div>
);

const TopCard = ({ item, index }) => {
  const badges = ["1st", "2nd", "3rd"];
  const colors = [
    "linear-gradient(135deg, #facc15, #f97316)",
    "linear-gradient(135deg, #e5e7eb, #9ca3af)",
    "linear-gradient(135deg, #fb923c, #f97316)"
  ];

  return (
    <div style={topCardStyle}>
      <div style={{ ...rankBadge, background: colors[index] }}>{badges[index]}</div>
      <div style={topName}>{item.name}</div>
      <div style={topRole}>{item.role} · {item.transactions} txns</div>
      <div style={topStats}>
        <div>
          <div style={smallLabel}>Business</div>
          <div style={bold}>₹{item.business.toLocaleString()}</div>
        </div>

        <div>
          <div style={smallLabel}>Commission</div>
          <div style={bold}>₹{item.commission.toLocaleString()}</div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={smallLabel}>Growth</div>
          <div style={{ color: item.growth >= 0 ? "#4effa1" : "#ff6b6b" }}>
            {item.growth >= 0 ? "+" : ""}{item.growth}%
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderCell = ({ label, sortKey, current, onClick, align }) => {
  const active = current.key === sortKey;
  const icon =
    current.key !== sortKey ? "↕" : current.direction === "asc" ? "▲" : "▼";

  return (
    <button
      onClick={() => onClick(sortKey)}
      style={{
        ...headerBtn,
        justifyContent:
          align === "right" ? "flex-end" : "flex-start",
        fontWeight: active ? 700 : 500,
      }}
    >
      {label}
      <span style={{ fontSize: "10px", marginLeft: "5px" }}>{icon}</span>
    </button>
  );
};

/* ---------- STYLES ---------- */

const inputStyle = {
  flex: 1,
  padding: "10px 14px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.4)",
  background: "rgba(10,10,30,0.25)",
  color: "#fff",
  outline: "none",
};

const selectStyle = {
  padding: "10px 14px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.4)",
  background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.6))",
  color: "#fff",
  fontSize: "13px",
};

const pageBtn = {
  padding: "6px 12px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.4)",
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  cursor: "pointer",
  marginLeft: "8px",
};

const summaryChip = {
  padding: "10px 14px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.4)",
  background: "rgba(0,0,0,0.25)",
};

const chipLabel = {
  fontSize: "11px",
  opacity: 0.8,
};

const chipValue = {
  fontSize: "14px",
  fontWeight: 700,
};

const topCardStyle = {
  position: "relative",
  borderRadius: "16px",
  padding: "16px",
  background: "rgba(0,0,0,0.35)",
  border: "1px solid rgba(255,255,255,0.3)",
};

const rankBadge = {
  position: "absolute",
  top: "-10px",
  right: "10px",
  padding: "3px 10px",
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: 700,
};

const topName = { fontSize: "16px", fontWeight: 700 };
const topRole = { opacity: 0.8, fontSize: "13px", marginBottom: "10px" };

const topStats = {
  display: "flex",
  justifyContent: "space-between",
};

const smallLabel = { opacity: 0.7, fontSize: "12px" };
const bold = { fontWeight: 700, fontSize: "14px" };

export default LeaderBoard;
