import React, { useState, useEffect } from "react";
import "./App.css";
import Services from "./Components/services";
import upcomingServices from "./Components/upcomingServices";
import benefits from "./Components/benefits";
import testimonials from "./Components/testimonials";
import pricingPlans from "./Components/pricingplans";
import { Link, useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  ChevronRight,
  Phone,
  Tv,
  Zap,
  Droplet,
  Car,
  Gamepad2,
  Globe,
  Shield,
  Clock,
  CreditCard,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  Star,
  MapPin,
  Mail,
  ChevronDown,
  Play,
} from "lucide-react";
import ServicesGrid from "./Grid/ServicesGrid";
import logo from "../src/assets/logo.jpeg";

const CodeWebTelecomWebsite = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({
    users: 0,
    transactions: 0,
    operators: 0,
    uptime: 0,
  });
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log("Get Started clicked");
    navigate("/login");
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Animate stats
    const timer = setTimeout(() => {
      setStats({
        users: 50000,
        transactions: 1000000,
        operators: 25,
        uptime: 99.9,
      });
    }, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        margin: 0,
        padding: 0,
        background: "#ffffff",
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Header / Navigation */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: scrolled
            ? "rgba(255, 255, 255, 0.98)"
            : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          padding: "16px 0",
          zIndex: 1000,
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <nav
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img
      src={logo}
      alt="Code Web Telecom Logo"
      style={{ width: "50px", height: "50px", borderRadius: "12px" }}
    />
              {/* You can keep any text next to it if needed */}
            </div>

            <div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Code Web Telecom
              </div>
              <div style={{ fontSize: "11px", color: "#666" }}>
                Digital Service Partner
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div
            style={{
              display: window.innerWidth > 768 ? "flex" : "none",
              gap: "32px",
              alignItems: "center",
            }}
          >
            {[
              "Home",
              "Services",
              "Web Solutions",
              "About",
              "Pricing",
              "Contact",
            ].map((item) =>
              item === "Web Solutions" ? (
                <Link
                  key={item}
                  to="/web-solutions"
                  style={{
                    textDecoration: "none",
                    color: "#333",
                    fontWeight: "500",
                    fontSize: "15px",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#667eea")}
                  onMouseLeave={(e) => (e.target.style.color = "#333")}
                >
                  {item}
                </Link>
              ) : (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    textDecoration: "none",
                    color: "#333",
                    fontWeight: "500",
                    fontSize: "15px",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#667eea")}
                  onMouseLeave={(e) => (e.target.style.color = "#333")}
                >
                  {item}
                </a>
              )
            )}

            <button
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                border: "none",
                padding: "12px 28px",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "15px",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                transition: "transform 0.3s ease",
              }}
              onClick={handleGetStarted}
              onMouseEnter={(e) =>
                (e.target.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: window.innerWidth <= 768 ? "block" : "none",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            {mobileMenuOpen ? (
              <X size={28} color="#333" />
            ) : (
              <Menu size={28} color="#333" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              background: "white",
              padding: "24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              animation: "fadeIn 0.3s ease",
            }}
          >
            {[
              "Home",
              "Services",
              "Web Solutions",
              "About",
              "Pricing",
              "Contact",
            ].map((item) =>
              item === "Web Solutions" ? (
                <Link
                  key={item}
                  to="/web-solutions"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 0",
                    textDecoration: "none",
                    color: "#333",
                    fontWeight: "500",
                    fontSize: "16px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  {item}
                </Link>
              ) : (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 0",
                    textDecoration: "none",
                    color: "#333",
                    fontWeight: "500",
                    fontSize: "16px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  {item}
                </a>
              )
            )}

            <button
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                border: "none",
                padding: "12px 28px",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "15px",
                width: "100%",
                marginTop: "16px",
              }}
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          paddingTop: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Background Elements */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            animation: "float 4s ease-in-out infinite",
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "60px 24px",
            display: "grid",
            gridTemplateColumns: window.innerWidth > 768 ? "1fr 1fr" : "1fr",
            gap: "60px",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              color: "white",
              animation: "slideInLeft 1s ease-out",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.2)",
                padding: "8px 20px",
                borderRadius: "25px",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "24px",
                backdropFilter: "blur(10px)",
              }}
            >
              🚀 Trusted by 50,000+ Users
            </div>
            <h1
              style={{
                fontSize: window.innerWidth > 768 ? "56px" : "40px",
                fontWeight: "bold",
                marginBottom: "24px",
                lineHeight: "1.2",
                textShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              Empowering India with Instant Recharge Solutions
            </h1>
            <p
              style={{
                fontSize: "20px",
                marginBottom: "32px",
                opacity: 0.95,
                lineHeight: "1.6",
              }}
            >
              CodeWeb Telecom offers a seamless platform for mobile, DTH, and
              data card recharges across all major networks. From prepaid to
              postpaid services, we ensure instant and secure transactions.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button
                style={{
                  background: "white",
                  color: "#667eea",
                  border: "none",
                  padding: "16px 36px",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "16px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-4px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                Start Recharging
                <ChevronRight size={20} />
              </button>
              <button
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "2px solid white",
                  padding: "16px 36px",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "16px",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-4px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <Play size={20} />
                Watch Demo
              </button>
            </div>

            {/* Contact Info */}
            <div
              style={{
                display: "flex",
                gap: "24px",
                marginTop: "48px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.15)",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Phone size={20} />
                <span style={{ fontSize: "15px", fontWeight: "600" }}>
                  08069 578467
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.15)",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Mail size={20} />
                <span style={{ fontSize: "15px", fontWeight: "600" }}>
                  info.codeweb25@gmail.com
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              animation: "slideInRight 1s ease-out",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                borderRadius: "30px",
                padding: "40px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "32px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "48px",
                    textAlign: "center",
                    marginBottom: "16px",
                  }}
                >
                  📱
                </div>
                <h3
                  style={{
                    textAlign: "center",
                    color: "#333",
                    marginBottom: "8px",
                    fontSize: "24px",
                  }}
                >
                  Mobile Recharge
                </h3>
                <p
                  style={{
                    textAlign: "center",
                    color: "#666",
                    fontSize: "14px",
                  }}
                >
                  All operators supported
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {[
                  { icon: "📺", name: "DTH" },
                  { icon: "⚡", name: "Electricity" },
                  { icon: "🚗", name: "FASTag" },
                  { icon: "💳", name: "Bills" },
                ].map((service) => (
                  <div
                    key={service.name}
                    style={{
                      background: "white",
                      borderRadius: "15px",
                      padding: "24px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>
                      {service.icon}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#333",
                      }}
                    >
                      {service.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          padding: "80px 24px",
          background: "white",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              window.innerWidth > 768 ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
            gap: "40px",
            textAlign: "center",
          }}
        >
          {[
            {
              value: "50K+",
              label: "Active Users",
              icon: Users,
              color: "#4F46E5",
            },
            {
              value: "1M+",
              label: "Transactions",
              icon: TrendingUp,
              color: "#DB2777",
            },
            { value: "25+", label: "Operators", icon: Award, color: "#F59E0B" },
            { value: "99.9%", label: "Uptime", icon: Shield, color: "#10B981" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                animation: "fadeInUp 1s ease-out",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  margin: "0 auto 20px",
                  borderRadius: "50%",
                  background: `${stat.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <stat.icon size={36} color={stat.color} />
              </div>
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: stat.color,
                  marginBottom: "8px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "#666",
                  fontWeight: "500",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*Service Section */}
      <ServicesGrid />

      {/* Benefits Section */}
      <section
        style={{
          padding: "100px 24px",
          background: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2
              style={{
                fontSize: window.innerWidth > 768 ? "48px" : "36px",
                fontWeight: "bold",
                color: "#1a1a1a",
                marginBottom: "16px",
              }}
            >
              Why Choose Code Web Telecom?
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#666",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              We provide the most reliable and efficient recharge platform in
              India
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth > 768 ? "repeat(2, 1fr)" : "1fr",
              gap: "40px",
            }}
          >
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                style={{
                  display: "flex",
                  gap: "24px",
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    flexShrink: 0,
                    borderRadius: "20px",
                    background: "linear-gradient(135deg, #667eea15, #764ba215)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <benefit.icon size={36} color="#667eea" />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#1a1a1a",
                      marginBottom: "12px",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#666",
                      lineHeight: "1.6",
                    }}
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        style={{
          padding: "100px 24px",
          background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2
              style={{
                fontSize: window.innerWidth > 768 ? "48px" : "36px",
                fontWeight: "bold",
                color: "#1a1a1a",
                marginBottom: "16px",
              }}
            >
              Flexible Business Plans
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#666",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              Choose the perfect plan for your business needs
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth > 768 ? "repeat(3, 1fr)" : "1fr",
              gap: "32px",
            }}
          >
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                style={{
                  background: "white",
                  borderRadius: "24px",
                  padding: "40px 32px",
                  boxShadow: plan.popular
                    ? "0 20px 60px rgba(102, 126, 234, 0.25)"
                    : "0 4px 20px rgba(0,0,0,0.08)",
                  border: plan.popular
                    ? `3px solid ${plan.color}`
                    : "3px solid transparent",
                  position: "relative",
                  transform: plan.popular ? "scale(1.05)" : "scale(1)",
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                {plan.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-16px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`,
                      color: "white",
                      padding: "8px 24px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      boxShadow: `0 4px 15px ${plan.color}40`,
                    }}
                  >
                    ⭐ Most Popular
                  </div>
                )}

                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      color: "#1a1a1a",
                      marginBottom: "16px",
                    }}
                  >
                    {plan.name}
                  </h3>
                  <div
                    style={{
                      fontSize: "48px",
                      fontWeight: "bold",
                      color: plan.color,
                      marginBottom: "8px",
                    }}
                  >
                    {plan.price}
                  </div>
                  {plan.period && (
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      {plan.period}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: "32px" }}>
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      <CheckCircle size={20} color={plan.color} />
                      <span style={{ fontSize: "15px", color: "#333" }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  style={{
                    width: "100%",
                    background: plan.popular
                      ? `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`
                      : "white",
                    color: plan.popular ? "white" : plan.color,
                    border: plan.popular ? "none" : `2px solid ${plan.color}`,
                    padding: "16px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (plan.popular) {
                      e.currentTarget.style.transform = "scale(1.05)";
                    } else {
                      e.currentTarget.style.background = plan.color;
                      e.currentTarget.style.color = "white";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.popular) {
                      e.currentTarget.style.transform = "scale(1)";
                    } else {
                      e.currentTarget.style.background = "white";
                      e.currentTarget.style.color = plan.color;
                    }
                  }}
                  onClick={handleGetStarted}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        style={{
          padding: "100px 24px",
          background: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2
              style={{
                fontSize: window.innerWidth > 768 ? "48px" : "36px",
                fontWeight: "bold",
                color: "#1a1a1a",
                marginBottom: "16px",
              }}
            >
              What Our Clients Say
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#666",
              }}
            >
              Trusted by thousands of retailers across Bihar
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth > 768 ? "repeat(3, 1fr)" : "1fr",
              gap: "32px",
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                style={{
                  background: "linear-gradient(135deg, #667eea05, #764ba205)",
                  borderRadius: "20px",
                  padding: "32px",
                  border: "2px solid #667eea15",
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                    marginBottom: "20px",
                  }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} color="#F59E0B" fill="#F59E0B" />
                  ))}
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#333",
                    lineHeight: "1.8",
                    marginBottom: "24px",
                    fontStyle: "italic",
                  }}
                >
                  "{testimonial.text}"
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#1a1a1a",
                        marginBottom: "4px",
                      }}
                    >
                      {testimonial.name}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        style={{
          padding: "100px 24px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: window.innerWidth > 768 ? "1fr 1fr" : "1fr",
              gap: "60px",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: window.innerWidth > 768 ? "48px" : "36px",
                  fontWeight: "bold",
                  marginBottom: "24px",
                  lineHeight: "1.2",
                }}
              >
                About Code Web Telecom
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.8",
                  marginBottom: "24px",
                  opacity: 0.95,
                }}
              >
                Code Web Telecom is at the forefront of India's mobile recharge
                industry, providing innovative solutions for prepaid and
                postpaid services. Our platform enables retailers to offer
                instant recharges via SMS and online methods, covering all
                telecom and DTH operators nationwide.
              </p>
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.8",
                  marginBottom: "24px",
                  opacity: 0.95,
                }}
              >
                We are committed to simplifying utility transactions and
                empowering businesses with reliable value-added services. Our
                offerings include mobile, DTH, data card recharges, and bill
                payments, all accessible through a unified platform.
              </p>
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.8",
                  opacity: 0.95,
                }}
              >
                Join the rapidly growing mobile recharge industry by partnering
                with Code Web Telecom. We offer flexible business models for
                retailers, distributors, and master distributors, providing high
                margins and a comprehensive recharge system.
              </p>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                borderRadius: "30px",
                padding: "40px",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  marginBottom: "32px",
                  textAlign: "center",
                }}
              >
                Our Mission
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {[
                  {
                    icon: Shield,
                    text: "Provide secure and reliable recharge services",
                  },
                  {
                    icon: Users,
                    text: "Empower retailers and distributors across India",
                  },
                  {
                    icon: TrendingUp,
                    text: "Drive digital payment adoption in rural areas",
                  },
                  {
                    icon: Award,
                    text: "Deliver exceptional customer satisfaction",
                  },
                ].map((item) => (
                  <div
                    key={item.text}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      background: "rgba(255,255,255,0.1)",
                      padding: "20px",
                      borderRadius: "15px",
                    }}
                  >
                    <item.icon size={32} />
                    <span style={{ fontSize: "16px", lineHeight: "1.5" }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        style={{
          padding: "100px 24px",
          background: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2
              style={{
                fontSize: window.innerWidth > 768 ? "48px" : "36px",
                fontWeight: "bold",
                color: "#1a1a1a",
                marginBottom: "16px",
              }}
            >
              Get In Touch
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#666",
              }}
            >
              We'd love to hear from you. Reach out to us for any queries or
              support
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: window.innerWidth > 768 ? "1fr 1fr" : "1fr",
              gap: "60px",
            }}
          >
            {/* Contact Form */}
            <div
              style={{
                background: "linear-gradient(135deg, #667eea05, #764ba205)",
                borderRadius: "24px",
                padding: "40px",
                border: "2px solid #667eea15",
              }}
            >
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "2px solid #e5e7eb",
                      fontSize: "16px",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "2px solid #e5e7eb",
                      fontSize: "16px",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "2px solid #e5e7eb",
                      fontSize: "16px",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us about your requirements..."
                    rows="5"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "2px solid #e5e7eb",
                      fontSize: "16px",
                      outline: "none",
                      resize: "vertical",
                      fontFamily: "inherit",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    color: "white",
                    border: "none",
                    padding: "16px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-2px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div
                style={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  borderRadius: "24px",
                  padding: "40px",
                  color: "white",
                  marginBottom: "24px",
                }}
              >
                <h3
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginBottom: "32px",
                  }}
                >
                  Contact Information
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "28px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "start",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        flexShrink: 0,
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Phone size={24} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          opacity: 0.9,
                          marginBottom: "4px",
                        }}
                      >
                        Phone Numbers
                      </div>
                      <div style={{ fontSize: "18px", fontWeight: "600" }}>
                        08069 578467
                      </div>
                      <div style={{ fontSize: "16px", opacity: 0.9 }}>
                        +91 9266982764
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "start",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        flexShrink: 0,
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Mail size={24} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          opacity: 0.9,
                          marginBottom: "4px",
                        }}
                      >
                        Email Address
                      </div>
                      <div style={{ fontSize: "18px", fontWeight: "600" }}>
                        info.codeweb25@gmail.com
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "start",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        flexShrink: 0,
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          opacity: 0.9,
                          marginBottom: "4px",
                        }}
                      >
                        Office Address
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          lineHeight: "1.6",
                        }}
                      >
                        Ground Floor, Ward No. 28
                        <br />
                        Raghunathpur, Motihari
                        <br />
                        East Champaran - 845401
                        <br />
                        Bihar, India
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#f8f9fa",
                  borderRadius: "20px",
                  padding: "32px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    marginBottom: "8px",
                  }}
                >
                  Registration Number
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#667eea",
                  }}
                >
                  BR110078133
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "white",
          padding: "60px 24px 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth > 768 ? "repeat(4, 1fr)" : "1fr",
              gap: "40px",
              marginBottom: "40px",
            }}
          >
            {/* About Section */}
            <div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                Code Web Telecom
              </div>
              <p
                style={{
                  fontSize: "14px",
                  opacity: 0.9,
                  lineHeight: "1.6",
                  marginBottom: "20px",
                }}
              >
                Your trusted partner for digital recharge and bill payment
                solutions across India.
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                {[
                  {
                    name: "facebook",
                    url: "https://www.facebook.com/profile.php?id=61577141469086",
                  },
                  {
                    name: "instagram",
                    url: "https://www.instagram.com/?next=%2F",
                  },
                  { name: "linkedin", url: "https://www.linkedin.com/feed/" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "white",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "white";
                      e.currentTarget.style.color = "#667eea";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.2)";
                      e.currentTarget.style.color = "white";
                    }}
                  >
                    {social.name.charAt(0).toUpperCase()}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Quick Links
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {["Home", "Services", "About Us", "Pricing", "Contact"].map(
                  (link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase().replace(" ", "")}`}
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "14px",
                        opacity: 0.9,
                        transition: "opacity 0.3s ease",
                      }}
                      onMouseEnter={(e) => (e.target.style.opacity = 1)}
                      onMouseLeave={(e) => (e.target.style.opacity = 0.9)}
                    >
                      {link}
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Services
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {[
                  "Mobile Recharge",
                  "DTH Recharge",
                  "Bill Payments",
                  "FASTag Recharge",
                  "Google Play",
                ].map((service) => (
                  <a
                    key={service}
                    href="#services"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontSize: "14px",
                      opacity: 0.9,
                      transition: "opacity 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = 1)}
                    onMouseLeave={(e) => (e.target.style.opacity = 0.9)}
                  >
                    {service}
                  </a>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Support
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {[
                  "Help Center",
                  "Terms & Conditions",
                  "Privacy Policy",
                  "FAQs",
                  "Support",
                ].map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontSize: "14px",
                      opacity: 0.9,
                      transition: "opacity 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = 1)}
                    onMouseLeave={(e) => (e.target.style.opacity = 0.9)}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.2)",
              paddingTop: "24px",
              display: "flex",
              flexDirection: window.innerWidth > 768 ? "row" : "column",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div style={{ fontSize: "14px", opacity: 0.9 }}>
              © {new Date().getFullYear()} Code Web Telecom. All Rights
              Reserved.
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                opacity: 0.9,
              }}
            >
              <Shield size={16} />
              <span>Secured with Best Security Practices</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <a
        href="https://wa.me/919266982764"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "28px",
          boxShadow: "0 8px 25px rgba(37, 211, 102, 0.4)",
          cursor: "pointer",
          textDecoration: "none",
          zIndex: 999,
          animation: "pulse 2s infinite",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        💬
      </a>

      {/* Scroll to Top Button */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: "32px",
            left: "32px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            border: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
            zIndex: 999,
            animation: "fadeIn 0.3s ease",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-4px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default CodeWebTelecomWebsite;
