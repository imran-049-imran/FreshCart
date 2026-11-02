import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './Home.css'

/* Adds the "in-view" class to every .reveal element when it scrolls into view */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* Counts up from 0 to `end` when scrolled into view */
function Counter({ end, suffix = '', decimals = 0 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    let frame
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const duration = 1800
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(end * eased)
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [end])

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

function Home() {
  const [showNotification, setShowNotification] = useState(false)
  const videoRef = useRef(null)

  useReveal()

  // Profile-saved notification
  useEffect(() => {
    const profileSavedMessage = sessionStorage.getItem('profileSavedMessage')
    if (!profileSavedMessage) return
    setShowNotification(true)
    sessionStorage.removeItem('profileSavedMessage')
    const timer = setTimeout(() => setShowNotification(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  // Video autoplay (separate effect so the notification early-return can't skip it)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay failed:', error)
      })
    }
  }, [])

  const categories = [
    {
      name: 'Vegetarian Delights',
      path: '/freshcart/veg',
      image: '🥗',
      description: 'Fresh plant-based meals',
      tag: 'Healthy'
    },
    {
      name: 'Non-Veg Specials',
      path: '/freshcart/non-veg',
      image: '🍗',
      description: 'Premium meat dishes',
      tag: 'Bestseller'
    },
    {
      name: 'Dairy & Desserts',
      path: '/freshcart/dairy',
      image: '🍦',
      description: 'Sweet treats & more',
      tag: 'Sweet'
    }
  ]

  const popular = [
    { emoji: '🍛', name: 'Paneer Butter Masala', price: 249, rating: 4.8, path: '/freshcart/veg' },
    { emoji: '🍗', name: 'Butter Chicken', price: 299, rating: 4.9, path: '/freshcart/non-veg' },
    { emoji: '🥘', name: 'Chicken Biryani', price: 279, rating: 4.7, path: '/freshcart/non-veg' },
    { emoji: '🍨', name: 'Gulab Jamun Sundae', price: 129, rating: 4.6, path: '/freshcart/dairy' }
  ]

  const steps = [
    { icon: '📱', title: 'Choose Your Meal', desc: 'Browse veg, non-veg and dessert menus.' },
    { icon: '🛒', title: 'Add to Cart', desc: 'Customise your order and pay securely.' },
    { icon: '🚀', title: 'Fast Delivery', desc: 'Hot and fresh at your door in 30 minutes.' }
  ]

  const testimonials = [
    {
      name: 'Aarav S.',
      text: 'Tastes exactly like a restaurant, and it arrived piping hot. The biryani is unreal!',
      avatar: '🧑'
    },
    {
      name: 'Priya M.',
      text: 'Super fast delivery and the veg menu is fantastic. My weekly go-to now.',
      avatar: '👩'
    },
    {
      name: 'Rohan K.',
      text: 'Smooth checkout, great packaging, and the desserts are the best in the city.',
      avatar: '👨'
    }
  ]

  const marqueeItems = [
    '🍕 Pizza', '🍔 Burgers', '🍛 Curries', '🥗 Salads', '🍗 Grills',
    '🍜 Noodles', '🍰 Cakes', '🍦 Ice Cream', '🥘 Biryani', '🌮 Wraps'
  ]

  const floaters = [
    { e: '🍕', style: { top: '14%', left: '8%', animationDelay: '0s' } },
    { e: '🥗', style: { top: '22%', right: '10%', animationDelay: '1s' } },
    { e: '🍔', style: { bottom: '26%', left: '12%', animationDelay: '2s' } },
    { e: '🍗', style: { bottom: '20%', right: '14%', animationDelay: '1.5s' } },
    { e: '🍦', style: { top: '55%', left: '4%', animationDelay: '0.5s' } },
    { e: '🍛', style: { top: '48%', right: '5%', animationDelay: '2.5s' } }
  ]

  return (
    <div className="home-container">
      {/* Profile Saved Notification */}
      {showNotification && (
        <div className="notification-banner success">
          <div className="notification-content">
            <span className="notification-icon">✓</span>
            <span className="notification-text">Profile updated successfully!</span>
            <button
              className="notification-close"
              onClick={() => setShowNotification(false)}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ============ HERO ============ */}
      <section className="video-hero-section">
        <div className="video-background">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="background-video"
          >
            <source src="/bag.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>

        {/* Floating food */}
        <div className="floaters" aria-hidden="true">
          {floaters.map((f, i) => (
            <span key={i} className="floater" style={f.style}>
              {f.e}
            </span>
          ))}
        </div>

        <div className="video-hero-content">
          <span className="hero-badge">
            <span className="pulse-dot"></span> Now delivering in 30 minutes
          </span>
          <h1 className="video-hero-title">
            Restaurant Quality Food{' '}
            <span className="video-hero-highlight">Delivered</span>
          </h1>
          <p className="video-hero-subtitle">
            Experience chef-crafted meals delivered hot and fresh to your doorstep.
            From gourmet dishes to comfort food.
          </p>
          <div className="hero-actions">
            <Link to="/freshcart/veg" className="video-hero-button">
              Order Now
              <span className="btn-arrow">→</span>
            </Link>
            <a href="#menu" className="hero-ghost-button">
              Explore Menu
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>4.8★</strong>
              <span>Avg. rating</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <strong>30 min</strong>
              <span>Delivery</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <strong>100+</strong>
              <span>Dishes</span>
            </div>
          </div>
        </div>

        <a href="#menu" className="scroll-indicator" aria-label="Scroll down">
          <span className="scroll-mouse">
            <span className="scroll-wheel"></span>
          </span>
        </a>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="marquee">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ============ CATEGORIES ============ */}
      <section id="menu" className="categories-section">
        <span className="eyebrow reveal">What are you craving?</span>
        <h2 className="section-title reveal">Explore Our Menu</h2>
        <div className="home-category-grid">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="home-category-card reveal"
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <span className="category-tag">{category.tag}</span>
              <div className="home-category-icon">{category.image}</div>
              <h3 className="home-category-title">{category.name}</h3>
              <p className="home-category-desc">{category.description}</p>
              <span className="home-category-link">
                Explore <span className="link-arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ POPULAR ============ */}
      <section className="popular-section">
        <span className="eyebrow reveal">Customer favourites</span>
        <h2 className="section-title reveal">Popular Right Now</h2>
        <div className="popular-grid">
          {popular.map((dish, i) => (
            <Link
              key={dish.name}
              to={dish.path}
              className="dish-card reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="dish-visual">
                <span className="dish-emoji">{dish.emoji}</span>
                <span className="dish-rating">⭐ {dish.rating}</span>
              </div>
              <div className="dish-body">
                <h3 className="dish-name">{dish.name}</h3>
                <div className="dish-row">
                  <span className="dish-price">₹{dish.price}</span>
                  <span className="dish-add">+ Add</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="steps-section">
        <span className="eyebrow reveal">Simple &amp; quick</span>
        <h2 className="section-title reveal">How It Works</h2>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="step-card reveal"
              style={{ transitionDelay: `${i * 140}ms` }}
            >
              <div className="step-number">{i + 1}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="features-section">
        <div className="home-features-grid">
          <div className="home-feature-item reveal">
            <div className="home-feature-icon">
              <span>🚀</span>
            </div>
            <h3 className="home-feature-title">Fast Delivery</h3>
            <p className="home-feature-desc">30-minute delivery</p>
          </div>
          <div className="home-feature-item reveal" style={{ transitionDelay: '120ms' }}>
            <div className="home-feature-icon">
              <span>👨‍🍳</span>
            </div>
            <h3 className="home-feature-title">Chef Crafted</h3>
            <p className="home-feature-desc">Restaurant quality meals</p>
          </div>
          <div className="home-feature-item reveal" style={{ transitionDelay: '240ms' }}>
            <div className="home-feature-icon">
              <span>💳</span>
            </div>
            <h3 className="home-feature-title">Secure Payment</h3>
            <p className="home-feature-desc">100% secure transactions</p>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-box reveal">
            <div className="stat-number"><Counter end={10000} suffix="+" /></div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-box reveal" style={{ transitionDelay: '100ms' }}>
            <div className="stat-number"><Counter end={100} suffix="+" /></div>
            <div className="stat-label">Dishes on Menu</div>
          </div>
          <div className="stat-box reveal" style={{ transitionDelay: '200ms' }}>
            <div className="stat-number"><Counter end={30} suffix=" min" /></div>
            <div className="stat-label">Average Delivery</div>
          </div>
          <div className="stat-box reveal" style={{ transitionDelay: '300ms' }}>
            <div className="stat-number"><Counter end={4.8} decimals={1} suffix="★" /></div>
            <div className="stat-label">Customer Rating</div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="testimonials-section">
        <span className="eyebrow reveal">Love from our customers</span>
        <h2 className="section-title reveal">What People Say</h2>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="testimonial-card reveal"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">“{t.text}”</p>
              <div className="testimonial-author">
                <span className="testimonial-avatar">{t.avatar}</span>
                <span className="testimonial-name">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="cta-section">
        <div className="cta-banner reveal">
          <span className="cta-bubble cta-bubble-1"></span>
          <span className="cta-bubble cta-bubble-2"></span>
          <h2 className="cta-title">Hungry? Your meal is 30 minutes away.</h2>
          <p className="cta-text">Order now and taste restaurant quality at home.</p>
          <Link to="/freshcart/veg" className="cta-button">
            Start Ordering →
          </Link>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="home-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">FreshCart</h3>
              <p className="footer-desc">
                Delivering restaurant-quality meals to your doorstep. Fresh, fast, and delicious.
              </p>
              <div className="social-links">
                <a
                  href="https://github.com/imran-049-imran"
                  className="social-link"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="social-icon">🐙</span>
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/imran-attar-703637373/"
                  className="social-link"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="social-icon">💼</span>
                  LinkedIn
                </a>
                <a
                  href="mailto:attarimran782@gmail.com"
                  className="social-link"
                  aria-label="Email"
                >
                  <span className="social-icon">📧</span>
                  Email
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h4 className="footer-subtitle">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/freshcart/veg">Vegetarian</Link></li>
                <li><Link to="/freshcart/non-veg">Non-Veg</Link></li>
                <li><Link to="/freshcart/dairy">Dairy</Link></li>
                <li><Link to="/freshcart/cart">Cart</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-subtitle">Support</h4>
              <ul className="footer-links">
                <li><a href="/help">Help Center</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/careers">Careers</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-subtitle">Contact Info</h4>
              <div className="contact-info">
                <p>📞 +91 9503118284</p>
                <p>📧 contact@freshcart.com</p>
                <p>📍 Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 FreshCart. All rights reserved. | Crafted with ❤️ by Imran Attar</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
