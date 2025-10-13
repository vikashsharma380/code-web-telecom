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
  Smartphone,
} from "lucide-react";

const services = [
  {
    id: "mobile",
    name: "Mobile Recharge",
    icon: Phone,
    type: "mobile",
    color: "#4F46E5",
    description:
      "Instant prepaid and postpaid mobile recharges for all major operators across India",
    features: [
      "All Operators",
      "Instant Processing",
      "Best Plans",
      "24/7 Available",
    ],
  },
  {
    id: "dth",
    name: "DTH Recharge",
    icon: Tv,
    type: "dth",
    color: "#DB2777",
    description:
      "Quick and easy DTH recharge services for all leading DTH providers",
    features: ["Tata Sky", "Airtel Digital", "Dish TV", "Sun Direct"],
  },
  {
    id: "electricity",
    name: "Electricity Bill",
    type: "electricity",
    icon: Zap,
    color: "#F59E0B",
    description:
      "Pay electricity bills online for all state electricity boards",
    features: [
      "All States",
      "Instant Payment",
      "No Extra Charges",
      "Payment History",
    ],
  },
  {
    id: "water",
    name: "Water Bill",
    type: "water",
    icon: Droplet,
    color: "#06B6D4",
    description:
      "Convenient water bill payment services for municipal corporations",
    features: [
      "Quick Payment",
      "All Corporations",
      "Instant Receipt",
      "Secure",
    ],
  },
  {
    id: "fastag",
    name: "FASTag Recharge",
    icon: Car,
    type: "FASTagRecharge",
    color: "#10B981",
    description:
      "Recharge your FASTag wallet instantly for seamless toll payments",
    features: [
      "All Banks",
      "Instant Credit",
      "Multiple Vehicles",
      "Easy Process",
    ],
  },
  {
    id: "gas",
    name: "Gas Bill Payment",
    type: "GasRecharge",
    icon: Droplet,
    color: "#EF4444",
    description: "Pay your LPG gas bills and book cylinders online",
    features: [
      "Online Booking",
      "Bill Payment",
      "Subsidy Status",
      "Quick Service",
    ],
  },
  {
    id: 9,
    name: "Google Play",
    type: "googleplay",
    description: "Recharge your Google Play balance instantly",
    icon: Smartphone, // Use any existing icon like Smartphone
    color: "#34A853", // Google green
    features: [
      "Instant",
      "Secure",
      "Digital",
      "Multiple Amount Options",
      "No Hidden Fees",
      "24/7 Availability",
      "Safe & Reliable",
    ],
  },
  {
    id: "datacard",
    name: "Data Card Recharge",
    icon: Globe,
    type: "DataCardRecharge",
    color: "#06B6D4",
    description:
      "Recharge data cards and dongles for uninterrupted internet connectivity",
    features: [
      "All Operators",
      "Various Plans",
      "Instant Activation",
      "Best Offers",
    ],
  },
  // ✅ New Insurance Service
  {
    id: "insurance",
    name: "Insurance Payment",
    type: "InsuranceRecharge",
    icon: Shield,
    color: "#3B82F6",
    description:
      "Pay your insurance premium securely and instantly for all leading providers.",
    features: [
      "LIC, HDFC, ICICI, SBI, Max Life",
      "Instant Confirmation",
      "Secure Payment Gateway",
      "No Extra Charges",
    ],
  },
  {
    id: "postpaid",
    name: "Postpaid Recharge",
    type: "PostpaidRecharge",
    icon: Smartphone,
    color: "#10B981",
    description:
      "Recharge your postpaid mobile instantly and stay connected without interruption.",
    features: [
      "All Major Operators Supported",
      "Instant Bill Payment",
      "Secure Transactions",
      "Auto Reminder for Due Bills",
    ],
  },
];

export default services;
