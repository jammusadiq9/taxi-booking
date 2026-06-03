import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'

import Home from './components/pages/Home-page/Home'
import Reserve from './components/pages/Reserve-page/Reserve'
import Contact from './components/pages/Contact-us/Contact-us.jsx'

import Login from './components/pages/Admin/Login/Login'
import Dashboard from './components/pages/Admin/Dashboard/Dashboard'
import BookingDetail from './components/pages/Admin/BookingDetail/BookingDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Website Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin Routes - No Layout */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/booking/:id" element={<BookingDetail />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App