import { ReactNode, useState } from "react";

import {
  FaChartPie,
  FaUsers,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import {
  Link,
  useLocation,
} from "react-router-dom";

const MainLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(false);

  const location = useLocation();

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Leads",
      path: "/leads",
      icon: <FaUsers />,
    },
  ];

  return (
    <div
  className={`min-h-screen flex transition-all duration-300 ${
    darkMode ? "dark bg-gray-900" : "bg-gray-100"
  }`}
>
      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-72
          p-6 flex flex-col
          transform transition-transform duration-300
          shadow-2xl
          ${
            darkMode
              ? "bg-black text-white"
              : "bg-gradient-to-b from-black to-gray-900 text-white"
          }
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              GigFlow
            </h1>
            <p className="text-gray-400 text-sm">
              CRM Dashboard
            </p>
          </div>

          <button
            className="lg:hidden"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* THEME TOGGLE */}
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="flex items-center gap-3 mb-6 bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition"
        >
          {darkMode ? (
            <>
              <FaSun /> Light Mode
            </>
          ) : (
            <>
              <FaMoon /> Dark Mode
            </>
          )}
        </button>

        {/* NAV */}
        <nav className="flex flex-col gap-3">
          {navLinks.map((link) => {
            const active =
              location.pathname ===
              link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center gap-4
                  px-5 py-4 rounded-2xl
                  transition
                  ${
                    active
                      ? "bg-blue-600"
                      : "hover:bg-white/10"
                  }
                `}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header
          className={`lg:hidden flex justify-between items-center px-4 py-4 shadow ${
            darkMode
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          <button
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <FaBars size={22} />
          </button>

          <h1 className="font-bold text-xl">
            GigFlow
          </h1>
        </header>

        {/* CONTENT */}
        <main
          className={`flex-1 transition-all ${
            darkMode
              ? "text-white"
              : "text-black"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;