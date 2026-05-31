import { motion } from 'framer-motion';
import { MEMORIES } from '../../config/timeline';
import ParallaxPhoto from '../memories/ParallaxPhoto';
import GiftReveal from '../memories/GiftReveal';

/** 状态 4：回忆画卷 + 最终礼物 */
export default function StateMemories({ visible }) {
  if (!visible) return null;

  return (
    <motion.div
      className="relative z-30 bg-butter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
    >
      <div className="h-[30vh]" aria-hidden />

      {MEMORIES.map((memory, index) => (
        <ParallaxPhoto key={memory.id} memory={memory} index={index} />
      ))}

      <GiftReveal />
    </motion.div>
  );
}
