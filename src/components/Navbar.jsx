// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import ProfileSettings from './ProfileSettings';
import './Navbar.css';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/veg', label: 'Vegetarian', icon: '🥗' },
  { to: '/non-veg', label: 'Non-Veg', icon: '🍗' },
  { to: '/dairy', label: 'Desserts', icon: '🍦' },
  { to: '/snacks', label: 'Snacks', icon: '🍟' },
  { to: '/beverages', label: 'Beverages', icon: '🥤' }
];

function Navbar() {
  const location = useLocation();
  const { totalItems } = useSelector(state => state.cart);
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Shrink + deepen shadow after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock page scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleProfileClick = () => {
    setMenuOpen(false);
    if (isAuthenticated) {
      setShowProfileSettings(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleProfileClose = () => {
    setShowProfileSettings(false);
  };

  return (
    <>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      <ProfileSettings
        isOpen={showProfileSettings}
        onClose={handleProfileClose}
      />

      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="nav-brand">
          <Link to="/">
            <span className="brand-icon">🛒</span>
            <span className="brand-text">FreshCart</span>
          </Link>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link ${isActive(item.to) ? 'active' : ''}`}
              style={{ '--i': i }}
            >
              <span className="link-emoji">{item.icon}</span>
              {item.label}
            </Link>
          ))}

          {/* Cart Link with Count */}
          <Link
            to="/cart"
            className={`nav-link cart-link ${isActive('/cart') ? 'active' : ''}`}
            style={{ '--i': NAV_ITEMS.length }}
          >
            <span className="cart-icon">🛒</span>
            Cart
            {totalItems > 0 && (
              <span key={totalItems} className="cart-count">{totalItems}</span>
            )}
          </Link>

          {/* Profile / Login */}
          <button
            onClick={handleProfileClick}
            className={`nav-link profile-btn ${isAuthenticated ? 'authenticated' : ''}`}
            style={{ '--i': NAV_ITEMS.length + 1 }}
          >
            {isAuthenticated ? (
              <>
                <span className="profile-icon">👤</span>
                Profile
              </>
            ) : (
              <>
                <span className="profile-icon">🔐</span>
                Login
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      <div
        className={`nav-backdrop ${menuOpen ? 'show' : ''}`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </>
  );
}

export default Navbar;
