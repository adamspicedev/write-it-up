import NavLink from "@/components/dashboard/nav-link";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { navLinks } from "@/lib/data";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="bg-muted/40 hidden border-r md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <h3 className="text-2xl">
                Write<span className="text-primary">ItUp</span>
              </h3>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="item-start grid px-2 font-medium lg:px-4">
              {navLinks.map((link) => (
                <NavLink key={link.name} link={link} />
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          <div className="ml-auto flex items-center gap-x-5">
            <ThemeToggle />
          </div>
        </header>
      </div>
    </section>
  );
};

export default DashboardLayout;
