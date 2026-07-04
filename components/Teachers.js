'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const teachers = [
  { name: 'Dalma', style: 'Hip-hop · Haladó', rotate: -8, x: -180, y: -40 },
  { name: 'Bence', style: 'Hip-hop · Középhaladó', rotate: -2, x: -60, y: -80 },
  { name: 'Réka', style: 'Break · Junior', rotate: 5, x: 60, y: -50 },
  { name: 'Ádám', style: 'Streetdance · Gyerek', rotate: 12, x: 180, y: -20 },
]

function TeacherCard({ teacher, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="teacher-card absolute cursor-pointer"
      style={{ left: '50%', top: '50%' }}
      initial={{ opacity: 0, x: teacher.x * 0.3, y: 60, rotate: 0, scale: 0.7 }}
      animate={
        inView
          ? {
              opacity: 1,
              x: teacher.x,
              y: teacher.y,
              rotate: teacher.rotate,
              scale: 1,
            }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        zIndex: 20,
        transition: { duration: 0.3 },
      }}
    >
      <div className="w-36 sm:w-40 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-gray-800">
        {/* Photo placeholder */}
        <div className="aspect-[3/4] bg-gradient-to-br from-gray-600 to-gray-900 flex items-end p-3">
          <div>
            <div className="text-white font-bold text-sm">{teacher.name}</div>
            <div className="text-[#40CFD5] text-xs mt-0.5">{teacher.style}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Teachers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="tanaraink"
      className="relative bg-[#0D0D0D] py-24 overflow-hidden min-h-[560px]"
    >
      {/* Cyan dot accent */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #40CFD5 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* TANÁRAINK title — big, bottom center */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[480px]">
        {/* Cards cluster */}
        <div className="relative w-full flex justify-center" style={{ height: 320 }}>
          {teachers.map((teacher, i) => (
            <TeacherCard key={teacher.name} teacher={teacher} index={i} />
          ))}
        </div>

        {/* Title */}
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="section-title text-white text-5xl sm:text-7xl mt-8 text-center tracking-wider"
        >
          TANÁRAINK
        </motion.h2>
      </div>
    </section>
  )
}
