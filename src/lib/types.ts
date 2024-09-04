import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactElement, RefAttributes } from "react";

export type NavLink = {
  name: string;
  href: string;
  icon: ReactElement;
};
