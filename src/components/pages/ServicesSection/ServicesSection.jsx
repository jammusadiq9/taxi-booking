import './ServicesSection.css'
import airportImg   from '../../../assets/aitport.webp'
import trainImg     from '../../../assets/train.webp'
import hospitalImg  from '../../../assets/hospi.webp'
import busImg       from '../../../assets/bus.webp'
import corporateImg from '../../../assets/cor.jpg'
import longImg      from '../../../assets/highway.webp'
import eventImg     from '../../../assets/event.webp'
import groupImg     from '../../../assets/minibus.webp'


const services = [
    {
      id    : 1,
      image : airportImg,
      title : 'Airport Transfers',
      desc  : 'Stress-free airport transfers to and from all major UK airports including Heathrow, Gatwick, Birmingham and Bristol. We track your flight in real time so you never have to worry about delays — we will always be there waiting for you.'
    },
    {
      id    : 2,
      image : trainImg,
      title : 'Train Station Taxis',
      desc  : 'Need a ride to or from Hereford Train Station? We provide prompt, comfortable pickups and drop-offs at any time of day or night — so you never miss your train or wait around after a long journey.'
    },
    {
      id    : 3,
      image : hospitalImg,
      title : 'Hospital Taxis',
      desc  : 'We understand that hospital visits can be stressful. Our caring and patient drivers provide safe, comfortable transport to Hereford County Hospital and all surrounding medical centres — with your comfort as our priority.'
    },
    {
      id    : 4,
      image : busImg,
      title : 'Bus Station Taxis',
      desc  : 'Arriving or departing from Hereford Bus Station? Let us handle the journey for you. We offer quick, reliable and affordable connections so you can travel with complete peace of mind.'
    },
    {
      id    : 5,
      image : corporateImg,
      title : 'Corporate Services',
      desc  : 'Make the right impression with our professional corporate travel service. Whether it is client meetings, airport runs or daily commutes, we provide smart, punctual and discreet transport tailored to your business needs.'
    },
    {
      id    : 6,
      image : longImg,
      title : 'Long Distance',
      desc  : 'Planning a long journey across the UK? Sit back, relax and enjoy a smooth, comfortable ride in one of our well-maintained vehicles. We offer competitive fixed rates with no hidden charges — just great service from start to finish.'
    },
    {
      id    : 7,
      image : eventImg,
      title : 'Event Transfers',
      desc  : 'Heading to a wedding, concert, festival or special occasion? We will get you there and back in style and comfort. Our event transfer service ensures you arrive relaxed, on time and ready to enjoy your special day.'
    },
    {
      id    : 8,
      image : groupImg,
      title : 'Group Travel',
      desc  : 'Travelling with family, friends or colleagues? Our spacious 6 and 8 seater vehicles are perfect for group trips across Herefordshire and beyond. Everyone travels together — comfortably, safely and affordably.'
    }
  ]

const ServicesSection = () => {
  return (
    <section className="services" id="services">

      {/* HEADING */}
      <div className="services-heading">
        <p className="services-tag">What We Offer</p>
        <h2 className="services-title">
          Our <span>Services</span>
        </h2>
        <p className="services-sub">
          From airport transfers to long distance journeys — we cover it all across Herefordshire and beyond.
        </p>
      </div>

      {/* GRID */}
      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.id}>

            {/* IMAGE */}
            <div className="service-img-box">
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
              />
              <div className="service-img-overlay"></div>
            </div>

            {/* CONTENT */}
            <div className="service-content">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}

export default ServicesSection