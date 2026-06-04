import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './BookingDetail.css'
import { FaCheck, FaTimes, FaArrowLeft } from 'react-icons/fa'

const BookingDetail = () => {

  const [booking,          setBooking         ] = useState(null)
  const [loading,          setLoading         ] = useState(true)
  const [showCancelModal,  setShowCancelModal ] = useState(false)
  const [cancelReason,     setCancelReason    ] = useState('')

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
      const res = await axios.get(`https://test.mondabrothers.com/api/bookings/${id}`, config)
      setBooking(res.data.booking)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (status, reason = '') => {
    try {
      await axios.patch(
        `https://test.mondabrothers.com/api/bookings/${id}`,
        { status, cancelReason: reason },
        config
      )
      setShowCancelModal(false)
      setCancelReason('')
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
        <button className="bd-back" onClick={() => navigate('/admin/dashboard')} title="Back to Dashboard">
          <FaArrowLeft />
        </button>
        <div className="bd-logo">TAY'S TAXI — Admin</div>
        <button className="bd-logout" onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin/login') }}>
          Logout
        </button>
      </div>

      <div className="bd-body">

        {/* TOP */}
        <div className="bd-top">
          <div>
            <h2 className="bd-title">Booking Detail</h2>
            <p className="bd-date">Received: {new Date(booking.createdAt).toLocaleString()}</p>
          </div>
          <div className="bd-top-right">
            <span className={`bd-status ${booking.status}`}>{booking.status}</span>
            <div className="bd-action-btns">
              {booking.status !== 'confirmed' && (
                <button className="bd-btn green" onClick={() => updateStatus('confirmed')} title="Confirm Booking">
                  <FaCheck />
                </button>
              )}
              {booking.status !== 'cancelled' && (
                <button className="bd-btn yellow" onClick={() => setShowCancelModal(true)} title="Cancel Booking">
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="bd-grid">

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
              {booking.cancelReason && (
                <div className="bd-row">
                  <span className="bd-label">Cancel Reason</span>
                  <span className="bd-value" style={{ color: '#ef4444' }}>{booking.cancelReason}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* CANCEL MODAL */}
      {showCancelModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
        }}>
          <div style={{
            background: '#fff', borderRadius: '10px', padding: '24px',
            width: '360px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: '#111' }}>Cancel Booking</h3>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#666' }}>Reason for cancellation (customer ko email jayegi).</p>
            <textarea
              rows={3}
              placeholder="Enter reason..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              style={{
                width: '100%', padding: '10px', fontSize: '13px',
                border: '1px solid #ddd', borderRadius: '6px',
                resize: 'none', boxSizing: 'border-box'
              }}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setShowCancelModal(false); setCancelReason('') }}
                style={{ padding: '8px 16px', fontSize: '13px', background: '#eee', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                Back
              </button>
              <button
                onClick={() => updateStatus('cancelled', cancelReason)}
                style={{ padding: '8px 16px', fontSize: '13px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default BookingDetail