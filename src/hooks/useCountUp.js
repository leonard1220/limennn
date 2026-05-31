import { useEffect, useRef, useState } from 'react';
import { easeOutExpo } from '../utils/formatNumber';

/**
 * 高性能数字跳动 — requestAnimationFrame + ease-out
 * @param {number} target   目标秒数（相遇时刻）
 * @param {number} progress 0–1 的时间进度（由 useTimeline 驱动）
 * @param {boolean} frozen  骤停后锁定数值
 */
export function useCountUp(target, progress, frozen = false) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);
  const lastRef = useRef(0);

  useEffect(() => {
    if (frozen) {
      setDisplay(target);
      return;
    }

    const animate = () => {
      const t = Math.min(progress, 1);
      const eased = easeOutExpo(t);
      const next = t >= 1 ? target : Math.floor(eased * target);

      if (next !== lastRef.current) {
        lastRef.current = next;
        setDisplay(next);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else if (lastRef.current !== target) {
        lastRef.current = target;
        setDisplay(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, progress, frozen]);

  return display;
}
