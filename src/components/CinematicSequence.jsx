import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';

// Smooth GPU-composited float
const floatVariants = {
  float: {
    y: [0, -12, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }
  }
};

export default function CinematicSequence({ onComplete, metSeconds }) {
  const count = useMotionValue(0);
  const roundedCount = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  // Dynamic text shadow grows as count increases
  const textShadow = useTransform(
    count,
    [0, metSeconds],
    [
      "0 0 10px rgba(255,255,255,0.2)",
      "0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255, 200, 150, 0.4)"
    ]
  );

  const [act, setAct] = useState(1);
  const [hasStartedCount, setHasStartedCount] = useState(false);

  useEffect(() => {
    if (!hasStartedCount) return;

    const sequence = async () => {
      setAct(2);

      // 多关键帧 + linear，前密后疏 = 迟疑起步 → 加速 → 轻柔收尾
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

      // Pause, then show "we met" text
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAct(3);

      // Hold for the user to read it
      await new Promise((resolve) => setTimeout(resolve, 3500));

      // Fade this overlay out and unlock scroll — no slide-up
      onComplete();
    };

    sequence();
  }, [hasStartedCount, count, onComplete, metSeconds]);

  const handleContainerClick = () => {
    if (act === 1 && !hasStartedCount) {
      setHasStartedCount(true);
    }
  };

  const getBackgroundColor = () => {
    if (act === 1) return '#0B0C10';
    return '#4A3B4C';
  };

  return (
    <motion.div
      onClick={handleContainerClick}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden ${!hasStartedCount ? 'cursor-pointer' : ''}`}
      animate={{ backgroundColor: getBackgroundColor() }}
      transition={{ duration: act === 2 ? 7 : 3, ease: 'easeInOut' }}
      // Exit: just fade out, no slide
      exit={{ opacity: 0 }}
      initial={{ opacity: 1, backgroundColor: '#0B0C10' }}
    >
      {/* Warm glow for Act 3 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at center, rgba(255, 220, 190, 0.35) 0%, rgba(255, 184, 133, 0.12) 50%, transparent 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: act >= 3 ? 1 : 0 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          variants={floatVariants}
          animate="float"
          className="flex flex-col items-center"
          style={{ willChange: 'transform' }}
        >
          {/* Number — fixed dimensions prevent layout shift when digit count grows */}
          <motion.div
            className="text-6xl md:text-8xl text-white font-thin counter-digits mb-8"
            style={{
              textShadow,
              minWidth: '12ch',
              textAlign: 'center',
              display: 'block',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            {roundedCount}
          </motion.div>

          {/* Texts */}
          <div className="w-full flex justify-center px-8">
            <AnimatePresence mode="wait">
              {act === 1 && (
                <motion.p
                  key="act1"
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="text-base md:text-xl text-white/60 font-thin tracking-widest text-glow-candle text-center"
                  style={{ wordBreak: 'keep-all' }}
                >
                  点击屏幕，让世界开始为你转动
                </motion.p>
              )}
              {act >= 3 && (
                <motion.p
                  key="act3"
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="text-base md:text-xl text-[#FFF8F0] font-thin tracking-widest text-glow-strong text-center"
                  style={{ wordBreak: 'keep-all' }}
                >
                  直到这一秒，我们在一起了。
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
