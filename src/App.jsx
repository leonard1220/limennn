import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeroSection from './components/HeroSection';
import MemoryTimeline from './components/MemoryTimeline';
import RealtimeCounter from './components/RealtimeCounter';
import GiftReveal from './components/GiftReveal';

const birthDate = new Date("2007/06/01 00:00:00").getTime();
const metDate = new Date("2022/01/17 19:39:00").getTime();
const metSeconds = Math.floor((metDate - birthDate) / 1000);

export default function App() {
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [showGiftReveal, setShowGiftReveal] = useState(false);

  // Always start at top — disable browser's auto scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Lock / unlock body scroll based on intro state
  useEffect(() => {
    if (!isIntroFinished) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isIntroFinished]);

  return (
    // Outer wrapper: dark background for the memory sections
    <div style={{ backgroundColor: '#2d1f35', minHeight: '100vh' }}>

      {/*
        ── FIRST SCREEN: Hero Section ──
        This is a normal 100vh block — NOT fixed/absolute.
        It stays at the very top of the page.
        The animation plays here; after it finishes the user can scroll past it.
      */}
      <HeroSection
        metSeconds={metSeconds}
        isFinished={isIntroFinished}
        onComplete={() => setIsIntroFinished(true)}
      />

      {/*
        ── BELOW THE FOLD: Memories & Counter ──
        These are always rendered in the DOM (below 100vh),
        so they are ready when the user starts scrolling.
        Framer Motion's whileInView handles their entrance animations.
      */}
      <div
        style={{
          // Atmospheric background gradient for memory section
          background: 'linear-gradient(to bottom, #4A3B4C 0%, #2d1f35 30%)',
        }}
      >
        <MemoryTimeline />
        <RealtimeCounter onReveal={() => setShowGiftReveal(true)} />
      </div>

      {/* Gift Reveal Overlay */}
      <AnimatePresence>
        {showGiftReveal && <GiftReveal />}
      </AnimatePresence>
    </div>
  );
}
