import { useEffect, useState } from 'react';
import { TIMELINE } from '../config/timeline';

export const PHASE = {
  DAWN: 'dawn',
  HEARTBEAT: 'heartbeat',
  MEETING: 'meeting',
  MEMORIES: 'memories',
};

function resolvePhase(elapsed) {
  if (elapsed < TIMELINE.DAWN_END) return PHASE.DAWN;
  if (elapsed < TIMELINE.HEARTBEAT_END) return PHASE.HEARTBEAT;
  if (elapsed < TIMELINE.MEETING_END) return PHASE.MEETING;
  return PHASE.MEMORIES;
}

/**
 * 全局时间轴编排器
 * 0–2s  破晓 | 2–5s 跳动 | 5–8s 相遇 | 8s+ 回忆
 */
export function useTimeline() {
  const [phase, setPhase] = useState(PHASE.DAWN);
  const [elapsed, setElapsed] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(true);

  useEffect(() => {
    const start = performance.now();
    let rafId;

    const tick = (now) => {
      const ms = now - start;
      setElapsed(ms);
      setPhase(resolvePhase(ms));

      if (ms < TIMELINE.MEETING_END) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const locked = phase !== PHASE.MEMORIES;
    setScrollLocked(locked);
    document.documentElement.classList.toggle('scroll-locked', locked);
    return () => document.documentElement.classList.remove('scroll-locked');
  }, [phase]);

  /** 状态 1 背景渐变进度 0 → 1 */
  const dawnProgress = Math.min(elapsed / TIMELINE.DAWN_END, 1);

  /** 状态 2 数字递增进度 0 → 1（2s–5s） */
  const countProgress =
    elapsed < TIMELINE.DAWN_END
      ? 0
      : Math.min((elapsed - TIMELINE.DAWN_END) / (TIMELINE.HEARTBEAT_END - TIMELINE.DAWN_END), 1);

  /** 状态 3 相遇光晕淡入进度 0 → 1（5s–8s） */
  const meetingGlowProgress =
    elapsed < TIMELINE.HEARTBEAT_END
      ? 0
      : Math.min((elapsed - TIMELINE.HEARTBEAT_END) / (TIMELINE.MEETING_END - TIMELINE.HEARTBEAT_END), 1);

  /** 状态 4 intro 退场进度 0 → 1（8s 后 1.2s 内完成） */
  const exitProgress =
    elapsed < TIMELINE.MEETING_END
      ? 0
      : Math.min((elapsed - TIMELINE.MEETING_END) / 1200, 1);

  return {
    phase,
    elapsed,
    scrollLocked,
    dawnProgress,
    countProgress,
    meetingGlowProgress,
    exitProgress,
  };
}
