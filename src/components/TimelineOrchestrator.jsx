import { AnimatePresence } from 'framer-motion';
import { useTimeline, PHASE } from '../hooks/useTimeline';
import { useCountUp } from '../hooks/useCountUp';
import { getMeetingSecond } from '../config/timeline';
import StateDawn from './states/StateDawn';
import StateCounter from './states/StateCounter';
import StateMeetingGlow from './states/StateMeetingGlow';
import StateMemories from './states/StateMemories';

/** 全局剧本编排 — 四段状态严格按时间轴流转 */
export default function TimelineOrchestrator() {
  const {
    phase,
    dawnProgress,
    countProgress,
    meetingGlowProgress,
    exitProgress,
  } = useTimeline();

  const meetingSecond = getMeetingSecond();
  const isFrozen = phase === PHASE.MEETING || phase === PHASE.MEMORIES;
  const counterValue = useCountUp(meetingSecond, countProgress, isFrozen);

  const showCounter = phase !== PHASE.DAWN;
  const showGlow = phase === PHASE.MEETING || phase === PHASE.MEMORIES;
  const showMemories = phase === PHASE.MEMORIES;

  const subtitle =
    phase === PHASE.HEARTBEAT
      ? '美美的你诞生了。'
      : phase === PHASE.MEETING || (phase === PHASE.MEMORIES && exitProgress < 1)
        ? `直到这世界运转到第 ${meetingSecond.toLocaleString('en-US')} 秒，我们的轨迹重合了。`
        : null;

  const subtitleKey =
    phase === PHASE.HEARTBEAT ? 'birth' : phase === PHASE.MEETING ? 'meeting' : 'exit';

  return (
    <>
      <StateDawn progress={dawnProgress} />

      <AnimatePresence>
        {showGlow && <StateMeetingGlow key="glow" progress={meetingGlowProgress} />}
      </AnimatePresence>

      <StateCounter
        value={counterValue}
        subtitle={subtitle}
        subtitleKey={subtitleKey}
        exitProgress={exitProgress}
        showCounter={showCounter && exitProgress < 1}
        frozen={isFrozen}
      />

      <StateMemories visible={showMemories} />
    </>
  );
}
