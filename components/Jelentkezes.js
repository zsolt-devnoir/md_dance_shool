'use client'
import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const days = ['Hétfő–Szerda', 'Kedd–Csütörtök', 'Péntek']
const slots = ['17:00–18:00', '18:00–19:00', '19:00–20:00']

export default function Jelentkezes() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const toggle = (day, slot) => {
    const key = `${day}-${slot}`
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="jelentkezes" className="py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title text-3xl sm:text-4xl mb-2">JELENTKEZÉS</h2>
          <p className="text-gray-500 text-sm mb-8">Teljes név és elérhetőség megadásával</p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#40CFD5]/10 border border-[#40CFD5] rounded-lg p-8 text-center"
            >
              <div className="text-3xl mb-3">🎉</div>
              <h3 className="font-bold text-xl mb-2">Sikeres jelentkezés!</h3>
              <p className="text-gray-600 text-sm">
                Hamarosan felvesszük veled a kapcsolatot. Várunk szeretettel!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <input
                  required
                  type="text"
                  placeholder="Teljes név"
                  className="md-input"
                />
              </div>

              {/* Email grid */}
              <div className="grid grid-cols-2 gap-3">
                <input type="email" placeholder="E-mail cím" className="md-input" required />
                <input type="email" placeholder="E-mail cím (megerősítés)" className="md-input" />
                <input type="tel" placeholder="Telefonszám" className="md-input" />
                <input type="text" placeholder="Kor / évfolyam" className="md-input" />
                <input
                  type="text"
                  placeholder="Szint (kezdő / haladó)"
                  className="md-input col-span-2"
                />
              </div>

              {/* Day/slot checkboxes */}
              <div>
                <p className="text-sm font-semibold mb-3">Melyik időpontban érsz rá?</p>
                <div className="grid grid-cols-3 gap-4">
                  {days.map((day) => (
                    <div key={day}>
                      <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                        {day}
                      </div>
                      {slots.map((slot) => {
                        const key = `${day}-${slot}`
                        return (
                          <label
                            key={slot}
                            className="flex items-center gap-2 cursor-pointer mb-2 group"
                          >
                            <div
                              onClick={() => toggle(day, slot)}
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors duration-150 flex-shrink-0 ${
                                selected[key]
                                  ? 'bg-[#40CFD5] border-[#40CFD5]'
                                  : 'border-gray-300 group-hover:border-[#40CFD5]'
                              }`}
                            >
                              {selected[key] && (
                                <svg viewBox="0 0 10 8" className="w-2.5 h-2 text-black fill-current">
                                  <path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                                </svg>
                              )}
                            </div>
                            <span className="text-xs text-gray-600">{slot}</span>
                          </label>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-black text-white font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-[#40CFD5] hover:text-black transition-colors duration-200"
              >
                Jelentkezés elküldése
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
