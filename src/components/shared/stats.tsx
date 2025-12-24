'use client'

import { TrendingUp, Users, Award, Clock } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Pengguna Aktif',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: TrendingUp,
    value: '50,000+',
    label: 'Servis Selesai',
    color: 'from-blue-500 to-purple-500',
  },
  {
    icon: Award,
    value: '4.9/5',
    label: 'Rating Kepuasan',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Layanan Support',
    color: 'from-pink-500 to-cyan-500',
  },
]

export default function Stats() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0])
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            animateNumbers()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const animateNumbers = () => {
    const targets = [10000, 50000, 4.9, 24]
    const duration = 2000
    const steps = 60

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setCounts(targets.map((target) => Math.floor(target * progress)))

      if (currentStep >= steps) {
        clearInterval(interval)
        setCounts(targets)
      }
    }, duration / steps)
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-8"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80)',
          }}
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/95 via-cyan-50/90 to-blue-50/95"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-5xl">
            Dipercaya oleh{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Ribuan Pengguna
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl">
            Angka-angka yang membuktikan komitmen kami
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="group relative transform rounded-2xl border border-gray-200 bg-white/90 p-6 text-center backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-blue-300 hover:shadow-2xl sm:p-8"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                <div className="relative">
                  <div
                    className={`h-12 w-12 bg-gradient-to-br sm:h-14 sm:w-14 ${stat.color} mx-auto mb-4 flex transform items-center justify-center rounded-xl transition-transform duration-300 group-hover:rotate-12`}
                  >
                    <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                  </div>

                  <div className="mb-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                    {index === 2
                      ? counts[index].toFixed(1)
                      : index === 3
                        ? stat.value
                        : counts[index].toLocaleString()}
                    {index < 2 && '+'}
                  </div>

                  <div className="text-sm font-medium text-gray-600 sm:text-base">
                    {stat.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
