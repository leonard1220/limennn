import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const floatVariants = {
  float: {
    y: [0, -10, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }
  }
};

export default function RealtimeCounter({ onReveal }) {
  const [secondsSinceBirth, setSecondsSinceBirth] = useState(0);

  useEffect(() => {
    const birthDate = new Date("2007/06/01 00:00:00").getTime();

    const updateCounter = () => {
      const now = new Date().getTime();
      const diffInSeconds = Math.floor((now - birthDate) / 1000);
      setSecondsSinceBirth(diffInSeconds);
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-40 mb-40">
      <motion.div
        className="text-center space-y-12"
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        <motion.div variants={floatVariants} animate="float" className="flex flex-col items-center" style={{ willChange: 'transform' }}>
          <div className="text-white/50 font-thin tracking-widest text-sm mb-6">
            从2007年6月1日到现在的每一秒
          </div>
          
          <motion.div
            className="text-5xl md:text-7xl font-thin counter-digits text-white"
            animate={{
              textShadow: [
                "0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,200,150,0.1)",
                "0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,200,150,0.3)",
                "0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,200,150,0.1)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {secondsSinceBirth.toLocaleString()}
          </motion.div>

          <div className="mt-32">
            <motion.div
              onClick={onReveal}
              className="cursor-pointer flex flex-col items-center group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Star / Candle icon placeholder */}
              <motion.div 
                className="w-4 h-4 rounded-full bg-[#FFF8F0] mb-4"
                animate={{
                  boxShadow: [
                    "0 0 10px #FFF8F0, 0 0 20px #FFB885",
                    "0 0 20px #FFF8F0, 0 0 40px #FFB885",
                    "0 0 10px #FFF8F0, 0 0 20px #FFB885"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-white/80 font-thin tracking-widest text-lg group-hover:text-white transition-colors duration-500 text-glow-candle">
                揭晓礼物
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
