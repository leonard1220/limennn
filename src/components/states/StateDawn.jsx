import { motion } from 'framer-motion';

/** 状态 1：破晓 — 纯黑 → 初生黄 */
export default function StateDawn({ progress }) {
  const butter = { r: 255, g: 251, b: 235 };
  const r = Math.round(butter.r * progress);
  const g = Math.round(butter.g * progress);
  const b = Math.round(butter.b * progress);

  return (
    <motion.div
      className="fixed inset-0 z-0"
      style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
      aria-hidden
    />
  );
}
