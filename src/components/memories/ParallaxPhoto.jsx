import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/** 单张回忆 — 视差 + 左右交替排版 */
export default function ParallaxPhoto({ memory, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  const isLeft = memory.align === 'left';

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-16 py-24"
    >
      <motion.div
        style={{ opacity }}
        className={`flex flex-col gap-10 md:gap-14 w-full max-w-5xl ${
          isLeft ? 'md:flex-row md:items-center' : 'md:flex-row-reverse md:items-center'
        }`}
      >
        <motion.div
          style={{ y: imageY }}
          className="flex-1 flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]">
            <img
              src={memory.image}
              alt={memory.caption}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        </motion.div>

        <motion.div
          style={{ y: textY }}
          className={`flex-1 flex ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
        >
          <p className="text-base md:text-lg font-light tracking-[0.15em] text-neutral-400 leading-relaxed max-w-xs">
            {memory.caption}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
