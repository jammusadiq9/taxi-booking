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
  const [cancelInfo,   setCancelInfo  ] = useState({ id: null, reason: '' })

  const navigate = useNavigate()
  const token = localStorage.getItem('adminToken')
  const config = { headers: { Authorization: `Bearer ${token}` } }

  const fetchBookings = async () => {
    try {
      const url = statusFilter
        ? `https://test.mondabrothers.com/api/bookings?status=${statusFilter}`
        : `https://test.mondabrothers.com/api/bookings`
      const res = await axios.get(url, config)
      setBookings(res.data.bookings)
    } catch (err) { console.log(err) }
  }

  const fetchContacts = async () => {
    try {
      const res = await axios.get('https://test.mondabrothers.com/api/contact', config)
      setContacts(res.data.contacts)
    } catch (err) { console.log(err) }
    finally { setLoading(false) }
  }

  useEffect(() => {
    if (!token) { navigate('/admin/login'); return }
    fetchBookings()
    fetchContacts()
  }, [statusFilter])

  const updateStatus = async (id, status, reason = '') => {
    try {
      await axios.patch(
        `https://test.mondabrothers.com/api/bookings/${id}`,
        { status, cancelReason: reason },
        config
      )
      setCancelInfo({ id: null, reason: '' })
      fetchBookings()
    } catch (err) { console.log(err) }
  }

  const deleteBooking = async (id) => {
    if (!window.confirm('Delete this booking?')) return
    try {
      await axios.delete(`https://test.mondabrothers.com/api/bookings/${id}`, config)
      fetchBookings()
    } catch (err) { console.log(err) }
  }

  const updateContactStatus = async (id, status) => {
    try {
      await axios.patch(`https://test.mondabrothers.com/api/contact/${id}`, { status }, config)
      fetchContacts()
    } catch (err) { console.log(err) }
  }

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this message?')) return
    try {
      await axios.delete(`https://test.mondabrothers.com/api/contact/${id}`, config)
      fetchContacts()
    } catch (err) { console.log(err) }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  const total     = bookings.length
  const pending   = bookings.filter(b => b.status === 'pending').length
  const confirmed = bookings.filter(b => b.status === 'confirmed').length
  const cancelled = bookings.filter(b => b.status === 'cancelled').length
  const unread    = contacts.filter(c => c.status === 'unread').length

  if (loading) return <div className="dashboard-loading">Loading...</div>

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dash-header">
        <div className="dash-logo">TAY<span>'S</span> TAXI</div>
        <div className="dash-header-right">
          <span className="dash-admin">Admin Panel</span>
          <button className="dash-logout" onClick={logout}>Logout</button>
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
          <button className={`dash-tab ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            Bookings ({total})
          </button>
          <button className={`dash-tab ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
            Messages ({contacts.length})
            {unread > 0 && <span className="unread-badge">{unread}</span>}
          </button>
        </div>

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="dash-section">
            <div className="dash-filter">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Bookings</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

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
                    <tr><td colSpan="9" className="no-data">No bookings found</td></tr>
                  ) : (
                    bookings.map((b) => (
                      <tr key={b._id}>
                        <td data-label="Customer">{b.firstName} {b.lastName}</td>
                        <td data-label="Phone">{b.phone}</td>
                        <td data-label="Pickup">{b.pickupAddress}</td>
                        <td data-label="Dropoff">{b.dropoffAddress}</td>
                        <td data-label="Date">{b.journeyDate}</td>
                        <td data-label="Time">{b.journeyTime}</td>
                        <td data-label="Passengers">{b.passengers}</td>
                        <td data-label="Status">
                          <span className={`status-badge ${b.status}`}>{b.status}</span>
                        </td>
                        <td data-label="Actions">
                          <div className="action-btns">

                            {/* VIEW */}
                            <button className="icon-btn btn-view" onClick={() => navigate(`/admin/booking/${b._id}`)}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                              <span className="icon-tooltip">View</span>
                            </button>

                            {/* CONFIRM */}
                            {b.status !== 'confirmed' && (
                              <button className="icon-btn btn-confirm" onClick={() => updateStatus(b._id, 'confirmed')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                <span className="icon-tooltip">Confirm</span>
                              </button>
                            )}

                            {/* CANCEL */}
                            {b.status !== 'cancelled' && (
                              <>
                                <button className="icon-btn btn-cancel" onClick={() => setCancelInfo({ id: b._id, reason: '' })}>
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                  </svg>
                                  <span className="icon-tooltip">Cancel</span>
                                </button>

                                {cancelInfo.id === b._id && (
                                  <div style={{ marginTop: '8px', display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <input
                                      type="text"
                                      placeholder="Reason..."
                                      value={cancelInfo.reason}
                                      onChange={(e) => setCancelInfo({ ...cancelInfo, reason: e.target.value })}
                                      style={{ fontSize: '12px', padding: '4px 8px', border: '1px solid #ddd', borderRadius: '4px', width: '150px' }}
                                    />
                                    <button
                                      onClick={() => updateStatus(b._id, 'cancelled', cancelInfo.reason)}
                                      style={{ fontSize: '12px', padding: '4px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                      Send
                                    </button>
                                    <button
                                      onClick={() => setCancelInfo({ id: null, reason: '' })}
                                      style={{ fontSize: '12px', padding: '4px 8px', background: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                      ✕
                                    </button>
                                  </div>
                                )}
                              </>
                            )}

                            {/* DELETE */}
                            <button className="icon-btn btn-delete" onClick={() => deleteBooking(b._id)}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                <path d="M10 11v6M14 11v6"/>
                                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                              </svg>
                              <span className="icon-tooltip">Delete</span>
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
                    <tr><td colSpan="6" className="no-data">No messages found</td></tr>
                  ) : (
                    contacts.map((c) => (
                      <tr key={c._id} className={c.status === 'unread' ? 'unread-row' : ''}>
                        <td data-label="Name">{c.name}</td>
                        <td data-label="Email">{c.email}</td>
                        <td data-label="Message" className="msg-text">{c.message}</td>
                        <td data-label="Status">
                          <span className={`status-badge ${c.status}`}>{c.status}</span>
                        </td>
                        <td data-label="Date">{new Date(c.createdAt).toLocaleDateString()}</td>
                        <td data-label="Actions">
                          <div className="action-btns">
                            {c.status === 'unread' ? (
                              <button className="icon-btn btn-confirm" onClick={() => updateContactStatus(c._id, 'read')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                  <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                                <span className="icon-tooltip">Mark Read</span>
                              </button>
                            ) : (
                              <button className="icon-btn btn-cancel" onClick={() => updateContactStatus(c._id, 'unread')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                                </svg>
                                <span className="icon-tooltip">Mark Unread</span>
                              </button>
                            )}
                            <button className="icon-btn btn-delete" onClick={() => deleteContact(c._id)}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                <path d="M10 11v6M14 11v6"/>
                                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                              </svg>
                              <span className="icon-tooltip">Delete</span>
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