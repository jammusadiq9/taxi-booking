import { useState } from 'react'
import axios from 'axios'
import './Reserve.css'

const Reserve = () => {

  const [formData, setFormData] = useState({
    enquiryType   : 'Booking',
    journeyDate   : '',
    journeyTime   : '',
    passengers    : '1',
    pickupAddress : '',
    dropoffAddress: '',
    additionalStop: '',
    returnJourney : false,
    returnDetails : '',
    firstName     : '',
    lastName      : '',
    phone         : '',
    email         : '',
    driverNote    : '',
    promoCode     : ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError  ] = useState('')

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox'
      ? e.target.checked
      : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await axios.post('https://taxi-booking-backend-production.up.railway.app/api/bookings', formData)
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="reserve">

      {/* HEADING */}
      <div className="reserve-heading">
        <p className="reserve-tag">Book A Ride</p>
        <h2 className="reserve-title">
          Reserve Your <span>Taxi</span>
        </h2>
        <p className="reserve-sub">
          Fill in your journey details below and we will confirm your booking as soon as possible.
        </p>
      </div>

      {/* FORM BOX */}
      <div className="reserve-form-box">

        {/* SUCCESS */}
        {success && (
          <div className="reserve-success">
            ✅ Booking received! We will be in touch shortly to confirm your ride.
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="reserve-error">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* ROW 1 */}
          <div className="reserve-row">
            <div className="reserve-group">
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
            <div className="reserve-group">
              <label>Passengers</label>
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
              >
                {[1,2,3,4,5,6,7,8].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="reserve-row">
            <div className="reserve-group">
              <label>Journey Date</label>
              <input
                type="date"
                name="journeyDate"
                value={formData.journeyDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="reserve-group">
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

          {/* PICKUP */}
          <div className="reserve-group">
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

          {/* ADDITIONAL STOP */}
          <div className="reserve-group">
            <label>Additional Stop (Optional)</label>
            <input
              type="text"
              name="additionalStop"
              value={formData.additionalStop}
              onChange={handleChange}
              placeholder="Any extra stop along the way..."
            />
          </div>

          {/* DROPOFF */}
          <div className="reserve-group">
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

          {/* RETURN JOURNEY */}
          <div className="reserve-group reserve-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="returnJourney"
                checked={formData.returnJourney}
                onChange={handleChange}
              />
              Return Journey?
            </label>
          </div>

          {/* RETURN DETAILS */}
          {formData.returnJourney && (
            <div className="reserve-group">
              <label>Return Journey Details</label>
              <input
                type="text"
                name="returnDetails"
                value={formData.returnDetails}
                onChange={handleChange}
                placeholder="Return date, time and details..."
              />
            </div>
          )}

          {/* ROW 3 */}
          <div className="reserve-row">
            <div className="reserve-group">
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
            <div className="reserve-group">
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

          {/* ROW 4 */}
          <div className="reserve-row">
            <div className="reserve-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+44..."
                required
              />
            </div>
            <div className="reserve-group">
              <label>Email (Optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* DRIVER NOTE */}
          <div className="reserve-group">
            <label>Driver Note / Special Request</label>
            <textarea
              name="driverNote"
              value={formData.driverNote}
              onChange={handleChange}
              placeholder="Any special requests or notes for the driver..."
              rows={3}
            />
          </div>

          {/* PROMO CODE */}
          <div className="reserve-group">
            <label>Promo / Discount Code (Optional)</label>
            <input
              type="text"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleChange}
              placeholder="Enter promo code..."
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="reserve-submit"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Submit Booking →'}
          </button>

        </form>
      </div>
    </section>
  )
}

export default Reserve