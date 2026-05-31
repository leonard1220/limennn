import { motion, AnimatePresence } from 'framer-motion';
import CounterDigits from './CounterDigits';

/** 状态 2 & 3 共用的中央数字 + 文案 */
export default function StateCounter({
  value,
  subtitle,
  subtitleKey,
  exitProgress,
  showCounter,
  frozen = false,
}) {
  const yExit = -exitProgress * 120;
  const opacityExit = 1 - exitProgress;

  return (
    <motion.div
      className="fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6"
      style={{ y: yExit, opacity: opacityExit }}
    >
      <AnimatePresence mode="wait">
        {showCounter && (
          <motion.div
            key="counter-block"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6 md:gap-8"
          >
            <CounterDigits value={value} frozen={frozen} />

            <AnimatePresence mode="wait">
              {subtitle && (
                <motion.p
                  key={subtitleKey}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm md:text-base font-light tracking-[0.2em] text-neutral-500 text-center max-w-xs"
                >
                  {subtitle}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
