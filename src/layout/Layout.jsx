import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { FaPhone } from 'react-icons/fa'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

import './Layout.css'

const Layout = () => {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
      {/* CALL BUTTON */}

 <a href="tel:+447311694905"
  className="call-float"
  title="Call Us"
>
  <FaPhone />
</a>

      {/* WHATSAPP FLOAT BUTTON */}
      <a
        href="https://wa.me/447311694905"
        target="_blank"
        rel="noreferrer"
        className="wa-float"
      >
        <FaWhatsapp />
      </a>

      {/* SCROLL TO TOP */}
      {showScroll && (
        <button
          className="scroll-top"
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}
    </>
  )
}

export default Layout