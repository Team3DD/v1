import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import AboutSection from "@/components/about-section"
import LocationsSection from "@/components/locations-section"
import MedicalCasesGallery from "@/components/medical-cases-gallery"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <LocationsSection />
      <MedicalCasesGallery />
      <Footer />
    </main>
  )
}