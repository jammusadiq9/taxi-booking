import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

const Login = () => {

  const [formData, setFormData] = useState({
    email   : '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error,   setError  ] = useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await axios.post(
        'https://taxi-booking-backend-production.up.railway.app/api/admin/login',
        formData
      )

      // Token save karo
      localStorage.setItem('adminToken', res.data.token)

      // Dashboard pe jao
      navigate('/admin/dashboard')

    } catch (err) {
        console.log('Error:', err.response)
        setError(
          err.response?.data?.message || 'Something went wrong. Please try again.'
        )
      } finally {
      setLoading(false)
    }
  }

  return (
    <section className="login-page">

      <div className="login-box">

        {/* LOGO */}
        <div className="login-logo">
          RIDE<span>IN</span> TAXIS
        </div>

        <h2 className="login-title">Admin Login</h2>
        <p className="login-sub">
          Enter your credentials to access the dashboard
        </p>

        {/* ERROR */}
        {error && (
          <div className="login-error">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="login-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@ridein.com"
              required
            />
          </div>

          <div className="login-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password..."
              required
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>

        </form>

      </div>

    </section>
  )
}

export default Login