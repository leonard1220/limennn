import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionValueEvent, animate, AnimatePresence } from 'framer-motion';

const floatVariants = {
  float: {
    y: [0, -12, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }
  }
};

export default function HeroSection({ onComplete, metSeconds, isFinished }) {
  const count = useMotionValue(0);
  const [displayCount, setDisplayCount] = useState('0');
  const [glowIntensity, setGlowIntensity] = useState(0);

  // Subscribe to count changes and update display
  useMotionValueEvent(count, "change", (latest) => {
    const rounded = Math.round(latest);
    setDisplayCount(rounded.toLocaleString());
    setGlowIntensity(rounded / metSeconds);
  });

  const [act, setAct] = useState(1);
  const [hasStartedCount, setHasStartedCount] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasStartedCount || hasRun.current) return;
    hasRun.current = true;

    const run = async () => {
      setAct(2);
      await animate(count,
        [
          0, 1, 2, 3, 5, 8, 13, 22, 40, 75, 150, 300,
          700, 1800, 5000, 14000, 40000, 120000,
          380000, 1300000, 5000000, 20000000,
          80000000, 220000000, 380000000,
          440000000, 458000000, 461000000, metSeconds
        ],
        {
          duration: 14,
          times: [
            0, 0.04, 0.08, 0.12, 0.16, 0.20, 0.24, 0.28, 0.33, 0.38, 0.43, 0.48,
            0.53, 0.58, 0.63, 0.67, 0.71, 0.75,
            0.79, 0.83, 0.87, 0.90,
            0.93, 0.95, 0.97,
            0.98, 0.99, 0.995, 1.0
          ],
          ease: "linear",
        }
      );

      await new Promise((r) => setTimeout(r, 1000));
      setAct(3);
      await new Promise((r) => setTimeout(r, 3500));
      onComplete();
    };

    run();
  }, [hasStartedCount]); // intentionally minimal deps — hasRun guards against re-runs

  const textShadow = `0 0 ${10 + glowIntensity * 20}px rgba(255,255,255,${0.2 + glowIntensity * 0.6}), 0 0 ${glowIntensity * 60}px rgba(255,200,150,${glowIntensity * 0.4})`;

  return (
    <motion.section
      onClick={() => { if (act === 1) setHasStartedCount(true); }}
      className={`relative w-full flex flex-col items-center justify-center overflow-hidden select-none ${act === 1 ? 'cursor-pointer' : ''}`}
      style={{ height: '100vh', minHeight: '100vh' }}
      animate={{ backgroundColor: act === 1 ? '#0B0C10' : '#4A3B4C' }}
      initial={{ backgroundColor: '#0B0C10' }}
      transition={{ duration: act === 2 ? 7 : 3, ease: 'easeInOut' }}
    >
      {/* Warm glow layer (Act 3) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at center, rgba(255,220,190,0.35) 0%, rgba(255,184,133,0.12) 50%, transparent 100%)',
        }}
        animate={{ opacity: act >= 3 ? 1 : 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />

      {/* Floating content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-6">
        <motion.div
          variants={floatVariants}
          animate="float"
          style={{ willChange: 'transform' }}
          className="flex flex-col items-center w-full"
        >
          {/* Number — plain string, no MotionValue child */}
          <motion.div
            className="text-6xl md:text-8xl text-white font-thin counter-digits mb-10"
            style={{
              textShadow,
              minWidth: '10ch',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          >
            {displayCount}
          </motion.div>

          {/* Text */}
          <div className="min-h-[2rem] flex justify-center w-full">
            <AnimatePresence mode="wait">
              {act === 1 && (
                <motion.p
                  key="act1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="text-base md:text-lg text-white/60 font-thin tracking-widest text-glow-candle text-center"
                  style={{ wordBreak: 'keep-all' }}
                >
                  点击屏幕，让时间开始跳动
                </motion.p>
              )}
              {act >= 3 && (
                <motion.p
                  key="act3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="text-base md:text-lg text-[#FFF8F0] font-thin tracking-widest text-glow-strong text-center"
                  style={{ wordBreak: 'keep-all' }}
                >
                  直到这一秒，我们在一起了。
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Scroll hint */}
          {isFinished && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2.5, delay: 0.5, repeat: 2 }}
              className="mt-20 text-white/30 font-thin tracking-[0.4em] text-xs"
            >
              向下滑动
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
