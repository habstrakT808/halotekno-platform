import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import Hero from '@/components/shared/hero'
import Services from '@/components/shared/services'
import Stats from '@/components/shared/stats'
import Features from '@/components/shared/features'
import CTA from '@/components/shared/cta'

export default function Home() {
  return (
    <div className="smooth-scroll-container min-h-screen overflow-x-hidden bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40 text-gray-900">
      <Navbar variant="light" />
      <Hero />
      <Services />
      <Stats />
      <Features />
      <CTA />
      <Footer variant="light" />
    </div>
  )
}
