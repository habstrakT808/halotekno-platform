import ServiceTechnicianList from '@/components/service/service-technician-list'

export const metadata = {
    title: 'Konsultasi Servis - HaloTekno',
    description: 'Konsultasi gratis seputar masalah gadget Anda dengan teknisi profesional.',
}

export default function KonsultasiPage() {
    return <ServiceTechnicianList serviceType="konsultasi" />
}
