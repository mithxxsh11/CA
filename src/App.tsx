import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { IntroLoader } from './components/flow/IntroLoader'
import { Navbar } from './components/redesign/Navbar'
import { HeroSection } from './components/redesign/HeroSection'
import { AboutSection } from './components/redesign/AboutSection'
import { CoursesSection } from './components/redesign/CoursesSection'
import { WhyChooseUsSection } from './components/redesign/WhyChooseUsSection'
import { TestimonialsSection } from './components/redesign/TestimonialsSection'
import { GallerySection } from './components/redesign/GallerySection'
import { ContactSection } from './components/redesign/ContactSection'
import { Footer } from './components/redesign/Footer'
import { EnquiryModal } from './components/redesign/EnquiryModal'
import { FloatingWhatsApp } from './components/redesign/FloatingWhatsApp'
import { ScrollProgressBar } from './components/redesign/MotionPrimitives'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState('Spoken English & Communication Mastery')

  const handleOpenEnquire = (courseTitle?: string) => {
    if (courseTitle) {
      setSelectedCourse(courseTitle)
    }
    setModalOpen(true)
  }

  const handleCloseEnquire = () => {
    setModalOpen(false)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#FFFCFA] text-[#171717] overflow-x-hidden">
        {/* Serene Scroll Progress Indicator */}
        <ScrollProgressBar />

        {/* Signature Multi-stage Intro Sequence */}
        {showIntro && <IntroLoader onComplete={() => setShowIntro(false)} />}

        {/* Horizontal Sticky Navigation */}
        <Navbar onOpenEnquire={handleOpenEnquire} />

        {/* Main Educational Single-Page Sections */}
        <main id="main" className="relative z-10">
          {/* 1. Hero Section */}
          <HeroSection onOpenEnquire={handleOpenEnquire} />

          {/* 2. About CHANDNI'S Academy */}
          <AboutSection onOpenEnquire={handleOpenEnquire} />

          {/* 3. Courses Showcase */}
          <CoursesSection onOpenEnquire={handleOpenEnquire} />

          {/* 4. Why Choose Us Section */}
          <WhyChooseUsSection />

          {/* 5. Student Testimonials Carousel */}
          <TestimonialsSection />

          {/* 6. Life at CHANDNI'S Academy Gallery */}
          <GallerySection />

          {/* 7. Contact & Admissions Form */}
          <ContactSection />
        </main>

        {/* Minimalist Footer */}
        <Footer />

        {/* Quick Access Floating WhatsApp Button */}
        <FloatingWhatsApp />

        {/* Admissions Enquiry Modal */}
        <EnquiryModal
          isOpen={modalOpen}
          onClose={handleCloseEnquire}
          initialCourse={selectedCourse}
        />
      </div>
    </MotionConfig>
  )
}
