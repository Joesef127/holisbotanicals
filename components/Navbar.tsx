import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, UserCircle, ChevronDown, Droplets, Flower } from "lucide-react";
import { NAV_LINKS } from "../lib/constants.ts";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { images } from "@/lib";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAddedPage, setIsAddedPage] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [healthCheckOpen, setHealthCheckOpen] = useState(false);
  const [mobileHealthOpen, setMobileHealthOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const productsDropdownRef = useRef<HTMLDivElement>(null);
  const healthDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  const productsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const healthTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const location = useLocation();
  const { cart } = useApp();
  const { isAdmin } = useAuth();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Hover handlers for Products dropdown
  const handleProductsMouseEnter = () => {
    if (productsTimeoutRef.current) {
      clearTimeout(productsTimeoutRef.current);
      productsTimeoutRef.current = null;
    }
    setProductsOpen(true);
    setHealthCheckOpen(false);
  };

  const handleProductsMouseLeave = () => {
    if (productsTimeoutRef.current) {
      clearTimeout(productsTimeoutRef.current);
    }
    productsTimeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
    }, 150);
  };

  // Hover handlers for Health Check dropdown
  const handleHealthMouseEnter = () => {
    if (healthTimeoutRef.current) {
      clearTimeout(healthTimeoutRef.current);
      healthTimeoutRef.current = null;
    }
    setHealthCheckOpen(true);
    setProductsOpen(false);
  };

  const handleHealthMouseLeave = () => {
    if (healthTimeoutRef.current) {
      clearTimeout(healthTimeoutRef.current);
    }
    healthTimeoutRef.current = setTimeout(() => {
      setHealthCheckOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cleanup hover timers on unmount
  useEffect(() => {
    return () => {
      if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
      if (healthTimeoutRef.current) clearTimeout(healthTimeoutRef.current);
    };
  }, []);

  // Close dropdowns and mobile modal when clicking anywhere else in the window or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        productsDropdownRef.current &&
        !productsDropdownRef.current.contains(target)
      ) {
        setProductsOpen(false);
      }
      if (
        healthDropdownRef.current &&
        !healthDropdownRef.current.contains(target)
      ) {
        setHealthCheckOpen(false);
      }
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProductsOpen(false);
        setHealthCheckOpen(false);
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setProductsOpen(false);
    setHealthCheckOpen(false);
    setMobileProductsOpen(false);
    setIsAddedPage(
      location.pathname === "/prostanone" ||
      location.pathname === "/menoset" ||
      location.pathname === "/blog" ||
      location.pathname === "/distributor",
    );
    setIsHomePage(location.pathname === "/");
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
            ${scrolled || isOpen
          ? `${isAddedPage ? "bg-primary/90" : "bg-white/90"} 
            backdrop-blur-md shadow-md py-4`
          : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center z-50">
            <img
              src={images.logo}
              alt="Prostanone Logo"
              className={`h-10 w-auto ${isAddedPage ? (isOpen ? "" : "brightness-0 invert") : ""}`}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-3 xl:space-x-8">
            <div
              className="relative"
              ref={productsDropdownRef}
              onMouseEnter={handleProductsMouseEnter}
              onMouseLeave={handleProductsMouseLeave}
            >
              <button
                type="button"
                onClick={() => {
                  setProductsOpen((open) => !open);
                  setHealthCheckOpen(false);
                }}
                aria-haspopup="menu"
                aria-expanded={productsOpen}
                className={`flex items-center gap-1 text-xs lg:text-sm rounded-lg py-1 lg:py-1.5 px-1.5 lg:px-2.5 font-medium transition-colors ${isAddedPage ? "text-white hover:bg-white hover:text-primary" : isHomePage ? `${scrolled ? "text-primary" : "text-white"} hover:bg-primary hover:text-white` : "text-gray-600 hover:text-primary"}`}
              >
                Products <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {productsOpen && (
                <div role="menu" className="absolute left-0 top-full pt-2 w-48 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
                    <Link role="menuitem" to="/menoset" onClick={() => setProductsOpen(false)} className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-800">Menoset</Link>
                    <Link role="menuitem" to="/prostanone" onClick={() => setProductsOpen(false)} className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary">Prostanone</Link>
                  </div>
                </div>
              )}
            </div>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs lg:text-sm py-1 lg:py-1.5 px-1.5 lg:px-2.5 font-medium transition-colors
                  ${isAddedPage || isHomePage ? "rounded-lg" : ""}
                  ${isAddedPage
                    ? "text-white hover:bg-white hover:text-primary"
                    : isHomePage
                      ? `${scrolled ? "text-primary" : "text-white"} hover:bg-primary hover:text-white`
                      : "text-gray-600 hover:text-primary"
                  }
                  ${location.pathname === link.path
                    ? isAddedPage
                      ? "bg-white text-primary!"
                      : isHomePage
                        ? "font-bold"
                        : "text-primary font-bold"
                    : ""
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin/profile"
                className={`py-1.5 px-2 rounded-lg transition-colors
                  ${isAddedPage
                    ? "text-white hover:bg-white hover:text-primary"
                    : isHomePage
                      ? `${scrolled ? "text-primary" : "text-white"} hover:bg-primary hover:text-white`
                      : "text-gray-600 hover:text-primary"
                  }`}
              >
                <UserCircle className="w-6 h-6" />
              </Link>
            )}
            <Link to="/summary">
              <div
                className={`relative py-1.5 px-2 rounded-lg transition-colors
                  ${isAddedPage
                    ? "text-white hover:bg-white hover:text-primary"
                    : isHomePage
                      ? `${scrolled ? "text-primary" : "text-white"} hover:bg-primary hover:text-white`
                      : "text-gray-600 hover:text-primary"
                  }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
            <div
              className="relative"
              ref={healthDropdownRef}
              onMouseEnter={handleHealthMouseEnter}
              onMouseLeave={handleHealthMouseLeave}
            >
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  setHealthCheckOpen((open) => !open);
                  setProductsOpen(false);
                }}
                aria-haspopup="menu"
                aria-expanded={healthCheckOpen}
                className={`sm:text-xs! xl:text-sm! flex items-center gap-1.5 ${isAddedPage
                    ? "text-primary! bg-white border border-transparent hover:text-white! hover:bg-transparent hover:border-white rounded-lg"
                    : ""
                  }`}
              >
                <span>Check Your Health</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${healthCheckOpen ? "rotate-180" : ""
                    }`}
                  aria-hidden="true"
                />
              </Button>
              {healthCheckOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="rounded-2xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5">
                    <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      Select Assessment
                    </div>
                    <Link
                      role="menuitem"
                      to="/quiz"
                      onClick={() => setHealthCheckOpen(false)}
                      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-primary/5 text-left"
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Droplets className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 group-hover:text-primary">
                            For Men
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                            Prostate
                          </span>
                        </div>
                        <p className="text-xs text-text mt-0.5 leading-snug">
                          Prostate health, urinary flow &amp; frequency check
                        </p>
                      </div>
                    </Link>

                    <div className="my-1 border-t border-gray-100" />

                    <Link
                      role="menuitem"
                      to="/menoset-check"
                      onClick={() => setHealthCheckOpen(false)}
                      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-rose-700/10 text-left"
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-500/60">
                        <Flower className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 group-hover:text-rose-700">
                            For Women
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                            Menopause
                          </span>
                        </div>
                        <p className="text-xs text-text mt-0.5 leading-snug">
                          Menopause, cramp relief &amp; hormone wellness check
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <ThemeToggle
              className={
                isAddedPage
                  ? "text-white hover:bg-white hover:text-primary"
                  : isHomePage
                    ? `${scrolled ? "text-primary" : "text-white"} hover:bg-primary hover:text-white`
                    : "text-gray-600 hover:text-primary"
              }
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4 z-50">
            {isAdmin && (
              <Link
                to="/admin/profile"
                className={`py-1.5 px-2 rounded-lg transition-colors
                  ${isAddedPage
                    ? isOpen ? "text-primary hover:bg-primary hover:text-white" : "text-white hover:bg-white hover:text-primary"
                    : isHomePage
                      ? `${scrolled || isOpen ? "text-primary" : "text-white"} hover:bg-primary hover:text-white`
                      : "text-gray-600 hover:text-primary"
                  }`}
              >
                <UserCircle className="w-6 h-6" />
              </Link>
            )}
            <ThemeToggle
              className={
                isAddedPage
                  ? isOpen ? "text-primary hover:bg-primary hover:text-white" : "text-white hover:bg-white hover:text-primary"
                  : isHomePage
                    ? `${scrolled || isOpen ? "text-primary" : "text-white"} hover:bg-primary hover:text-white`
                    : "text-gray-600 hover:text-primary"
              }
            />
            <Link to="/summary" className="relative">
              <div
                className={`py-1.5 px-2 rounded-lg transition-colors
                  ${isAddedPage
                    ? isOpen
                      ? "text-primary hover:bg-primary hover:text-white"
                      : "text-white hover:bg-white hover:text-primary"
                    : isHomePage
                      ? `${scrolled || isOpen ? "text-primary" : "text-white"} hover:bg-primary hover:text-white`
                      : "text-gray-600 hover:text-primary"
                  }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            <button
              ref={mobileButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              className={`py-1 px-1.5 rounded-lg transition-colors focus:outline-none
                ${isAddedPage
                  ? isOpen
                    ? "text-primary hover:bg-primary hover:text-white"
                    : "text-white hover:bg-white hover:text-primary"
                  : isHomePage
                    ? `${scrolled || isOpen ? "text-primary" : "text-white"} hover:bg-primary hover:text-white`
                    : "text-gray-600 hover:text-primary"
                }`}
            >
              {isOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop — clicking anywhere outside the menu closes it */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div
            ref={mobileMenuRef}
            className="relative bg-white z-50 pt-20 pb-8 px-6 flex flex-col items-center space-y-3 max-h-[92vh] overflow-y-auto shadow-2xl rounded-b-3xl"
          >
            {/* Home link */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`text-xl font-medium text-gray-800 hover:text-white p-2 hover:bg-primary w-full rounded-lg text-center ${location.pathname === "/" ? "bg-primary text-white!" : "text-gray-600"
                }`}
            >
              Home
            </Link>

            {/* Products Dropdown on Mobile */}
            <div className="w-full">
              <button
                type="button"
                onClick={() => setMobileProductsOpen((prev) => !prev)}
                className={`text-xl font-medium p-2 hover:bg-primary hover:text-white w-full rounded-lg text-center flex items-center justify-center gap-2 transition-colors ${location.pathname === "/menoset" || location.pathname === "/prostanone"
                    ? "bg-primary text-white!"
                    : "text-gray-800"
                  }`}
              >
                <span>Products</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              {mobileProductsOpen && (
                <div className="space-y-1 pt-1 pb-1 px-3">
                  <Link
                    to="/menoset"
                    onClick={() => setIsOpen(false)}
                    className={`block w-full rounded-lg py-2.5 px-3 text-center text-lg font-medium transition-colors ${location.pathname === "/menoset"
                        ? "bg-rose-100 text-rose-800 font-semibold"
                        : "text-gray-600 hover:bg-rose-50 hover:text-rose-800"
                      }`}
                  >
                    Menoset
                  </Link>
                  <Link
                    to="/prostanone"
                    onClick={() => setIsOpen(false)}
                    className={`block w-full rounded-lg py-2.5 px-3 text-center text-lg font-medium transition-colors ${location.pathname === "/prostanone"
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                      }`}
                  >
                    Prostanone
                  </Link>
                </div>
              )}
            </div>

            {/* Other Nav links (excluding Home since it's rendered first) */}
            {NAV_LINKS.filter((link) => link.path !== "/").map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-medium text-gray-800 hover:text-white p-2 hover:bg-primary w-full rounded-lg text-center ${location.pathname === link.path
                    ? "bg-primary text-white!"
                    : "text-gray-600"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Health Assessment Dropdown */}
            <div className="w-full space-y-2 pt-2">
              <button
                type="button"
                onClick={() => setMobileHealthOpen((prev) => !prev)}
                className="w-full"
              >
                <Button
                  fullWidth
                  size="md"
                  type="button"
                  className="text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <span>Check Your Health</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${mobileHealthOpen ? "rotate-180" : ""
                      }`}
                  />
                </Button>
              </button>
              {mobileHealthOpen && (
                <div className="space-y-2 pt-1">
                  <Link
                    to="/quiz"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 text-left transition-colors hover:bg-primary/10"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Droplets className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          For Men
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-primary/15 text-primary">
                          Prostate
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Prostate health &amp; urinary symptom assessment
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/menoset-check"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50/70 p-3 text-left transition-colors hover:bg-rose-100"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-500/60">
                      <Flower className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          For Women
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-200 text-rose-700">
                          Menopause
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Menopause, cramp relief &amp; hormone wellness
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
