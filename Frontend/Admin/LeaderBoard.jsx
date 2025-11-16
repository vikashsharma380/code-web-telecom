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

  const [rawData, setRawData] = useState([]); // BACKEND DATA
  const itemsPerPage = 7;

  // ⭐ FETCH REAL LEADERBOARD
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
          setRawData(data.records);
        }
      } catch (error) {
        console.error("Leaderboard fetch error:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  // ⭐ SORTING
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "desc" };
    });
  };

  // ⭐ SEARCH + FILTER + SORT + RANK
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

    // SORT LOGIC
    filtered.sort((a, b) => {
      const key = sortConfig.key;
      const dir = sortConfig.direction === "asc" ? 1 : -1;

      let A = a[key];
      let B = b[key];

      if (typeof A === "string") {
        A = A.toLowerCase();
        B = B.toLowerCase();
        return A < B ? -1 * dir : A > B ? 1 * dir : 0;
      }
      return (A - B) * dir;
    });

    return filtered.map((item, i) => ({ ...item, rank: i + 1 }));
  }, [rawData, roleFilter, periodFilter, searchTerm, sortConfig]);

  const topThree = processedData.slice(0, 3);
  const others = processedData.slice(3);

  const totalPages = Math.max(1, Math.ceil(others.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const paginatedOthers = others.slice(startIndex, startIndex + itemsPerPage);

  // ⭐ TOTAL SUMMARY
  const totals = useMemo(() => {
    const base = processedData;
    return {
      business: base.reduce((s, x) => s + x.business, 0),
      commission: base.reduce((s, x) => s + x.commission, 0),
      txns: base.reduce((s, x) => s + x.transactions, 0),
    };
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
        <div style={headerWrap}>
          <div>
            <div style={title}>Fintech Leaderboard</div>
            <div style={subtitle}>Real-time ranking based on recharge performance.</div>
          </div>

          <div style={summaryRow}>
            <SummaryChip label="Total Business" value={`₹${totals.business.toLocaleString()}`} />
            <SummaryChip label="Total Commission" value={`₹${totals.commission.toLocaleString()}`} />
            <SummaryChip label="Total Transactions" value={totals.txns.toLocaleString()} />
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div style={filterRow}>
          <input
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={searchInput}
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

          {/* PAGINATION */}
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

/* ===================== SMALL COMPONENTS ===================== */

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
    "linear-gradient(135deg, #fb923c, #f97316)",
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
            {item.growth >= 0 ? "+" : ""}
            {item.growth}%
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderCell = ({ label, sortKey, current, onClick, align }) => {
  const active = current.key === sortKey;
  const icon = current.key !== sortKey ? "↕" : current.direction === "asc" ? "▲" : "▼";

  return (
    <button
      onClick={() => onClick(sortKey)}
      style={{
        ...headerBtn,
        justifyContent: align === "right" ? "flex-end" : "flex-start",
        fontWeight: active ? 700 : 500,
      }}
    >
      {label}
      <span style={{ marginLeft: 4, fontSize: 10 }}>{icon}</span>
    </button>
  );
};

/* ===================== ALL STYLES BELOW ===================== */

const headerWrap = { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" };
const title = { fontSize: "26px", fontWeight: 700 };
const subtitle = { fontSize: "13px", opacity: 0.8 };
const summaryRow = { display: "flex", gap: "10px", flexWrap: "wrap" };

const filterRow = { display: "flex", gap: "12px", marginTop: "20px", marginBottom: "20px" };
const searchInput = {
  flex: 1,
  padding: "10px 14px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.4)",
  background: "rgba(10,10,30,0.25)",
  color: "#fff",
  outline: "none",
};

const topThreeGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "18px",
  marginBottom: "20px",
};

const tableCard = {
  background: "rgba(3,7,26,0.72)",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.2)",
  overflow: "hidden",
  marginTop: "15px",
};

const tableHeader = {
  display: "grid",
  gridTemplateColumns: "60px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
  padding: "12px 16px",
  background: "rgba(255,255,255,0.08)",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  fontWeight: 600,
  fontSize: "13px",
};

const rowStyle = (i) => ({
  display: "grid",
  gridTemplateColumns: "60px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
  padding: "12px 16px",
  background: i % 2 === 0 ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
  fontSize: "14px",
});

const emptyMsg = {
  padding: "20px",
  textAlign: "center",
  opacity: 0.8,
};

const paginationFooter = {
  padding: "12px 16px",
  display: "flex",
  justifyContent: "space-between",
  borderTop: "1px solid rgba(255,255,255,0.2)",
};

const pageBtn = {
  padding: "6px 12px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.4)",
  background: "rgba(255,255,255,0.12)",
  color: "#fff",
  marginLeft: "8px",
  cursor: "pointer",
};

const summaryChip = {
  padding: "10px 14px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.4)",
  background: "rgba(0,0,0,0.25)",
};

const chipLabel = { fontSize: "11px", opacity: 0.8 };
const chipValue = { fontSize: "14px", fontWeight: "700" };

const topCardStyle = {
  position: "relative",
  padding: "18px",
  borderRadius: "16px",
  background: "rgba(0,0,0,0.3)",
  border: "1px solid rgba(255,255,255,0.28)",
};

const rankBadge = {
  position: "absolute",
  top: "-10px",
  right: "10px",
  padding: "4px 10px",
  borderRadius: "999px",
  color: "#111",
  fontWeight: 700,
};

const topName = { fontSize: "16px", fontWeight: 700, marginBottom: 4 };
const topRole = { opacity: 0.8, fontSize: "13px", marginBottom: "10px" };

const topStats = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "13px",
};

const smallLabel = { opacity: 0.7, fontSize: "12px" };
const bold = { fontSize: "14px", fontWeight: 700 };

const headerBtn = {
  background: "transparent",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

const selectStyle = {
  padding: "9px 12px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.4)",
  background: "rgba(255,255,255,0.15)",
  color: "#fff",
  fontSize: "13px",
  outline: "none",
  appearance: "none",
  cursor: "pointer",
};

export default LeaderBoard;
