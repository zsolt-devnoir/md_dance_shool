'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer id="elerhetoseg" className="bg-white border-t border-gray-100 py-14 px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto flex flex-col items-center text-center gap-5"
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 bg-black rounded-sm flex items-center justify-center">
            <span className="font-black text-white text-lg">MD</span>
          </div>
          <span className="text-xs tracking-widest text-gray-400 uppercase mt-1">Dance School</span>
        </div>

        {/* Contact */}
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            E-mail:{' '}
            <a
              href="mailto:masterdancetanciskola@gmail.com"
              className="text-[#40CFD5] hover:underline"
            >
              masterdancetanciskola@gmail.com
            </a>
          </p>
          <p>
            Tel:{' '}
            <a href="tel:+36306336682" className="text-[#40CFD5] hover:underline">
              +36 (30) 633-6682
            </a>
          </p>
        </div>

        {/* Address */}
        <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
          Astoria Stúdió: 5. Kerület, Semmelweis u. 1–3.<br />
          (Astoria metró megállótól 3 percnyi sétára van,<br />
          MD Dance Stúdió a Magyarok Házában a második emeleten van)
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {[
            { Icon: Instagram, href: '#', label: 'Instagram' },
            { Icon: Facebook, href: '#', label: 'Facebook' },
            { Icon: Youtube, href: '#', label: 'YouTube' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#40CFD5] flex items-center justify-center text-gray-600 hover:text-black transition-colors duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Payment methods */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {['Barion', 'VISA', 'VISA (debit)', 'Mastercard', 'Maestro'].map((method) => (
            <span
              key={method}
              className="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1 rounded"
            >
              {method}
            </span>
          ))}
        </div>

        {/* Legal */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
          <a href="#" className="hover:text-gray-600 transition-colors">Adatkezelési tájékoztató</a>
          <span>·</span>
          <a href="#" className="hover:text-gray-600 transition-colors">ÁSZF</a>
          <span>·</span>
          <a href="#" className="hover:text-gray-600 transition-colors">Cookie beállítások</a>
        </div>
      </motion.div>
    </footer>
  )
}
