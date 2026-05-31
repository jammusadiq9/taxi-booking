import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // ========================
  // SCROLL TO SECTION
  // ========================
  const handleScroll = (sectionId) => {
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate('/')

      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    }
  }

  // ========================
  // HOME CLICK
  // ========================
  const handleHome = () => {
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      navigate('/')

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }, 100)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        TAY<span>'S</span> TAXI
      </div>

      <ul className="navbar-links">
        <li>
          <a
            onClick={handleHome}
            style={{ cursor: 'pointer' }}
          >
            Home
          </a>
        </li>

        <li>
          <a
            onClick={() => handleScroll('services')}
            style={{ cursor: 'pointer' }}
          >
            Services
          </a>
        </li>

        <li>
          <a
            onClick={() => handleScroll('about')}
            style={{ cursor: 'pointer' }}
          >
            About
          </a>
        </li>

        <li>
          <Link to="/reserve">Reserve Now</Link>
        </li>

        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>

      <div className="navbar-right">
        <a
          href="https://wa.me/447311694905"
          target="_blank"
          rel="noreferrer"
          className="btn-whatsapp"
        >
          WhatsApp
        </a>

        <a
          href="tel:+447311694905"
          className="btn-phone"
        >
          +44 7311 694905
        </a>
      </div>
    </nav>
  )
}

export default Navbar