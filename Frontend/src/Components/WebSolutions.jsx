import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Code,
  Smartphone,
  Globe,
  Zap,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  TrendingUp,
  Clock,
  Target,
  Layers,
  Database,
  Cloud,
  Lock,
  Sparkles,
  Rocket,
  MessageSquare,
  ChevronRight,
  Play,
  X,
  Menu,
  Home,
} from "lucide-react";

const WebSolutions = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("web");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = {
    web: [
      {
        icon: Globe,
        title: "Custom Web Development",
        description:
          "Tailored web solutions built with cutting-edge technologies",
        features: [
          "React & Next.js",
          "Node.js Backend",
          "RESTful APIs",
          "Database Design",
        ],
        color: "#667eea",
      },
      {
        icon: Smartphone,
        title: "Responsive Design",
        description: "Beautiful, mobile-first designs that work on all devices",
        features: [
          "Mobile Optimization",
          "Cross-browser Support",
          "Fast Loading",
          "SEO Friendly",
        ],
        color: "#764ba2",
      },
      {
        icon: Database,
        title: "E-Commerce Solutions",
        description: "Complete online store setup with payment integration",
        features: [
          "Payment Gateway",
          "Inventory Management",
          "Order Tracking",
          "Admin Dashboard",
        ],
        color: "#f093fb",
      },
      {
        icon: Cloud,
        title: "Cloud Deployment",
        description: "Secure hosting and deployment on cloud platforms",
        features: [
          "AWS/Azure Setup",
          "SSL Certificates",
          "CDN Integration",
          "Auto Scaling",
        ],
        color: "#4facfe",
      },
    ],
    app: [
      {
        icon: Smartphone,
        title: "Native Mobile Apps",
        description: "High-performance iOS and Android applications",
        features: [
          "Swift/Kotlin",
          "React Native",
          "Flutter",
          "Native Performance",
        ],
        color: "#43e97b",
      },
      {
        icon: Layers,
        title: "Cross-Platform Apps",
        description: "Write once, deploy everywhere solutions",
        features: [
          "React Native",
          "Flutter",
          "Code Reusability",
          "Faster Development",
        ],
        color: "#fa709a",
      },
      {
        icon: Lock,
        title: "App Security",
        description: "Enterprise-grade security for your mobile applications",
        features: [
          "Data Encryption",
          "Secure Auth",
          "API Security",
          "Compliance",
        ],
        color: "#fee140",
      },
      {
        icon: Rocket,
        title: "App Store Deployment",
        description: "Complete app submission and optimization",
        features: [
          "Store Optimization",
          "App Guidelines",
          "Version Management",
          "Analytics Setup",
        ],
        color: "#30cfd0",
      },
    ],
  };

  const technologies = [
    { name: "React", color: "#61dafb" },
    { name: "Node.js", color: "#68a063" },
    { name: "MongoDB", color: "#4db33d" },
    { name: "AWS", color: "#ff9900" },
    { name: "Flutter", color: "#02569b" },
    { name: "React Native", color: "#61dafb" },
    { name: "Firebase", color: "#ffca28" },
    { name: "PostgreSQL", color: "#336791" },
  ];

  const portfolio = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "🛒",
      description: "Full-featured online store with payment integration",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Healthcare App",
      category: "Mobile App",
      image: "🏥",
      description: "Patient management and appointment booking system",
      tech: ["React Native", "Firebase"],
    },
    {
      title: "Food Delivery App",
      category: "Mobile App",
      image: "🍔",
      description: "Real-time order tracking and delivery management",
      tech: ["Flutter", "Node.js"],
    },
    {
      title: "Real Estate Portal",
      category: "Web Development",
      image: "🏠",
      description: "Property listing and management platform",
      tech: ["Next.js", "PostgreSQL"],
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description:
        "We analyze your requirements and create a detailed project roadmap",
      icon: Target,
    },
    {
      step: "02",
      title: "Design & Prototype",
      description:
        "Creating wireframes and interactive prototypes for your approval",
      icon: Layers,
    },
    {
      step: "03",
      title: "Development",
      description: "Building your solution with clean code and best practices",
      icon: Code,
    },
    {
      step: "04",
      title: "Testing & Launch",
      description: "Rigorous testing followed by smooth deployment and launch",
      icon: Rocket,
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "CEO, TechStart India",
      text: "Code Web Telecom delivered our e-commerce platform ahead of schedule. Their attention to detail and technical expertise is outstanding.",
      rating: 5,
      avatar: "R",
    },
    {
      name: "Priya Sharma",
      role: "Founder, HealthCare Plus",
      text: "The mobile app they developed has transformed our patient engagement. Highly professional team with excellent communication.",
      rating: 5,
      avatar: "P",
    },
    {
      name: "Amit Patel",
      role: "MD, FoodHub",
      text: "From concept to deployment, they handled everything perfectly. Our food delivery app is now serving thousands of customers daily.",
      rating: 5,
      avatar: "A",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Secure & Scalable",
      desc: "Enterprise-grade security",
    },
    { icon: Zap, title: "Fast Delivery", desc: "Agile development process" },
    {
      icon: Users,
      title: "Dedicated Team",
      desc: "Expert developers assigned",
    },
    {
      icon: Award,
      title: "Quality Assured",
      desc: "Rigorous testing standards",
    },
  ];

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        margin: 0,
        padding: 0,
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Header */}
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
            Code Web Solutions
          </div>

          <div
            style={{
              display: window.innerWidth > 768 ? "flex" : "none",
              gap: "32px",
              alignItems: "center",
            }}
          >
            {["Services", "Portfolio", "Process", "Contact"].map((item) => (
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
            ))}
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
              }}
            >
              Start Project
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: window.innerWidth <= 768 ? "block" : "none",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section
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
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "60px 24px",
            textAlign: "center",
            color: "white",
            position: "relative",
            zIndex: 1,
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
            ✨ Premium Web & App Development Services
          </div>

          <h1
            style={{
              fontSize: window.innerWidth > 768 ? "64px" : "40px",
              fontWeight: "bold",
              marginBottom: "24px",
              lineHeight: "1.2",
            }}
          >
            Transform Your Ideas Into
            <br />
            Digital Reality
          </h1>

          <p
            style={{
              fontSize: "22px",
              marginBottom: "40px",
              opacity: 0.95,
              maxWidth: "800px",
              margin: "0 auto 40px",
              lineHeight: "1.6",
            }}
          >
            We craft beautiful, high-performance websites and mobile
            applications that drive business growth and delight users
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                background: "white",
                color: "#667eea",
                border: "none",
                padding: "18px 40px",
                borderRadius: "30px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "16px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Get Started <ChevronRight size={20} />
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "2px solid white",
                padding: "18px 40px",
                borderRadius: "30px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "16px",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Play size={20} /> View Portfolio
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "40px",
              justifyContent: "center",
              marginTop: "60px",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "14px", opacity: 0.9 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        style={{ padding: "100px 24px", background: "white" }}
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
              Our Services
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#666",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              Comprehensive development solutions tailored to your business
              needs
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "60px",
              flexWrap: "wrap",
            }}
          >
            {[
              { key: "web", label: "Web Development", icon: Globe },
              { key: "app", label: "Mobile Apps", icon: Smartphone },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  background:
                    activeTab === tab.key
                      ? "linear-gradient(135deg, #667eea, #764ba2)"
                      : "white",
                  color: activeTab === tab.key ? "white" : "#333",
                  border: activeTab === tab.key ? "none" : "2px solid #e5e7eb",
                  padding: "16px 32px",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                }}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth > 768 ? "repeat(2, 1fr)" : "1fr",
              gap: "32px",
            }}
          >
            {services[activeTab].map((service, index) => (
              <div
                key={service.title}
                style={{
                  background: "linear-gradient(135deg, #f8f9fa, #ffffff)",
                  borderRadius: "24px",
                  padding: "40px",
                  border: "2px solid #e5e7eb",
                  transition: "all 0.3s ease",
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 60px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "20px",
                    background: `${service.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                  }}
                >
                  <service.icon size={36} color={service.color} />
                </div>

                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#1a1a1a",
                    marginBottom: "12px",
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    marginBottom: "24px",
                    lineHeight: "1.6",
                  }}
                >
                  {service.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <CheckCircle size={18} color={service.color} />
                      <span style={{ fontSize: "15px", color: "#333" }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section
        style={{
          padding: "80px 24px",
          background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
        >
          <h3
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#1a1a1a",
              marginBottom: "16px",
            }}
          >
            Technologies We Master
          </h3>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "48px" }}>
            Building with the latest and most reliable tech stack
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {technologies.map((tech) => (
              <div
                key={tech.name}
                style={{
                  background: "white",
                  padding: "16px 32px",
                  borderRadius: "50px",
                  border: `2px solid ${tech.color}20`,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 8px 20px ${tech.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: tech.color,
                  }}
                />
                <span
                  style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        id="process"
        style={{ padding: "100px 24px", background: "white" }}
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
              Our Development Process
            </h2>
            <p style={{ fontSize: "18px", color: "#666" }}>
              A proven methodology that ensures project success
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth > 768 ? "repeat(4, 1fr)" : "1fr",
              gap: "32px",
            }}
          >
            {process.map((item, index) => (
              <div
                key={item.step}
                style={{
                  textAlign: "center",
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "0 auto 24px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea15, #764ba215)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.step}
                  </div>
                  <item.icon size={40} color="#667eea" />
                </div>

                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#1a1a1a",
                    marginBottom: "12px",
                  }}
                >
                  {item.title}
                </h4>

                <p
                  style={{
                    fontSize: "15px",
                    color: "#666",
                    lineHeight: "1.6",
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
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
              Our Recent Work
            </h2>
            <p style={{ fontSize: "18px", color: "#666" }}>
              Delivering excellence across various industries
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth > 768 ? "repeat(2, 1fr)" : "1fr",
              gap: "32px",
            }}
          >
            {portfolio.map((project, index) => (
              <div
                key={project.title}
                style={{
                  background: "white",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 60px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.08)";
                }}
              >
                <div
                  style={{
                    height: "200px",
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "80px",
                  }}
                >
                  {project.image}
                </div>

                <div style={{ padding: "32px" }}>
                  <div
                    style={{
                      display: "inline-block",
                      background: "#667eea15",
                      color: "#667eea",
                      padding: "6px 16px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "16px",
                    }}
                  >
                    {project.category}
                  </div>

                  <h4
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#1a1a1a",
                      marginBottom: "12px",
                    }}
                  >
                    {project.title}
                  </h4>

                  <p
                    style={{
                      fontSize: "15px",
                      color: "#666",
                      marginBottom: "20px",
                      lineHeight: "1.6",
                    }}
                  >
                    {project.description}
                  </p>

                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          background: "#f8f9fa",
                          padding: "6px 12px",
                          borderRadius: "12px",
                          fontSize: "13px",
                          color: "#333",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: "100px 24px", background: "white" }}>
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
            <p style={{ fontSize: "18px", color: "#666" }}>
              Don't just take our word for it
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
                  borderRadius: "24px",
                  padding: "32px",
                  border: "2px solid #667eea15",
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                <div
                  style={{ display: "flex", gap: "4px", marginBottom: "20px" }}
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
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
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
                    {testimonial.avatar}
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
                    <div style={{ fontSize: "14px", color: "#666" }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        style={{
          padding: "100px 24px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2
              style={{
                fontSize: window.innerWidth > 768 ? "48px" : "36px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Why Choose Us
            </h2>
            <p style={{ fontSize: "18px", opacity: 0.95 }}>
              We deliver more than just code - we deliver success
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth > 768 ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
              gap: "32px",
            }}
          >
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  padding: "32px 24px",
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.2)",
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    margin: "0 auto 20px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <benefit.icon size={36} />
                </div>
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  {benefit.title}
                </h4>
                <p style={{ fontSize: "14px", opacity: 0.9 }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "100px 24px", background: "white" }}>
        <div
          style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #667eea05, #764ba205)",
              borderRadius: "30px",
              padding: "60px 40px",
              border: "2px solid #667eea15",
            }}
          >
            <Sparkles
              size={48}
              color="#667eea"
              style={{ margin: "0 auto 24px" }}
            />

            <h2
              style={{
                fontSize: window.innerWidth > 768 ? "42px" : "32px",
                fontWeight: "bold",
                color: "#1a1a1a",
                marginBottom: "20px",
              }}
            >
              Ready to Start Your Project?
            </h2>

            <p
              style={{
                fontSize: "18px",
                color: "#666",
                marginBottom: "40px",
                lineHeight: "1.6",
              }}
            >
              Let's discuss how we can help transform your business with
              cutting-edge technology solutions
            </p>

            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                  border: "none",
                  padding: "18px 40px",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "16px",
                  boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Schedule a Call <ChevronRight size={20} />
              </button>
              <button
                style={{
                  background: "white",
                  color: "#667eea",
                  border: "2px solid #667eea",
                  padding: "18px 40px",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <MessageSquare size={20} /> Chat With Us
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "32px",
                justifyContent: "center",
                marginTop: "40px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <CheckCircle size={20} color="#10B981" />
                <span style={{ fontSize: "15px", color: "#333" }}>
                  Free Consultation
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <CheckCircle size={20} color="#10B981" />
                <span style={{ fontSize: "15px", color: "#333" }}>
                  No Obligation Quote
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <CheckCircle size={20} color="#10B981" />
                <span style={{ fontSize: "15px", color: "#333" }}>
                  Quick Response
                </span>
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
              Get In Touch
            </h2>
            <p style={{ fontSize: "18px", color: "#666" }}>
              Let's discuss your project requirements
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: window.innerWidth > 768 ? "1fr 1fr" : "1fr",
              gap: "60px",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "24px",
                padding: "40px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
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
                    Full Name *
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
                    }}
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
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "2px solid #e5e7eb",
                      fontSize: "16px",
                      outline: "none",
                    }}
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
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "2px solid #e5e7eb",
                      fontSize: "16px",
                      outline: "none",
                    }}
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
                    Project Type
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "2px solid #e5e7eb",
                      fontSize: "16px",
                      outline: "none",
                      background: "white",
                    }}
                  >
                    <option>Select project type</option>
                    <option>Website Development</option>
                    <option>Mobile App Development</option>
                    <option>E-Commerce Solution</option>
                    <option>Custom Software</option>
                    <option>Other</option>
                  </select>
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
                    Project Details *
                  </label>
                  <textarea
                    placeholder="Tell us about your project requirements..."
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
                    }}
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                  }}
                >
                  Send Message <ArrowRight size={20} />
                </button>
              </form>
            </div>

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
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          opacity: 0.9,
                          marginBottom: "4px",
                        }}
                      >
                        Email Us
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
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          opacity: 0.9,
                          marginBottom: "4px",
                        }}
                      >
                        Call Us
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
                      <Clock size={24} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          opacity: 0.9,
                          marginBottom: "4px",
                        }}
                      >
                        Business Hours
                      </div>
                      <div style={{ fontSize: "16px", fontWeight: "600" }}>
                        Mon - Sat: 9:00 AM - 8:00 PM
                      </div>
                      <div style={{ fontSize: "14px", opacity: 0.9 }}>
                        Sunday: Closed
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "32px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#1a1a1a",
                    marginBottom: "20px",
                  }}
                >
                  Why Work With Us?
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {[
                    "Transparent pricing with no hidden costs",
                    "Regular project updates and communication",
                    "Post-launch support and maintenance",
                    "Scalable solutions for business growth",
                  ].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: "12px",
                      }}
                    >
                      <CheckCircle
                        size={20}
                        color="#10B981"
                        style={{ flexShrink: 0, marginTop: "2px" }}
                      />
                      <span
                        style={{
                          fontSize: "15px",
                          color: "#333",
                          lineHeight: "1.6",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                window.innerWidth > 768 ? "repeat(3, 1fr)" : "1fr",
              gap: "40px",
              marginBottom: "40px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                Code Web Solutions
              </div>
              <p
                style={{
                  fontSize: "14px",
                  opacity: 0.9,
                  lineHeight: "1.6",
                  marginBottom: "20px",
                }}
              >
                Transforming ideas into powerful digital solutions. Your trusted
                partner for web and mobile development.
              </p>
            </div>

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
                {["Services", "Portfolio", "Process", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontSize: "14px",
                      opacity: 0.9,
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Get Updates
              </h4>
              <p
                style={{ fontSize: "14px", opacity: 0.9, marginBottom: "16px" }}
              >
                Subscribe to our newsletter for tech insights
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="email"
                  placeholder="Your email"
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
                <button
                  style={{
                    background: "white",
                    color: "#667eea",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.2)",
              paddingTop: "24px",
              textAlign: "center",
              fontSize: "14px",
              opacity: 0.9,
            }}
          >
            © {new Date().getFullYear()} Code Web Telecom. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
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
        }}
      >
        💬
      </a>
    </div>
  );
};

export default WebSolutions;
