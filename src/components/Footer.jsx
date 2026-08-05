import { Link } from "react-router-dom";
import "./Footer.css";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Rooted</span>
          <p className="footer__tagline">
            Grow good, together — connecting Nigerian communities with the
            funding and hands they need.
          </p>
        </div>

        <nav className="footer__col" aria-label="Explore">
          <h4 className="footer__heading">Explore</h4>
          <Link to="/campaigns">Browse campaigns</Link>
          <Link to="/volunteer">Volunteer</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/about">About us</Link>
        </nav>

        <div className="footer__col">
          <h4 className="footer__heading">Contact</h4>
          <a href="mailto:hello@rooted.ng">hello@rooted.ng</a>
          <span className="footer__muted">Lagos, Nigeria</span>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Follow</h4>
          <div className="footer__social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              X
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>&copy; {currentYear} Rooted. All rights reserved.</span>
        <div className="footer__legal">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
