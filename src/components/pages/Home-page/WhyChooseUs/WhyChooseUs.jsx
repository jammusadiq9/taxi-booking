import './WhyChooseUs.css'
import ontimeImg  from '../../../../assets/why choose/ontime.webp'
import pricingImg from '../../../../assets/why choose/pricing.webp'
import safeImg    from '../../../../assets/why choose/safe.webp'

const reasons = [
  {
    id   : 1,
    image: ontimeImg,
    title: 'Always On Time',
    desc : 'Punctuality is at the heart of everything we do. Whether it is an early morning airport run or a late night pickup, you can count on me to be there on time — every single time. Your time is valuable and I respect that.'
  },
  {
    id   : 2,
    image: safeImg,
    title: 'Safe & Licensed',
    desc : 'Your safety is my number one priority. I am fully licensed by Herefordshire Council, DBS checked and fully insured. You can sit back, relax and trust that you are in safe, professional hands throughout your journey.'
  },
  {
    id   : 3,
    image: pricingImg,
    title: 'Fair & Transparent Pricing',
    desc : 'No hidden fees, no surprises. I offer clear, competitive and fair pricing for every journey. You will always know the cost upfront — whether it is a short local trip or a long distance transfer across the UK.'
  }
]

const WhyChooseUs = () => {
  return (
    <section className="why" id="why">

      <div className="why-heading">
        <p className="why-tag">Why Choose Us</p>
        <h2 className="why-title">
          The Hereford Taxi <span>You Can Trust</span>
        </h2>
        <p className="why-sub">
          I am not just a taxi driver — I am your reliable, local travel partner
          across Herefordshire. Here is what makes me different.
        </p>
      </div>

      <div className="why-grid">
        {reasons.map((reason) => (
          <div className="why-card" key={reason.id}>

            <div className="why-img-box">
              <img
                src={reason.image}
                alt={reason.title}
                loading="lazy"
              />
              <div className="why-img-overlay"></div>
            </div>

            <div className="why-card-content">
              <h3 className="why-card-title">{reason.title}</h3>
              <p className="why-card-desc">{reason.desc}</p>
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}

export default WhyChooseUs