import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './BookingDetail.css'

const BookingDetail = () => {

  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)

  const { id }   = useParams()
  const navigate = useNavigate()
  const token    = localStorage.getItem('adminToken')
  const config   = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    if (!token) { navigate('/admin/login'); return }
    fetchBooking()
  }, [])

  const fetchBooking = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/${id}`,
        config
      )
      setBooking(res.data.booking)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/bookings/${id}`,
        { status },
        config
      )
      fetchBooking()
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) return <div className="bd-loading">Loading...</div>
  if (!booking) return <div className="bd-loading">Booking not found</div>

  return (
    <div className="bd-wrap">

      {/* HEADER */}
      <div className="bd-header">
        <button
          className="bd-back"
          onClick={() => navigate('/admin/dashboard')}
        >
          ← Back to Dashboard
        </button>
        <div className="bd-logo">TAY'S TAXI — Admin</div>
        <button
          className="bd-logout"
          onClick={() => {
            localStorage.removeItem('adminToken')
            navigate('/admin/login')
          }}
        >
          Logout
        </button>
      </div>

      <div className="bd-body">

        {/* TOP */}
        <div className="bd-top">
          <div>
            <h2 className="bd-title">Booking Detail</h2>
            <p className="bd-date">
              Received: {new Date(booking.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="bd-top-right">
            <span className={`bd-status ${booking.status}`}>
              {booking.status}
            </span>
            <div className="bd-action-btns">
              {booking.status !== 'confirmed' && (
                <button
                  className="bd-btn green"
                  onClick={() => updateStatus('confirmed')}
                >
                  Confirm
                </button>
              )}
              {booking.status !== 'cancelled' && (
                <button
                  className="bd-btn yellow"
                  onClick={() => updateStatus('cancelled')}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="bd-grid">

          {/* CUSTOMER INFO */}
          <div className="bd-card">
            <h3 className="bd-card-title">Customer Information</h3>
            <div className="bd-rows">
              <div className="bd-row">
                <span className="bd-label">Full Name</span>
                <span className="bd-value">{booking.firstName} {booking.lastName}</span>
              </div>
              <div className="bd-row">
                <span className="bd-label">Phone</span>
                <span className="bd-value">{booking.phone}</span>
              </div>
              <div className="bd-row">
                <span className="bd-label">Email</span>
                <span className="bd-value">{booking.email || '—'}</span>
              </div>
            </div>
          </div>

          {/* JOURNEY INFO */}
          <div className="bd-card">
            <h3 className="bd-card-title">Journey Information</h3>
            <div className="bd-rows">
              <div className="bd-row">
                <span className="bd-label">Enquiry Type</span>
                <span className="bd-value">{booking.enquiryType}</span>
              </div>
              <div className="bd-row">
                <span className="bd-label">Date</span>
                <span className="bd-value">{booking.journeyDate}</span>
              </div>
              <div className="bd-row">
                <span className="bd-label">Time</span>
                <span className="bd-value">{booking.journeyTime}</span>
              </div>
              <div className="bd-row">
                <span className="bd-label">Passengers</span>
                <span className="bd-value">{booking.passengers}</span>
              </div>
            </div>
          </div>

          {/* ADDRESSES */}
          <div className="bd-card">
            <h3 className="bd-card-title">Addresses</h3>
            <div className="bd-rows">
              <div className="bd-row">
                <span className="bd-label">Pickup</span>
                <span className="bd-value">{booking.pickupAddress}</span>
              </div>
              <div className="bd-row">
                <span className="bd-label">Drop-off</span>
                <span className="bd-value">{booking.dropoffAddress}</span>
              </div>
              <div className="bd-row">
                <span className="bd-label">Additional Stop</span>
                <span className="bd-value">{booking.additionalStop || '—'}</span>
              </div>
            </div>
          </div>

          {/* EXTRA INFO */}
          <div className="bd-card">
            <h3 className="bd-card-title">Extra Information</h3>
            <div className="bd-rows">
              <div className="bd-row">
                <span className="bd-label">Return Journey</span>
                <span className="bd-value">{booking.returnJourney ? 'Yes' : 'No'}</span>
              </div>
              {booking.returnJourney && (
                <div className="bd-row">
                  <span className="bd-label">Return Details</span>
                  <span className="bd-value">{booking.returnDetails || '—'}</span>
                </div>
              )}
              <div className="bd-row">
                <span className="bd-label">Driver Note</span>
                <span className="bd-value">{booking.driverNote || '—'}</span>
              </div>
              <div className="bd-row">
                <span className="bd-label">Promo Code</span>
                <span className="bd-value">{booking.promoCode || '—'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BookingDetail