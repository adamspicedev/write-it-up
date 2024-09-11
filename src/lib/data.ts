import { DollarSign, Globe, HomeIcon, TagIcon } from "lucide-react";
import { NavLink } from "./types";
import React from "react";

export const navLinks: NavLink[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: React.createElement(HomeIcon),
  },
  { name: "Sites", href: "/dashboard/sites", icon: React.createElement(Globe) },
  { name: "Tags", href: "/dashboard/tags", icon: React.createElement(TagIcon) },
  {
    name: "Pricing",
    href: "/dashboard/pricing",
    icon: React.createElement(DollarSign),
  },
];
