'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const schedule = {
  nagy: {
    hetfo_szerda: [
      { time: '18:30–20:00', label: 'Hip-hop – Haladó', teacher: 'Dalmával' },
      { time: '18:30–20:00', label: 'Hip-hop – Középhaladó', teacher: 'Dalmával' },
      { time: '18:30–20:00', label: 'Hip-hop – Kezdő', teacher: 'Dalmával' },
    ],
    kedd_csutortok: [
      { time: '18:30–20:00', label: 'Hip-hop – Haladó', teacher: 'Dalmával' },
      { time: '18:30–20:00', label: 'Hip-hop – Középhaladó', teacher: 'Dalmával' },
      { time: '18:30–20:00', label: 'Hip-hop – Kezdő', teacher: 'Dalmával' },
    ],
  },
  kis: {
    hetfo_szerda: [
      { time: '16:00–17:30', label: 'Gyerek Hip-hop', teacher: 'Dalmával' },
      { time: '17:30–19:00', label: 'Junior Hip-hop', teacher: 'Dalmával' },
    ],
    kedd_csutortok: [
      { time: '16:00–17:30', label: 'Gyerek Hip-hop', teacher: 'Dalmával' },
      { time: '17:30–19:00', label: 'Junior Hip-hop', teacher: 'Dalmával' },
    ],
  },
}

function ScheduleItem({ time, label, teacher, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="border-b border-gray-200 py-4 last:border-0"
    >
      <div className="font-bold text-base">{time}</div>
      <div className="text-gray-600 text-sm mt-0.5">{label} – {teacher}</div>
    </motion.div>
  )
}

export default function Orarend() {
  const [activeTab, setActiveTab] = useState('nagy')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="orarend" className="py-0">
      {/* Black header bar */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="bg-black py-8 px-4 text-center"
      >
        <h2 className="section-title text-white text-4xl sm:text-5xl tracking-wider">ÓRAREND</h2>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4">
        {/* Tabs */}
        <div className="flex gap-0 mt-0 mb-8 border-b border-gray-200">
          {[
            { id: 'nagy', label: 'Nagy terem' },
            { id: 'kis', label: 'Kis terem' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 text-sm font-semibold transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-black'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                />
              )}
            </button>
          ))}
        </div>

        {/* Schedule grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 pb-16"
          >
            {/* Hétfő–Szerda */}
            <div>
              <h3 className="font-black text-lg mb-2 uppercase tracking-wide">Hétfő – Szerda</h3>
              <div>
                {schedule[activeTab].hetfo_szerda.map((item, i) => (
                  <ScheduleItem key={i} {...item} index={i} />
                ))}
              </div>
            </div>

            {/* Kedd–Csütörtök */}
            <div>
              <h3 className="font-black text-lg mb-2 uppercase tracking-wide">Kedd – Csütörtök</h3>
              <div>
                {schedule[activeTab].kedd_csutortok.map((item, i) => (
                  <ScheduleItem key={i} {...item} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
