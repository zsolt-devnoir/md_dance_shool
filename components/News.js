'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import InstaCard from './InstaCard'

// A 4 esemény-plakát — ugyanaz az InstaCard, de eltérő méret és képarány.
const events = [
  { src: '/canva/event-aaron-quinn-workshop.jpg', alt: 'Aaron Quinn Workshop', ratio: 1.778, width: 330, rotate: -3, y: 40 },
  { src: '/canva/event-after-party.png', alt: '(Random) After Party', ratio: 0.8, width: 226, rotate: 2.5, y: 120 },
  { src: '/canva/event-summer-camp.png', alt: "Summer '26 Camp", ratio: 0.8, width: 266, rotate: -2, y: 20 },
  { src: '/canva/event-summer-classes.png', alt: "Summer Classes '26", ratio: 1.778, width: 316, rotate: 3, y: 150 },
]

// Fekete halftone-pöttyök a sarkokban (fehér háttéren).
const dots = [
  { top: '1%', left: '-1%', size: 210 },
  { top: '-2%', right: '1%', size: 250 },
  { bottom: '3%', right: '5%', size: 150 },
]

function EventCard({ e, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      style={{ width: e.width }}
      className="shrink-0"
      initial={{ opacity: 0, y: e.y + 40, rotate: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: e.y, rotate: e.rotate, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: e.y - 12, rotate: 0, zIndex: 40, transition: { duration: 0.3 } }}
    >
      <InstaCard src={e.src} alt={e.alt} ratio={e.ratio} width={e.width} />
    </motion.div>
  )
}

export default function News() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="hirek" className="relative bg-white overflow-x-clip py-20 sm:py-24 px-4">
      {/* Fekete halftone pöttyök */}
      {dots.map((d, i) => (
        <img
          key={i}
          src="/dots-black.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute select-none opacity-70"
          style={{ top: d.top, left: d.left, right: d.right, bottom: d.bottom, width: d.size }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto" style={{ minHeight: 640 }}>
        {/* Kártyák — szórt, döntött elrendezés */}
        <div className="flex justify-center items-start gap-3 sm:gap-6 pt-2">
          {events.map((e, i) => (
            <EventCard key={e.src} e={e} index={i} />
          ))}
        </div>

        {/* Cím — balra lent */}
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-title absolute left-1 sm:left-4 bottom-2 text-4xl sm:text-6xl leading-[0.92] text-black"
        >
          HÍREK ÉS<br />ESEMÉNYEK
        </motion.h2>
      </div>
    </section>
  )
}
