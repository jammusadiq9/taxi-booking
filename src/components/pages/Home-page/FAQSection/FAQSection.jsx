import { useState } from 'react'
import './FAQSection.css'

const faqs = [
  {
    id      : 1,
    question: 'How do I book a taxi?',
    answer  : 'Booking is simple! Just fill in the booking form on our website with your journey details and we will confirm your ride shortly. You can also call or WhatsApp us directly on +44 7311 694905 and we will get you sorted right away.'
  },
  {
    id      : 2,
    question: 'What areas do you cover?',
    answer  : 'We are based in Hereford and cover all of Herefordshire and surrounding areas. We also provide long distance transfers to all major UK airports including Heathrow, Gatwick, Birmingham, Bristol and more — no destination is too far.'
  },
  {
    id      : 3,
    question: 'Are you available 24 hours a day?',
    answer  : 'Yes — we operate 24 hours a day, 7 days a week, 365 days a year. Whether you need an early morning airport run or a late night pickup, we are always here and ready to take your booking.'
  },
  {
    id      : 4,
    question: 'Do you track flights for airport transfers?',
    answer  : 'Absolutely. For all airport transfers we personally track your flight in real time. If your flight is delayed we will adjust our pickup time accordingly — at no extra cost to you. You will never be left waiting at the airport.'
  },
  {
    id      : 5,
    question: 'What vehicles do you have available?',
    answer  : 'We offer a range of clean, comfortable and well maintained vehicles including 4 seater, 6 seater and 8 seater options. Whether you are travelling alone or with a group, we have the perfect vehicle to suit your needs.'
  }
]

const FAQSection = () => {

  const [activeId, setActiveId] = useState(null)

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id)
  }

  return (
    <section className="faq" id="faq">

      {/* HEADING */}
      <div className="faq-heading">
        <p className="faq-tag">Got Questions?</p>
        <h2 className="faq-title">
          Frequently Asked <span>Questions</span>
        </h2>
        <p className="faq-sub">
          Everything you need to know about our taxi service in Hereford.
        </p>
      </div>

      {/* ACCORDION */}
      <div className="faq-list">
        {faqs.map((faq) => (
          <div
            className={`faq-item ${activeId === faq.id ? 'active' : ''}`}
            key={faq.id}
          >

            {/* QUESTION */}
            <button
              className="faq-question"
              onClick={() => toggleFAQ(faq.id)}
            >
              <span>{faq.question}</span>
              <div className="faq-icon">
                {activeId === faq.id ? '−' : '+'}
              </div>
            </button>

            {/* ANSWER */}
            {activeId === faq.id && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}

          </div>
        ))}
      </div>

    </section>
  )
}

export default FAQSection