import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    value: "$2B+",
    label: "Transactions Tracked",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.9/5",
    label: "User Rating",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "Advanced Analytics",
    description:
      "Get detailed insights into your spending patterns with AI-powered analytics",
  },
  {
    icon: <Receipt className="h-8 w-8 text-blue-600" />,
    title: "Smart Receipt Scanner",
    description:
      "Extract data automatically from receipts using advanced AI technology",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "Budget Planning",
    description: "Create and manage budgets with intelligent recommendations",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "Multi-Account Support",
    description: "Manage multiple accounts and credit cards in one place",
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-600" />,
    title: "Multi-Currency",
    description: "Support for multiple currencies with real-time conversion",
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Automated Insights",
    description: "Get automated financial insights and recommendations",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "1. Create Your Account",
    description:
      "Get started in minutes with our simple and secure sign-up process",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "2. Track Your Spending",
    description:
      "Automatically categorize and track your transactions in real-time",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "3. Get Insights",
    description:
      "Receive AI-powered insights and recommendations to optimize your finances",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Nami",
    role: "Navigator",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "Wealth completely rewired how I run my business money. The AI showed me leaks I didn’t even know were stealing my berries. Cutting costs has never felt this satisfying.",
  },
  {
    name: "Roronoa Zoro",
    role: "Swordsman",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "I tried to get lost in my expenses… but this app tracked every single one of them. Tch. Too accurate. Respect ⚔️",
  },
  {
    name: "Nico Robin",
    role: "Archaeologist",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "I recommend Wealth to all my friends. Its multi-currency support and precise analytics make navigating international investments… remarkably effortless.",
  },
  {
    name: "Monkey D. Luffy",
    role: "Captain",
    image: "https://randomuser.me/api/portraits/men/74.jpg",
    quote:
      "I’m saving money with Wealth because Nami said so… and also because future-me really wants a LOT of meat.",
  },
];