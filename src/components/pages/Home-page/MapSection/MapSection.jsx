import './MapSection.css'

const MapSection = () => {
  return (
    <section className="map-section" id="map">
      {/* HEADING */}
      <div className="map-heading">
        <p className="map-tag">Find Us</p>

        <h2 className="map-title">
          Based in <span>Hereford</span>
        </h2>

        <p className="map-sub">
          Proudly serving Hereford and all surrounding areas — 24 hours a day,
          7 days a week.
        </p>
      </div>

      {/* MAP + INFO */}
      <div className="map-container">
        {/* LEFT — INFO */}
        <div className="map-info">
          <div className="map-info-card">
            <div className="map-info-item">
              <div className="map-info-icon">📍</div>

              <div>
                <h4>Location</h4>
                <p>7 Wincanton Close,<br/>Hereford, HR4 9TF</p>
              </div>
            </div>

            <div className="map-info-item">
              <div className="map-info-icon">📞</div>

              <div>
                <h4>Phone</h4>
                <a href="tel:+447311694905">
                  +44 7311 694905
                </a>
              </div>
            </div>

            <div className="map-info-item">
              <div className="map-info-icon">💬</div>

              <div>
                <h4>WhatsApp</h4>

                <a
                  href="https://wa.me/447311694905"
                  target="_blank"
                  rel="noreferrer"
                >
                  Chat with us
                </a>
              </div>
            </div>

            <div className="map-info-item">
              <div className="map-info-icon">🕐</div>

              <div>
                <h4>Available</h4>
                <p>24 hours, 7 days a week</p>
              </div>
            </div>
          </div>

          <a
            href="/reserve"
            className="map-book-btn"
          >
            Book Now →
          </a>
        </div>

        {/* RIGHT — MAP */}
        <div className="map-embed">
        <iframe
  title="Tay's Taxi Location"
  src="https://maps.google.com/maps?q=7+Wincanton+Close+Hereford+HR4+9TF&output=embed"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
        </div>
      </div>
    </section>
  )
}

export default MapSection