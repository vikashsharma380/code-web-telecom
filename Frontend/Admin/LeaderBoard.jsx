import React, { useMemo, useState } from "react";
import Nav from "../hero/nav";

const LeaderBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [periodFilter, setPeriodFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "business",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;

  // Dummy fintech leaderboard data WITH phone numbers
  const rawData = [
    {
      id: 1,
      name: "Amit Kumar",
      role: "Master Distributor",
      business: 155000,
      commission: 8200,
      today: 12000,
      growth: 12.5,
      transactions: 420,
      period: "This Month",
      phone: "9876500001",
    },
    {
      id: 2,
      name: "Rohit Sharma",
      role: "Distributor",
      business: 138000,
      commission: 6900,
      today: 9500,
      growth: 9.4,
      transactions: 380,
      period: "This Month",
      phone: "9876500002",
    },
    {
      id: 3,
      name: "Priya Singh",
      role: "Retailer",
      business: 119000,
      commission: 5400,
      today: 8300,
      growth: 7.2,
      transactions: 350,
      period: "This Week",
      phone: "9876500003",
    },
    {
      id: 4,
      name: "Kiran Das",
      role: "Retailer",
      business: 110500,
      commission: 5100,
      today: 7200,
      growth: 6.1,
      transactions: 330,
      period: "This Week",
      phone: "9876500004",
    },
    {
      id: 5,
      name: "Sandeep Patel",
      role: "Distributor",
      business: 108000,
      commission: 5000,
      today: 6800,
      growth: 5.4,
      transactions: 320,
      period: "This Month",
      phone: "9876500005",
    },
    {
      id: 6,
      name: "Neha Verma",
      role: "Retailer",
      business: 99000,
      commission: 4600,
      today: 6100,
      growth: 4.3,
      transactions: 290,
      period: "Today",
      phone: "9876500006",
    },
    {
      id: 7,
      name: "Vikas Gupta",
      role: "Master Distributor",
      business: 165000,
      commission: 8600,
      today: 10000,
      growth: 10.1,
      transactions: 440,
      period: "This Month",
      phone: "9876500007",
    },
    {
      id: 8,
      name: "Anjali Singh",
      role: "Distributor",
      business: 101000,
      commission: 4700,
      today: 5800,
      growth: 3.9,
      transactions: 270,
      period: "Today",
      phone: "9876500008",
    },
    {
      id: 9,
      name: "Rahul Yadav",
      role: "Retailer",
      business: 88000,
      commission: 4100,
      today: 5400,
      growth: 3.2,
      transactions: 250,
      period: "This Week",
      phone: "9876500009",
    },
    {
      id: 10,
      name: "Deepak Singh",
      role: "Distributor",
      business: 96000,
      commission: 4300,
      today: 5600,
      growth: 4.0,
      transactions: 260,
      period: "This Month",
      phone: "9876500010",
    },
  ];

  // Helpers for sorting
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

  // Process data: search by name + phone
  const processedData = useMemo(() => {
    let filtered = [...rawData];

    if (roleFilter !== "All") {
      filtered = filtered.filter((item) => item.role === roleFilter);
    }

    if (periodFilter !== "All") {
      filtered = filtered.filter((item) => item.period === periodFilter);
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.phone.toLowerCase().includes(term)
      );
    }

    filtered.sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === "asc" ? 1 : -1;
      let A = a[key];
      let B = b[key];

      if (typeof A === "string") {
        A = A.toLowerCase();
        B = B.toLowerCase();
        if (A < B) return -1 * direction;
        if (A > B) return 1 * direction;
        return 0;
      } else {
        return (A - B) * direction;
      }
    });

    return filtered.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
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
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Header + Summary */}
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
            <div
              style={{
                fontSize: "26px",
                fontWeight: 700,
                marginBottom: "6px",
              }}
            >
              Fintech Leaderboard
            </div>
            <div style={{ fontSize: "13px", opacity: 0.85 }}>
              Performance ranking with mobile number lookup.
            </div>
          </div>

          {/* Small metric chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
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

        {/* Controls: search & filters */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "18px",
          }}
        >
          <input
            placeholder="Search name or phone number..."
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
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={selectStyle}
          >
            <option value="All">All Roles</option>
            <option value="Master Distributor">Master Distributor</option>
            <option value="Distributor">Distributor</option>
            <option value="Retailer">Retailer</option>
          </select>

          <select
            value={periodFilter}
            onChange={(e) => {
              setPeriodFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={selectStyle}
          >
            <option value="All">All Time</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
        </div>

        {/* Top 3 cards */}
        {topThree.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "14px",
              marginBottom: "18px",
            }}
          >
            {topThree.map((item, index) => (
              <TopCard key={item.id} item={item} index={index} />
            ))}
          </div>
        )}

        {/* Main table card */}
        <div
          style={{
            background: "rgba(3,7,26,0.72)",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "70px 1fr 0.8fr 0.8fr 1fr 1fr 0.8fr 0.6fr",
              padding: "12px 16px",
              fontWeight: 600,
              fontSize: "13px",
              borderBottom: "1px solid rgba(255,255,255,0.25)",
              background:
                "linear-gradient(90deg, rgba(148,163,255,0.25), rgba(37,99,235,0.05))",
            }}
          >
            <HeaderCell
              label="Rank"
              sortKey="rank"
              current={sortConfig}
              onClick={handleSort}
            />
            <HeaderCell
              label="Name"
              sortKey="name"
              current={sortConfig}
              onClick={handleSort}
            />
            <HeaderCell
              label="Phone"
              sortKey="phone"
              current={sortConfig}
              onClick={handleSort}
            />
            <HeaderCell
              label="Role"
              sortKey="role"
              current={sortConfig}
              onClick={handleSort}
            />
            <HeaderCell
              label="Business"
              sortKey="business"
              current={sortConfig}
              onClick={handleSort}
            />
            <HeaderCell
              label="Commission"
              sortKey="commission"
              current={sortConfig}
              onClick={handleSort}
            />
            <HeaderCell
              label="Today"
              sortKey="today"
              current={sortConfig}
              onClick={handleSort}
            />
            <HeaderCell
              label="Growth"
              sortKey="growth"
              current={sortConfig}
              onClick={handleSort}
              align="right"
            />
          </div>

          {/* Table rows */}
          {paginatedOthers.length === 0 ? (
            <div
              style={{
                padding: "18px 16px",
                textAlign: "center",
                fontSize: "14px",
                opacity: 0.85,
              }}
            >
              No records found for selected filters.
            </div>
          ) : (
            paginatedOthers.map((item, i) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "70px 1fr 0.8fr 0.8fr 1fr 1fr 0.8fr 0.6fr",
                  padding: "12px 16px",
                  fontSize: "14px",
                  borderBottom:
                    i !== paginatedOthers.length - 1
                      ? "1px solid rgba(255,255,255,0.12)"
                      : "none",
                  background:
                    i % 2 === 0 ? "rgba(15,23,42,0.6)" : "rgba(15,23,42,0.4)",
                }}
              >
                <div style={{ fontWeight: 600 }}>#{item.rank}</div>
                <div>{item.name}</div>
                <div style={{ opacity: 0.9 }}>{item.phone}</div>
                <div style={{ opacity: 0.9 }}>{item.role}</div>
                <div>₹{item.business.toLocaleString()}</div>
                <div>₹{item.commission.toLocaleString()}</div>
                <div>₹{item.today.toLocaleString()}</div>
                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 600,
                    color: item.growth >= 0 ? "#4effa1" : "#ff6b6b",
                  }}
                >
                  {item.growth >= 0 ? "+" : ""}
                  {item.growth.toFixed(1)}%
                </div>
              </div>
            ))
          )}

          {/* Pagination footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 14px",
              borderTop: "1px solid rgba(255,255,255,0.18)",
              fontSize: "13px",
            }}
          >
            <div style={{ opacity: 0.9 }}>
              Page {safePage} of {totalPages}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                style={pageBtnStyle}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
              >
                Prev
              </button>
              <button
                style={pageBtnStyle}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={safePage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ----- Small components & styles ----- */

const SummaryChip = ({ label, value }) => (
  <div
    style={{
      padding: "8px 12px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.5)",
      background: "rgba(15,23,42,0.45)",
      minWidth: "150px",
    }}
  >
    <div
      style={{
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        opacity: 0.8,
        marginBottom: "2px",
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: "14px", fontWeight: 600 }}>{value}</div>
  </div>
);

const TopCard = ({ item, index }) => {
  const badgeLabel = index === 0 ? "1st" : index === 1 ? "2nd" : "3rd";

  const badgeStyle = {
    0: {
      background: "linear-gradient(135deg, #facc15, #f97316)",
      shadow: "0 0 18px rgba(250,204,21,0.55)",
    },
    1: {
      background: "linear-gradient(135deg, #e5e7eb, #9ca3af)",
      shadow: "0 0 16px rgba(209,213,219,0.4)",
    },
    2: {
      background: "linear-gradient(135deg, #f97316, #fb923c)",
      shadow: "0 0 16px rgba(249,115,22,0.45)",
    },
  }[index];

  return (
    <div
      style={{
        position: "relative",
        padding: "14px 14px 12px",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.35)",
        background: "rgba(15,23,42,0.75)",
        boxShadow: badgeStyle.shadow,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10px",
          right: "12px",
          padding: "3px 10px",
          borderRadius: "999px",
          fontSize: "11px",
          fontWeight: 700,
          color: "#111827",
          background: badgeStyle.background,
        }}
      >
        {badgeLabel}
      </div>
      <div
        style={{
          fontSize: "14px",
          fontWeight: 600,
          marginBottom: "4px",
        }}
      >
        {item.name}
      </div>
      <div
        style={{
          fontSize: "12px",
          opacity: 0.8,
          marginBottom: "8px",
        }}
      >
        {item.role} · {item.transactions} txns
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
        }}
      >
        <div>
          <div style={{ opacity: 0.7 }}>Business</div>
          <div style={{ fontWeight: 600 }}>
            ₹{item.business.toLocaleString()}
          </div>
        </div>
        <div>
          <div style={{ opacity: 0.7 }}>Commission</div>
          <div style={{ fontWeight: 600 }}>
            ₹{item.commission.toLocaleString()}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ opacity: 0.7 }}>Growth</div>
          <div
            style={{
              fontWeight: 600,
              color: item.growth >= 0 ? "#4effa1" : "#ff6b6b",
            }}
          >
            {item.growth >= 0 ? "+" : ""}
            {item.growth.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderCell = ({ label, sortKey, current, onClick, align }) => {
  const isActive = current.key === sortKey;
  const icon =
    current.key !== sortKey ? "↕" : current.direction === "asc" ? "▲" : "▼";

  return (
    <button
      onClick={() => onClick(sortKey)}
      style={{
        display: "flex",
        justifyContent:
          align === "right"
            ? "flex-end"
            : align === "left"
            ? "flex-start"
            : "flex-start",
        gap: "6px",
        alignItems: "center",
        background: "transparent",
        border: "none",
        color: "#fff",
        fontWeight: isActive ? 700 : 500,
        fontSize: "13px",
        cursor: "pointer",
        padding: 0,
      }}
    >
      <span>{label}</span>
      <span
        style={{
          fontSize: "10px",
          opacity: isActive ? 1 : 0.6,
        }}
      >
        {icon}
      </span>
    </button>
  );
};

const selectStyle = {
  padding: "9px 32px 9px 12px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.4)",
  background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.6))",
  color: "#fff",
  fontSize: "13px",
  outline: "none",
  appearance: "none",
  position: "relative",
};

const pageBtnStyle = {
  padding: "6px 12px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.6)",
  background: "rgba(15,23,42,0.9)",
  color: "#fff",
  fontSize: "12px",
  cursor: "pointer",
};

export default LeaderBoard;
