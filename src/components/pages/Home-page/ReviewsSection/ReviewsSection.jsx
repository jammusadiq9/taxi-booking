import './ReviewsSection.css'

const reviews = [
  {
    id  : 1,
    name: 'Sarah Mitchell',
    date: 'March 2025',
    stars: 5,
    text: 'Absolutely fantastic service! I booked an early morning airport transfer to Heathrow and the driver was waiting for me right on time. The car was spotless, the journey was smooth and I felt completely at ease the whole way. Will definitely be booking again!'
  },
  {
    id  : 2,
    name: 'James Thornton',
    date: 'February 2025',
    stars: 5,
    text: 'I have used this taxi service several times now for trips to Birmingham Airport and I am never disappointed. Always punctual, always professional and always friendly. The pricing is fair and transparent — no nasty surprises. Highly recommended to anyone in Hereford!'
  },
  {
    id  : 3,
    name: 'Emily Clarke',
    date: 'April 2025',
    stars: 5,
    text: 'By far the best taxi service in Hereford. I needed a last minute ride to the train station late at night and the driver came through without any fuss. Friendly, reliable and great value for money. I would not use anyone else for my travels around Herefordshire.'
  }
]

const ReviewsSection = () => {
  return (
    <section className="reviews" id="reviews">

      {/* HEADING */}
      <div className="reviews-heading">
        <p className="reviews-tag">Testimonials</p>
        <h2 className="reviews-title">
          What Our <span>Customers Say</span>
        </h2>
        <p className="reviews-sub">
          Do not just take our word for it — here is what real customers have to say about their experience with us.
        </p>
      </div>

      {/* GRID */}
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div className="review-card" key={review.id}>

            {/* STARS */}
            <div className="review-stars">
              {'★'.repeat(review.stars)}
            </div>

            {/* TEXT */}
            <p className="review-text">
              "{review.text}"
            </p>

            {/* BOTTOM */}
            <div className="review-bottom">
              <div className="review-avatar">
                {review.name.charAt(0)}
              </div>
              <div className="review-info">
                <span className="review-name">{review.name}</span>
                <span className="review-date">{review.date}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}

export default ReviewsSection