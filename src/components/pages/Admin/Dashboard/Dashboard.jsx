import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Dashboard.css'

const Dashboard = () => {

  const [bookings,     setBookings    ] = useState([])
  const [contacts,     setContacts    ] = useState([])
  const [activeTab,    setActiveTab   ] = useState('bookings')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading,      setLoading     ] = useState(true)

  const navigate = useNavigate()

  const token = localStorage.getItem('adminToken')

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  // ========================
  // FETCH BOOKINGS
  // ========================
  const fetchBookings = async () => {
    try {
      const url = statusFilter
        ? `https://taxi-booking-backend-production.up.railway.app/api/bookings?status=${statusFilter}`
        : `https://taxi-booking-backend-production.up.railway.app/api/bookings`

      const res = await axios.get(url, config)
      setBookings(res.data.bookings)
    } catch (err) {
      console.log(err)
    }
  }

  // ========================
  // FETCH CONTACTS
  // ========================
  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        'https://taxi-booking-backend-production.up.railway.app/api/contact',
        config
      )
      setContacts(res.data.contacts)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchBookings()
    fetchContacts()
  }, [statusFilter])

  // ========================
  // UPDATE BOOKING STATUS
  // ========================
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `https://taxi-booking-backend-production.up.railway.app/api/bookings/${id}`,
        { status },
        config
      )
      fetchBookings()
    } catch (err) {
      console.log(err)
    }
  }

  // ========================
  // DELETE BOOKING
  // ========================
  const deleteBooking = async (id) => {
    if (!window.confirm('Delete this booking?')) return
    try {
      await axios.delete(
        `https://taxi-booking-backend-production.up.railway.app/api/bookings/${id}`,
        config
      )
      fetchBookings()
    } catch (err) {
      console.log(err)
    }
  }

  // ========================
  // UPDATE CONTACT STATUS
  // ========================
  const updateContactStatus = async (id, status) => {
    try {
      await axios.patch(
        `https://taxi-booking-backend-production.up.railway.app/api/contact/${id}`,
        { status },
        config
      )
      fetchContacts()
    } catch (err) {
      console.log(err)
    }
  }

  // ========================
  // DELETE CONTACT
  // ========================
  const deleteContact = async (id) => {
    if (!window.confirm('Delete this message?')) return
    try {
      await axios.delete(
        `https://taxi-booking-backend-production.up.railway.app/api/contact/${id}`,
        config
      )
      fetchContacts()
    } catch (err) {
      console.log(err)
    }
  }

  // ========================
  // LOGOUT
  // ========================
  const logout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  // ========================
  // STATS
  // ========================
  const total     = bookings.length
  const pending   = bookings.filter(b => b.status === 'pending').length
  const confirmed = bookings.filter(b => b.status === 'confirmed').length
  const cancelled = bookings.filter(b => b.status === 'cancelled').length
  const unread    = contacts.filter(c => c.status === 'unread').length

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading...
      </div>
    )
  }

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dash-header">
        <div className="dash-logo">
          TAY<span>'S</span> TAXI
        </div>
        <div className="dash-header-right">
          <span className="dash-admin">Admin Panel</span>
          <button className="dash-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dash-content">

        {/* STATS */}
        <div className="dash-stats">
          <div className="stat-card total">
            <div className="stat-num">{total}</div>
            <div className="stat-label">Total Bookings</div>
          </div>
          <div className="stat-card pending">
            <div className="stat-num">{pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card confirmed">
            <div className="stat-num">{confirmed}</div>
            <div className="stat-label">Confirmed</div>
          </div>
          <div className="stat-card cancelled">
            <div className="stat-num">{cancelled}</div>
            <div className="stat-label">Cancelled</div>
          </div>
          <div className="stat-card unread">
            <div className="stat-num">{unread}</div>
            <div className="stat-label">Unread Messages</div>
          </div>
        </div>

        {/* TABS */}
        <div className="dash-tabs">
          <button
            className={`dash-tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings ({total})
          </button>
          <button
            className={`dash-tab ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages ({contacts.length})
            {unread > 0 && (
              <span className="unread-badge">{unread}</span>
            )}
          </button>
        </div>

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="dash-section">

            {/* FILTER */}
            <div className="dash-filter">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Bookings</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* TABLE */}
            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Pickup</th>
                    <th>Dropoff</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Passengers</th>
                    <th>Status</th>
                    <th>Actions</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="no-data">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                    bookings.map((b) => (
                      <tr key={b._id}>
                        <td>{b.firstName} {b.lastName}</td>
                        <td>{b.phone}</td>
                        <td>{b.pickupAddress}</td>
                        <td>{b.dropoffAddress}</td>
                        <td>{b.journeyDate}</td>
                        <td>{b.journeyTime}</td>
                        <td>{b.passengers}</td>
                        <td>
                          <span className={`status-badge ${b.status}`}>
                            {b.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-btns">

                          <button
      className="btn-view"
      onClick={() => navigate(`/admin/booking/${b._id}`)}
    >
      View
    </button>
                            {b.status !== 'confirmed' && (
                              <button
                                className="btn-confirm"
                                onClick={() => updateStatus(b._id, 'confirmed')}
                              >
                                Confirm
                              </button>
                            )}
                            {b.status !== 'cancelled' && (
                              <button
                                className="btn-cancel"
                                onClick={() => updateStatus(b._id, 'cancelled')}
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              className="btn-delete"
                              onClick={() => deleteBooking(b._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="dash-section">
            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="no-data">
                        No messages found
                      </td>
                    </tr>
                  ) : (
                    contacts.map((c) => (
                      <tr
                        key={c._id}
                        className={c.status === 'unread' ? 'unread-row' : ''}
                      >
                        <td>{c.name}</td>
                        <td>{c.email}</td>
                        <td className="msg-text">{c.message}</td>
                        <td>
                          <span className={`status-badge ${c.status}`}>
                            {c.status}
                          </span>
                        </td>
                        <td>
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="action-btns">
                            {c.status === 'unread' ? (
                              <button
                                className="btn-confirm"
                                onClick={() => updateContactStatus(c._id, 'read')}
                              >
                                Mark Read
                              </button>
                            ) : (
                              <button
                                className="btn-cancel"
                                onClick={() => updateContactStatus(c._id, 'unread')}
                              >
                                Mark Unread
                              </button>
                            )}
                            <button
                              className="btn-delete"
                              onClick={() => deleteContact(c._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard