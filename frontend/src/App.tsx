import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
export default function App() {
  return (
    <div className="pt-[80px]">
      <Navbar />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <Features />
      <Testimonials />
      <ContactForm />
      <Footer />
      <ChatWidget />
    </div>
  )
}
