'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const events = [
  {
    title: 'Aaron Quinn Workshop',
    date: '2025.10.18.',
    tag: 'Workshop',
    color: 'from-yellow-400 to-orange-500',
    textColor: 'text-black',
  },
  {
    title: '[Random] After Party',
    date: '2025.05.28.',
    tag: 'Esemény',
    color: 'from-gray-800 to-gray-900',
    textColor: 'text-white',
  },
  {
    title: "Summer '26 Camp",
    date: '2026.07.',
    tag: 'Tábor',
    color: 'from-cyan-400 to-blue-500',
    textColor: 'text-black',
  },
  {
    title: 'Summer Classes 26',
    date: '2026.06–08.',
    tag: 'Nyári kurzus',
    color: 'from-red-500 to-red-700',
    textColor: 'text-white',
  },
]

function EventCard({ event, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="rounded-xl overflow-hidden shadow-lg cursor-pointer"
    >
      {/* Card visual */}
      <div className={`bg-gradient-to-br ${event.color} aspect-[4/5] flex flex-col items-start justify-end p-4 relative`}>
        {/* MD badge */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-black/20 rounded-sm flex items-center justify-center">
          <span className="text-white font-black text-xs">MD</span>
        </div>
        {/* Tag */}
        <span className="text-xs bg-black/20 text-white px-2 py-0.5 rounded-full mb-2 font-medium">
          {event.tag}
        </span>
        <h3 className={`font-black text-base leading-tight ${event.textColor}`}>
          {event.title}
        </h3>
        <p className={`text-xs mt-1 opacity-80 ${event.textColor}`}>{event.date}</p>
      </div>
    </motion.div>
  )
}

export default function News() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="hirek" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-title text-4xl sm:text-5xl mb-12"
        >
          HÍREK ÉS<br />ESEMÉNYEK
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {events.map((event, i) => (
            <EventCard key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
