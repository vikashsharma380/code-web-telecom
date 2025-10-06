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

const services = [
    {
      id: "mobile",
      name: "Mobile Recharge",
      icon: Phone,
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
      color: "#DB2777",
      description:
        "Quick and easy DTH recharge services for all leading DTH providers",
      features: ["Tata Sky", "Airtel Digital", "Dish TV", "Sun Direct"],
    },
    {
      id: "electricity",
      name: "Electricity Bill",
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
      id: "googleplay",
      name: "Google Play Recharge",
      icon: Gamepad2,
      color: "#8B5CF6",
      description:
        "Top up your Google Play balance for apps, games, and entertainment",
      features: [
        "Instant Credit",
        "Multiple Denominations",
        "Secure Payment",
        "Gift Options",
      ],
    },
    {
      id: "datacard",
      name: "Data Card Recharge",
      icon: Globe,
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
  ];

    export default services;