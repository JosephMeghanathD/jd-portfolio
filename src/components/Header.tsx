import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { FiMoon, FiSun } from "react-icons/fi";
import { Link } from "react-scroll";
import DecryptedText from "./DecryptedText";
import { Logo } from "./Logo";

const navLinks = [
  { to: "hero", label: "Home" },
  { to: "skills", label: "Skills" },
  { to: "journey", label: "Journey" },
  { to: "projects", label: "Projects" },
  { to: "contact", label: "Contact" },
];

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-background-primary/50 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#hero" aria-label="Go to top">
          <Logo />
        </a>
        <h1 className="text-2xl font-bold text-text-primary">
          <DecryptedText text="Joseph D." />
        </h1>

        <nav className="hidden md:flex gap-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="text-text-secondary font-semibold cursor-pointer transition-colors hover:text-accent"
              activeClass="!text-accent"
            >
              {label}
            </Link>
          ))}
        </nav>

        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-full text-text-primary border border-border-color"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
        </motion.button>
      </div>
    </header>
  );
};
