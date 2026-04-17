import { useState } from "react";
import { Home, Clock3, ChartNoAxesColumn, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const navLinks = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/timeline", label: "Timeline", icon: Clock3 },
  { to: "/stats", label: "Stats", icon: ChartNoAxesColumn }
];

function navClass(isActive) {
  return [
    "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
    isActive ? "bg-brand-dark text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  ].join(" ");
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5">
          <NavLink to="/" className="inline-flex items-center" onClick={() => setMobileOpen(false)}>
            <img src={logo} alt="KeenKeeper" className="h-[31px] w-auto object-contain" loading="eager" decoding="async" />
          </NavLink>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex rounded-md border border-slate-200 p-2 text-slate-600 md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
            {navLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => navClass(isActive)}>
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {mobileOpen ? (
          <nav className="flex flex-col gap-2 border-t border-slate-200 pb-4 pt-3 md:hidden" aria-label="Mobile primary">
            {navLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => navClass(isActive)}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
