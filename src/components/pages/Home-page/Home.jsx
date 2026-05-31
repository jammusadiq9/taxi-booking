import HeroSection     from './HeroSection/HeroSection'
import ServicesSection from '../ServicesSection/ServicesSection'
import AboutSection    from './AboutSection/AboutSection'
import WhyChooseUs     from './WhyChooseUs/WhyChooseUs'
import ReviewsSection  from './ReviewsSection/ReviewsSection'
import FAQSection      from './FAQSection/FAQSection'
import CTASection      from './CTASection/CTASection'
import MapSection from './MapSection/MapSection'
const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyChooseUs />
      <ReviewsSection />
      <FAQSection />
      <MapSection />
      <CTASection />
      
    </div>
  )
}

export default Home