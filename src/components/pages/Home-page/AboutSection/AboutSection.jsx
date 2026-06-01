import './AboutSection.css'
import driverImg from '../../../../assets/taxi-driver.webp'

const AboutSection = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">

        {/* LEFT — IMAGE */}
        <div className="about-img-box">
          <img
            src={driverImg}
            alt="Professional Taxi Driver Hereford"
            loading="lazy"
          />
          <div className="about-img-overlay"></div>

          {/* BADGE ON IMAGE */}
          <div className="about-img-badge">
            <span className="badge-num">25+</span>
            <span className="badge-text">Years of Experience</span>
          </div>
        </div>

        {/* RIGHT — CONTENT */}
        <div className="about-content">

          <p className="about-tag">Who We Are</p>

          <h2 className="about-title">
            Hereford's Most <span>Trusted</span> Taxi Service
          </h2>

          <p className="about-desc">
            We are a professional, locally based taxi service proudly serving Hereford and the surrounding areas. With years of experience on the road, we have built a reputation for being reliable, punctual and always putting our passengers first.
          </p>

          <p className="about-desc">
            Whether you need a quick local ride, a smooth airport transfer or a comfortable long distance journey, we are here for you — 24 hours a day, 7 days a week. Our vehicles are clean, well-maintained and our driver is fully licensed, DBS checked and committed to getting you there safely.
          </p>

          <p className="about-desc">
            We take pride in offering a personal, friendly service that the big taxi companies simply cannot match. When you book with us, you are not just a number — you are a valued passenger and we will always go the extra mile for you.
          </p>

          {/* STATS */}
          <div className="about-stats">
            <div className="stat-box">
              <span className="stat-num">24/7</span>
              <span className="stat-label">Always Available</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">8+</span>
              <span className="stat-label">Airports Covered</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">100%</span>
              <span className="stat-label">Fully Licensed</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">4-8</span>
              <span className="stat-label">Seater Vehicles</span>
            </div>
          </div>

          {/* BUTTON */}
          <a href="/reserve" className="about-btn">
            Book Your Ride →
          </a>

        </div>
      </div>
    </section>
  )
}

export default AboutSection