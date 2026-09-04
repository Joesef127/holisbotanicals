import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, UserCircle, ChevronDown } from "lucide-react";
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

  const location = useLocation();
  const { cart } = useApp();
  const { isAdmin } = useAuth();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
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
            ${
              scrolled || isOpen
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
          <div className="hidden md:flex items-center space-x-2 lg:space-x-6 xl:space-x-8">
            <div className="relative">
              <button
                type="button"
                onClick={() => setProductsOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={productsOpen}
                className={`flex items-center gap-1 text-xs lg:text-sm rounded-lg py-1 lg:py-1.5 px-1.5 lg:px-2.5 font-medium transition-colors ${isAddedPage ? "text-white hover:bg-white hover:text-primary" : isHomePage ? `${scrolled ? "text-primary" : "text-white"} hover:bg-primary hover:text-white` : "text-gray-600 hover:text-primary"}`}
              >
                Products <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
              {productsOpen && (
                <div role="menu" className="absolute left-0 top-full mt-2 w-48 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
                  <Link role="menuitem" to="/menoset" onClick={() => setProductsOpen(false)} className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-800">Menoset</Link>
                  <Link role="menuitem" to="/prostanone" onClick={() => setProductsOpen(false)} className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary">Prostanone</Link>
                </div>
              )}
            </div>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs lg:text-sm py-1 lg:py-1.5 px-1.5 lg:px-2.5 font-medium transition-colors
                  ${isAddedPage || isHomePage ? "rounded-lg" : ""}
                  ${
                    isAddedPage
                      ? "text-white hover:bg-white hover:text-primary"
                      : isHomePage
                        ? `${scrolled ? "text-primary" : "text-white"} hover:bg-primary hover:text-white`
                        : "text-gray-600 hover:text-primary"
                  }
                  ${
                    location.pathname === link.path
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
                  ${
                    isAddedPage
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
                  ${
                    isAddedPage
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
            <Link to="/quiz">
              <Button
                size="sm"
                className={`sm:text-xs! xl:text-sm! ${isAddedPage && "text-primary! bg-white border border-transparent hover:text-white! hover:bg-transparent hover:border-white rounded-lg"}`}
              >
                Check Prostate Health
              </Button>
            </Link>
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
                  ${
                    isAddedPage
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
                  ${
                    isAddedPage
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
              onClick={() => setIsOpen(!isOpen)}
              className={`py-1 px-1.5 rounded-lg transition-colors focus:outline-none
                ${
                  isAddedPage
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
        <div className="fixed inset-0 bg-white z-40 pt-20 pb-8 px-6 md:hidden flex flex-col items-center space-y-3 h-fit">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xl font-medium text-gray-800 hover:text-white p-2 hover:bg-primary w-full rounded-lg text-center ${
                location.pathname === link.path
                  ? "bg-primary text-white!"
                  : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="w-full space-y-2">
            <p className="px-2 pt-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Products</p>
            <Link to="/menoset" className="block w-full rounded-lg p-2 text-center text-xl font-medium text-gray-600 hover:bg-rose-50 hover:text-rose-800">Menoset</Link>
            <Link to="/prostanone" className="block w-full rounded-lg p-2 text-center text-xl font-medium text-gray-600 hover:bg-primary/5 hover:text-primary">Prostanone</Link>
          </div>
          <Link to="/quiz" className="w-full">
            <Button fullWidth size="md" className="text-sm sm:text-base">
              Check Prostate Health
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
