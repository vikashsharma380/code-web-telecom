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
// import logo from "./assets/logo.jpeg"; 
 
 const pricingPlans = [
    {
      name: "Retailer",
      price: "Free",
      features: [
        "Mobile & DTH Recharge",
        "Bill Payments",
        "Basic Commission",
        "Email Support",
        "Transaction History",
      ],
      color: "#4F46E5",
      popular: false,
    },
    {
      name: "Distributor",
      price: "₹5,000",
      period: "Security Deposit",
      features: [
        "All Retailer Features",
        "Higher Commission",
        "Create Sub-Retailers",
        "Priority Support",
        "Advanced Reports",
        "API Access",
      ],
      color: "#DB2777",
      popular: true,
    },
    {
      name: "Master Distributor",
      price: "₹25,000",
      period: "Security Deposit",
      features: [
        "All Distributor Features",
        "Maximum Commission",
        "Unlimited Sub-Distributors",
        "Dedicated Account Manager",
        "Custom Branding",
        "White Label Option",
      ],
      color: "#F59E0B",
      popular: false,
    },
  ];

    export default pricingPlans;