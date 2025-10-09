import React, { useState } from "react";
import services from "../Components/services";
import { useNavigate } from "react-router-dom";

export default function ServicesGrid() {
  const [activeService, setActiveService] = useState(null);
  const navigate = useNavigate();

  return (
    <section
      id="services"
      style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #667eea15, #764ba215)",
              padding: "8px 24px",
              borderRadius: "25px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#667eea",
              marginBottom: "16px",
            }}
          >
            Our Services
          </div>
          <h2
            style={{
              fontSize: window.innerWidth > 768 ? "48px" : "36px",
              fontWeight: "bold",
              color: "#1a1a1a",
              marginBottom: "16px",
            }}
          >
            Complete Recharge & Bill Payment Solutions
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#666",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            From mobile recharges to utility bill payments, we provide a
            comprehensive platform for all your digital transaction needs
          </p>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              window.innerWidth > 1024
                ? "repeat(4, 1fr)"
                : window.innerWidth > 768
                ? "repeat(2, 1fr)"
                : "1fr",
            gap: "24px",
          }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
                // onClick={() => navigate("/MobileRecharge")}
                onClick={() => {
                  if (service.type === "mobile") {
                    navigate("/MobileRecharge");
                  } else if (service.type === "dth") {
                    navigate("/DTHRecharge");
                  } else if (service.type === "electricity") {
                    navigate("/ElectricityRecharge");
                  } else if (service.type === "FASTagRecharge") {
                    navigate("/FASTagRecharge");
                  } else if (service.type === "GasRecharge") {
                    navigate("/GasRecharge");
                  } else if (service.type === "DataCardRecharge") {
                    navigate("/DataCardRecharge");
                  }
                }}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "32px 24px",
                  boxShadow:
                    activeService === service.id
                      ? "0 20px 50px rgba(0,0,0,0.15)"
                      : "0 4px 20px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform:
                    activeService === service.id
                      ? "translateY(-8px)"
                      : "translateY(0)",
                  border: `2px solid ${
                    activeService === service.id ? service.color : "transparent"
                  }`,
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    background: `${service.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <Icon size={32} color={service.color} />
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#1a1a1a",
                    marginBottom: "12px",
                  }}
                >
                  {service.name}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.6",
                    marginBottom: "20px",
                  }}
                >
                  {service.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      style={{
                        background: `${service.color}10`,
                        color: service.color,
                        padding: "4px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
