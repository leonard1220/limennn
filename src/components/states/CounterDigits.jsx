import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { formatSeconds } from '../../utils/formatNumber';

const DIGIT_GLOW =
  '0 0 32px rgba(255, 251, 235, 0.95), 0 0 64px rgba(255, 255, 255, 0.55), 0 0 96px rgba(255, 223, 233, 0.35)';

/** 状态 2 & 3：数字显示 — Outfit + tabular-nums + 心跳脉动 + 能量光晕 */
export default function CounterDigits({ value, frozen }) {
  const snapControls = useAnimation();
  const wasFrozen = useRef(false);

  useEffect(() => {
    if (frozen && !wasFrozen.current) {
      wasFrozen.current = true;
      snapControls.start({
        scale: [1, 0.97, 1],
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      });
    }
  }, [frozen, snapControls]);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.span
        animate={snapControls}
        className="counter-digits font-display text-[clamp(3rem,14vw,9rem)] leading-none select-none"
        style={{
          fontVariantNumeric: 'tabular-nums',
          textShadow: DIGIT_GLOW,
        }}
      >
        {formatSeconds(value)}
      </motion.span>
    </motion.div>
  );
}
