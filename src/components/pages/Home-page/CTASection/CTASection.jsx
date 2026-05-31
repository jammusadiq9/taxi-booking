import { Link } from 'react-router-dom'
import './CTASection.css'

const CTASection = () => {
  return (
    <section className="cta">
      <div className="cta-container">

        {/* LEFT */}
        <div className="cta-left">
          <h2 className="cta-title">
            Ready to Book Your Ride?
          </h2>
          <p className="cta-sub">
            Available 24/7 — Call us or book online. Fast, reliable and affordable taxi service across Herefordshire.
          </p>
        </div>

        {/* RIGHT */}
        <div className="cta-right">
          <Link to="/reserve" className="cta-btn-primary">
            Book Now →
          </Link>
          <a href="tel:+447311694905" className="cta-btn-secondary">
            Call Us
          </a>
        </div>

      </div>
    </section>
  )
}

export default CTASection