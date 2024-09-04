import { DollarSign, Globe, HomeIcon } from "lucide-react";
import { NavLink } from "./types";
import React from "react";

export const navLinks: NavLink[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: React.createElement(HomeIcon),
  },
  { name: "Sites", href: "/dashboard/sites", icon: React.createElement(Globe) },
  {
    name: "Pricing",
    href: "/dashboard/pricing",
    icon: React.createElement(DollarSign),
  },
];
