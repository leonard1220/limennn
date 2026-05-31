import { motion } from 'framer-motion';

/** 状态 3：心动粉 radial-gradient 毛玻璃光晕 */
export default function StateMeetingGlow({ progress }) {
  return (
    <motion.div
      className="fixed inset-0 z-10 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: progress }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-hidden
    >
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255, 223, 233, 0.85) 0%, rgba(255, 223, 233, 0.35) 40%, transparent 70%)',
          filter: 'blur(60px)',
          transform: `scale(${0.6 + progress * 0.4})`,
        }}
      />
      <div
        className="absolute bottom-[5%] right-[8%] w-[40vw] h-[40vw] max-w-[320px] max-h-[320px] rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255, 223, 233, 0.6) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
    </motion.div>
  );
}
