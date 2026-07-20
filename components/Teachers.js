'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import InstaCard from './InstaCard'

// A tánctanár IG-kártyák — ugyanaz az InstaCard, mint a Master Dance (About) szekcióban.
const teachers = [
  { src: '/canva/teacher-04-orangejersey.jpg', alt: 'Tánctanár' },
  { src: '/canva/teacher-03-redpants.jpg', alt: 'Tánctanár' },
  { src: '/canva/teacher-02-soxcap.jpg', alt: 'Tánctanár' },
  { src: '/canva/teacher-01-beanie.jpg', alt: 'Tánctanár' },
  { src: '/canva/teacher-05-stool.jpg', alt: 'Tánctanár' },
]

// 6 türkiz halftone-pötty a háttérben, kb. a designbeli helyeken.
const dots = [
  { top: '3%', left: '32%', size: 250 },
  { top: '24%', left: '0%', size: 210 },
  { top: '55%', left: '4%', size: 170 },
  { top: '9%', left: '56%', size: 190 },
  { top: '20%', right: '0%', size: 290 },
  { top: '52%', right: '6%', size: 175 },
]

const N = teachers.length
// a relatív pozíciót a [-N/2, N/2] tartományba írja (végtelen körforgás)
const wrap = (x) => x - N * Math.round(x / N)

export default function Teachers() {
  const [offset, setOffset] = useState((N - 1) / 2) // középső kártya
  const [w, setW] = useState(1200)
  const offsetRef = useRef((N - 1) / 2)
  const animRef = useRef(0)
  const drag = useRef({ active: false, startX: 0, startOffset: 0 })
  const areaRef = useRef(null)

  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  useEffect(() => {
    const el = areaRef.current
    if (!el) return
    const measure = () => setW(el.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  const setBoth = (v) => {
    offsetRef.current = v
    setOffset(v)
  }

  // JS-vezérelt snap az integer pozícióra (nincs CSS transition, így a körbeugrás nem látszik)
  const animateTo = (target) => {
    cancelAnimationFrame(animRef.current)
    const start = offsetRef.current
    const t0 = performance.now()
    const dur = 480
    const ease = (t) => 1 - Math.pow(1 - t, 3)
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur)
      setBoth(start + (target - start) * ease(p))
      if (p < 1) animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
  }

  // reszponzív ív-paraméterek
  const mobile = w < 720
  const CARD_W = mobile ? 190 : 236
  const RADIUS = mobile ? 470 : 660
  const STEP = mobile ? 27 : 24 // fok két kártya között
  const TOP_Y = mobile ? 200 : 240 // a felső kártya középpontjának y-ja
  const AREA_H = mobile ? 490 : 610
  const centerX = w / 2
  const centerY = TOP_Y + RADIUS

  const onPointerDown = (e) => {
    cancelAnimationFrame(animRef.current)
    drag.current = { active: true, startX: e.clientX, startOffset: offsetRef.current }
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch {}
  }
  const onPointerMove = (e) => {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.startX
    const sensitivity = mobile ? 90 : 150 // px / kártya
    setBoth(drag.current.startOffset - dx / sensitivity)
  }
  const endDrag = () => {
    if (!drag.current.active) return
    drag.current.active = false
    animateTo(Math.round(offsetRef.current))
  }

  return (
    <section id="tanaraink" className="relative bg-black z-20" style={{ overflowX: 'clip' }}>
      {/* Felső fehér ragyogás */}
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-40"
        style={{ background: 'radial-gradient(130% 100% at 50% 0%, rgba(255,255,255,0.45), rgba(255,255,255,0) 62%)' }}
      />

      {/* Türkiz halftone pöttyök */}
      {dots.map((d, i) => (
        <img
          key={i}
          src="/dots-cyan.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute select-none"
          style={{ top: d.top, left: d.left, right: d.right, width: d.size }}
        />
      ))}

      {/* Végtelen ív-carousel — húzható (egér + touch), swipe-olható */}
      <div
        ref={areaRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(e) => e.preventDefault()}
        className="relative z-10 w-full select-none cursor-grab active:cursor-grabbing"
        style={{ height: AREA_H, touchAction: 'pan-y' }}
      >
        {teachers.map((t, i) => {
          const d = wrap(i - offset)
          const theta = d * STEP
          const rad = (theta * Math.PI) / 180
          const x = centerX + RADIUS * Math.sin(rad)
          const y = centerY - RADIUS * Math.cos(rad)
          const ad = Math.abs(d)
          const opacity = Math.max(0, Math.min(1, (N / 2 - ad) / 0.4))
          return (
            <div
              key={i}
              className="absolute left-0 top-0"
              style={{
                width: CARD_W,
                opacity,
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${theta}deg)`,
                zIndex: Math.round(30 - ad * 4),
              }}
            >
              <div className="pointer-events-none">
                <InstaCard src={t.src} alt={t.alt} width={CARD_W} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Ívelt TANÁRAINK felirat */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute inset-x-0 z-30 flex justify-center pointer-events-none"
        style={{ bottom: mobile ? 18 : 28 }}
      >
        <svg viewBox="0 0 640 140" className="w-[80%] max-w-[560px]">
          <defs>
            <path id="tanarArc" d="M 25 125 Q 320 28 615 125" fill="none" />
          </defs>
          <text
            fill="#ffffff"
            style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 76, letterSpacing: 2 }}
          >
            <textPath href="#tanarArc" startOffset="50%" textAnchor="middle">
              TANÁRAINK
            </textPath>
          </text>
        </svg>
      </motion.div>
    </section>
  )
}
