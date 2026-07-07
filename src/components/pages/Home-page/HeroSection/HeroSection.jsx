import { useState } from 'react'
import axios from 'axios'
import './HeroSection.css'
import taxiImg from '../../../../assets/why choose/taxi.png'

const HeroSection = () => {

  const [formData, setFormData] = useState({
    enquiryType   : 'Booking',
    journeyDate   : '',
    journeyTime   : '',
    passengers    : '1',
    pickupAddress : '',
    dropoffAddress: '',
    firstName     : '',
    lastName      : '',
    phone         : '',
    email         : ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError  ] = useState('')

  // ========================
  // INPUT CHANGE HANDLER
  // ========================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // ========================
  // FORM SUBMIT
  // ========================
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await axios.post('https://test.mondabrothers.com/api/bookings', formData)
      setSuccess(true)
      setFormData({
        enquiryType   : 'Booking',
        journeyDate   : '',
        journeyTime   : '',
        passengers    : '1',
        pickupAddress : '',
        dropoffAddress: '',
        firstName     : '',
        lastName      : '',
        phone         : '',
        email         : ''
      })
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="hero">

      {/* BACKGROUND */}
      <div className="hero-bg">
        <img src={taxiImg} alt="Taxi Hereford" />
        <div className="hero-overlay"></div>
      </div>

      {/* CONTENT */}
      <div className="hero-content">

        {/* LEFT */}
        <div className="hero-left">
          <div className="hero-tag">📍 Hereford, UK</div>
          <h1 className="hero-title">
            Hereford's <span>#1</span> <br />
            Trusted Taxi <br />
            Service
          </h1>
          <p className="hero-sub">
            Fast, reliable and affordable rides across Herefordshire.
            Airport transfers, local trips and long distance journeys —
            available <strong>24 hours, 7 days a week.</strong>
          </p>
          <div className="hero-badges">
            <div className="badge">✈ Airport Transfers</div>
            <div className="badge">🕐 24/7 Available</div>
            <div className="badge">👥 4 to 8 Seater</div>
            <div className="badge">✅ Fully Licensed</div>
          </div>
        </div>

        {/* RIGHT — FORM */}
        <div className="hero-right">
          <div className="form-box">
            <h3 className="form-title">Book Your Ride</h3>

            {/* SUCCESS MESSAGE */}
            {success && (
              <div className="form-success">
                ✅ Booking received! We will confirm shortly.
              </div>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <div className="form-error">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="form-row">
                <div className="form-group">
                  <label>Enquiry Type</label>
                  <select
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                  >
                    <option value="Booking">Booking</option>
                    <option value="Quotation">Quotation</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Passengers</label>
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Journey Date</label>
                  <input
                    type="date"
                    name="journeyDate"
                    value={formData.journeyDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Journey Time</label>
                  <input
                    type="time"
                    name="journeyTime"
                    value={formData.journeyTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Pickup Address</label>
                <input
                  type="text"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  placeholder="Enter pickup location..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Drop-off Address</label>
                <input
                  type="text"
                  name="dropoffAddress"
                  value={formData.dropoffAddress}
                  onChange={handleChange}
                  placeholder="Enter destination..."
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+44..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Book Now →'}
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HeroSection