import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">

      {/* TOP SECTION */}
      <div className="footer-top">

        {/* BRAND */}
        <div className="footer-brand">
          <div className="footer-logo">
            MAZI<span>'S</span> TAXI
          </div>

          <p className="footer-tagline">
            Hereford's trusted taxi service — available 24/7 for local rides,
            airport transfers and long distance journeys.
          </p>

          {/* SOCIAL */}
          <div className="footer-social">

            <a
              href="https://www.facebook.com/tayyab.tayyab.9003"
              target="_blank"
              rel="noreferrer"
              className="social-icon facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/tayyabkhan682/"
              target="_blank"
              rel="noreferrer"
              className="social-icon instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://wa.me/447311694905"
              target="_blank"
              rel="noreferrer"
              className="social-icon whatsapp"
            >
              <FaWhatsapp />
            </a>

          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><Link to="/reserve">Reserve Now</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul>

            <li>
              <a
                href="tel:+447311694905"
                className="footer-contact-link"
              >
                <div className="footer-icon-wrap phone-wrap">
                  <FaPhone />
                </div>
                +44 7311 694905
              </a>
            </li>

            <li>
              <a
                href="https://wa.me/447311694905"
                target="_blank"
                rel="noreferrer"
                className="footer-contact-link"
              >
                <div className="footer-icon-wrap wa-wrap">
                  <FaWhatsapp />
                </div>
                WhatsApp Us
              </a>
            </li>

            <li className="footer-contact-link">
              <div className="footer-icon-wrap loc-wrap">
                <FaMapMarkerAlt />
              </div>
              <span>
                7 Wincanton Close,<br />
                Hereford, HR4 9TF
              </span>
            </li>

          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2025 Mazi's Taxi. All rights reserved.</p>
        <div className="footer-policy">
          <a href="#">Privacy Policy</a>
          <span>|</span>
          <a href="#">Terms & Conditions</a>
        </div>
      </div>

    </footer>
  )
}

export default Footer