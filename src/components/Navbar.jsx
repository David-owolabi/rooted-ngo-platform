import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu whenever the viewport grows back past the
  // breakpoint, so it doesn't stay stuck open if someone resizes/rotates.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 720) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          ROOTED NGO PLATFORM
        </Link>

        <nav className={`navbar__links ${isMenuOpen ? "navbar__links--open" : ""}`}>
          <Link to="/campaigns" onClick={closeMenu}>Campaigns</Link>
          <Link to="/volunteer" onClick={closeMenu}>Volunteer</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
        </nav>

        <Link to="/donate" className="btn btn-accent navbar__donate">
          Donate now
        </Link>

        <button
          type="button"
          className={`navbar__hamburger ${isMenuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="navbar-links"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="navbar__hamburger-bar"></div>
          <div className="navbar__hamburger-bar"></div>
          <div className="navbar__hamburger-bar"></div>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
