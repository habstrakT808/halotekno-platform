import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import AboutHero from '@/components/about/about-hero'
import CompanyProfile from '@/components/about/company-profile'
import VisionMission from '@/components/about/vision-mission'
import CompanyHistory from '@/components/about/company-history'
import CoreTeam from '@/components/about/core-team'
import ContactLocation from '@/components/about/contact-location'

export const metadata = {
  title: 'Tentang Kami - HaloTekno',
  description:
    'Profil perusahaan HaloTekno, visi misi, sejarah, tim inti, dan informasi kontak. Platform servis HP terpercaya di Indonesia.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40 text-gray-900">
      <Navbar variant="light" />
      <main className="pt-16">
        <CompanyProfile />
        <VisionMission />
        <CompanyHistory />
        <CoreTeam />
        <ContactLocation />
      </main>
      <Footer variant="light" />
    </div>
  )
}
