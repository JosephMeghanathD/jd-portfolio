import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-scroll";
import { Logo } from "./Logo";
import { useState } from "react";

const navLinks = [
  { to: "hero", label: "Home" },
  { to: "skills", label: "Skills" },
  { to: "journey", label: "Journey" },
  { to: "projects", label: "Projects" },
  { to: "contact", label: "Contact" },
];

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        <motion.div
          className="flex items-center gap-2 px-3 py-2 bg-background-elevated/80 backdrop-blur-xl border border-border-color rounded-full shadow-lg shadow-black/10"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#hero" aria-label="Go to top" className="mr-1">
            <Logo />
          </a>

          <div className="hidden md:flex items-center">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="px-3 py-1.5 text-sm font-medium text-text-secondary cursor-pointer rounded-full transition-all hover:text-text-primary hover:bg-background-secondary"
                activeClass="!text-accent"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block w-px h-4 bg-border-color mx-1" />

          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </motion.button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={16} /> : <FiMenu size={16} />}
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-x-4 top-20 z-40 bg-background-elevated/95 backdrop-blur-xl border border-border-color rounded-2xl p-4 shadow-2xl md:hidden"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-text-secondary cursor-pointer rounded-xl transition-all hover:text-text-primary hover:bg-background-secondary"
                  activeClass="!text-accent !bg-accent-dim"
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
