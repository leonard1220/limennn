import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GIFT_IMAGE, GIFT_CAPTION } from '../../config/timeline';
import ParticleBurst from './ParticleBurst';

/** 最终礼物解锁区域 */
export default function GiftReveal() {
  const [unlocked, setUnlocked] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [showGift, setShowGift] = useState(false);

  const handleUnlock = () => {
    if (unlocked) return;
    setUnlocked(true);
    setShowBurst(true);
  };

  const handleBurstComplete = () => {
    setShowBurst(false);
    setShowGift(true);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32">
      <AnimatePresence mode="wait">
        {!showGift ? (
          <motion.div
            key="unlock-btn"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-8"
          >
            <motion.button
              type="button"
              onClick={handleUnlock}
              disabled={unlocked}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-10 py-4 rounded-full text-sm tracking-[0.25em] uppercase font-light text-neutral-700 overflow-hidden transition-shadow duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(255,251,235,0.9) 0%, rgba(255,223,233,0.9) 100%)',
                boxShadow: '0 0 40px rgba(255, 223, 233, 0.5), 0 0 80px rgba(255, 223, 233, 0.2)',
              }}
            >
              <span className="relative z-10">Unlock your gift</span>
              <motion.span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%)',
                }}
              />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="gift-reveal"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-10 max-w-lg"
          >
            <div className="relative w-full aspect-square overflow-hidden rounded-sm shadow-[0_30px_80px_-20px_rgba(255,223,233,0.6)]">
              <motion.img
                src={GIFT_IMAGE}
                alt="Your gift"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at center, transparent 50%, rgba(255,251,235,0.15) 100%)',
                }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base md:text-lg font-light tracking-[0.2em] text-neutral-500 text-center"
            >
              {GIFT_CAPTION}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <ParticleBurst active={showBurst} onComplete={handleBurstComplete} />
    </section>
  );
}
