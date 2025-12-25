import { Eye, Rocket } from 'lucide-react'

export default function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 py-20 md:py-32">
      {/* Decorative Elements */}
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Visi & Misi
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/90">
            Komitmen kami untuk menjadi yang terbaik di industri teknologi
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Vision */}
          <div className="group rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md transition-all duration-300 hover:bg-white/20 md:p-10">
            <div className="mb-6 inline-flex rounded-xl bg-white/20 p-4 backdrop-blur-sm">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Visi
            </h3>
            <p className="text-lg leading-relaxed text-white/90">
              Menjadi platform teknologi terdepan dan terpercaya di Indonesia
              yang menghubungkan jutaan pengguna dengan solusi servis dan
              sparepart berkualitas tinggi, menciptakan ekosistem teknologi yang
              mudah diakses oleh semua kalangan.
            </p>
          </div>

          {/* Mission */}
          <div className="group rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md transition-all duration-300 hover:bg-white/20 md:p-10">
            <div className="mb-6 inline-flex rounded-xl bg-white/20 p-4 backdrop-blur-sm">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Misi
            </h3>
            <ul className="space-y-3 text-lg text-white/90">
              <li className="flex items-start">
                <span className="mr-2 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-white"></span>
                <span>
                  Menyediakan layanan servis HP profesional dengan standar
                  kualitas tertinggi
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-white"></span>
                <span>
                  Membangun jaringan mitra teknisi terpercaya di seluruh
                  Indonesia
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-white"></span>
                <span>
                  Menghadirkan inovasi teknologi untuk kemudahan akses layanan
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-white"></span>
                <span>
                  Memberikan edukasi dan solusi teknologi kepada masyarakat
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
