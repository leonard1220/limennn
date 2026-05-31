import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const gifts = [
  {
    id: 1,
    emoji: '📱',
    name: '手机壳',
    brand: 'Velvet Caviar',
    desc: '柠檬黄硅胶壳，让你的手机和你一样，温柔又耀眼。',
    image: '/photos/gift-case.webp',
    color: 'rgba(255, 240, 120, 0.12)',
  },
  {
    id: 2,
    emoji: '🔋',
    name: '充电宝',
    brand: 'Velvet Caviar',
    desc: '随时随地满格出发，因为你的每一刻都值得被记录。',
    image: '/photos/gift-powerbank.webp',
    color: 'rgba(255, 240, 120, 0.12)',
  },
  {
    id: 3,
    emoji: '💛',
    name: '钱包',
    brand: 'Velvet Caviar',
    desc: '装下你所有的珍贵，就像我装下了关于你的一切。',
    image: '/photos/gift-wallet.webp',
    color: 'rgba(255, 240, 120, 0.12)',
  },
  {
    id: 4,
    emoji: '🌐',
    name: '这个网站',
    brand: '一年所有权',
    desc: '这里住着我们所有的光。它是你的，一整年。',
    image: null,
    color: 'rgba(200, 180, 255, 0.12)',
  },
];

export default function GiftReveal({ onClose }) {
  const [phase, setPhase] = useState('flash'); // 'flash' → 'reveal'

  useEffect(() => {
    const t = setTimeout(() => setPhase('reveal'), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-start overflow-y-auto cursor-pointer"
      initial={{ backgroundColor: 'rgba(255,255,255,0)' }}
      animate={{
        backgroundColor:
          phase === 'flash'
            ? 'rgba(255,255,255,1)'
            : 'rgba(252, 248, 240, 1)',
      }}
      transition={{ duration: 2.5, ease: 'easeInOut' }}
    >
      {phase === 'reveal' && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md mx-auto px-6 pt-16 pb-24 flex flex-col items-center gap-6 cursor-default"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          >
            <div className="text-3xl mb-3">🎂</div>
            <h1
              className="text-2xl font-thin tracking-widest"
              style={{
                color: '#5a4a3a',
                textShadow: '0 0 20px rgba(180,140,80,0.3)',
                wordBreak: 'keep-all',
              }}
            >
              生日快乐
            </h1>
            <p
              className="text-sm font-thin tracking-widest mt-2"
              style={{ color: '#9a8a7a', wordBreak: 'keep-all' }}
            >
              这里有四件小小的礼物，等你收下。
            </p>
          </motion.div>

          {/* Gift Cards */}
          {gifts.map((gift, index) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                ease: 'easeOut',
                delay: 0.6 + index * 0.35,
              }}
              className="w-full rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.7)',
                boxShadow:
                  '0 4px 30px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
              }}
            >
              {/* Product image */}
              {gift.image ? (
                <div
                  className="w-full flex items-center justify-center py-8 px-6"
                  style={{ background: gift.color }}
                >
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-48 h-48 object-contain drop-shadow-sm"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = `<div class="w-48 h-48 flex items-center justify-center text-6xl">${gift.emoji}</div>`;
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-full flex items-center justify-center py-10"
                  style={{ background: gift.color }}
                >
                  <div className="text-7xl">{gift.emoji}</div>
                </div>
              )}

              {/* Text */}
              <div className="px-6 py-5">
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="text-xl font-thin tracking-widest"
                    style={{ color: '#3a2a1a' }}
                  >
                    {gift.name}
                  </span>
                  <span
                    className="text-xs font-thin tracking-widest"
                    style={{ color: '#b0a090' }}
                  >
                    {gift.brand}
                  </span>
                </div>
                <p
                  className="text-sm font-thin leading-relaxed"
                  style={{ color: '#7a6a5a', wordBreak: 'keep-all' }}
                >
                  {gift.desc}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Final message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 2.4 }}
            className="text-center text-sm font-thin tracking-widest mt-6"
            style={{ color: '#9a8a7a', wordBreak: 'keep-all' }}
          >
            谢谢你出现在我的世界里。
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
}
