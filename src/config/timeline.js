/**
 * 时间轴与个性化配置
 * ─────────────────────────────────────────
 * 修改 BIRTH_DATE 与 MEETING_DATE 即可自动计算相遇秒数
 */

/** 剧本时间节点（毫秒） */
export const TIMELINE = {
  /** 状态 1 结束：破晓 → 初生黄 */
  DAWN_END: 2000,
  /** 状态 2 结束：数字疯狂递增 */
  HEARTBEAT_END: 5000,
  /** 状态 3 结束：数字骤停 + 心动粉光晕 */
  MEETING_END: 8000,
};

/** 她的生日（世界开始运转的起点） */
export const BIRTH_DATE = new Date('2000-05-20T00:00:00');

/** 你们相遇的日期 */
export const MEETING_DATE = new Date('2020-08-15T14:30:00');

/**
 * 计算从生日到相遇经过的秒数
 * 这就是状态 3 数字骤停时的「X」
 */
export function getMeetingSecond() {
  const diffMs = MEETING_DATE.getTime() - BIRTH_DATE.getTime();
  return Math.floor(diffMs / 1000);
}

/** 回忆照片配置 — 替换 image 路径与 caption 即可 */
export const MEMORIES = [
  {
    id: 'memory-1',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
    caption: '第一次一起看的日落',
    align: 'left',
  },
  {
    id: 'memory-2',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a57590a5?w=800&q=80',
    caption: '你笑起来的样子，我记了很久',
    align: 'right',
  },
  {
    id: 'memory-3',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    caption: '那些说不出口的话，都在眼神里',
    align: 'left',
  },
  {
    id: 'memory-4',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    caption: '每一帧，都是只属于我们的电影',
    align: 'right',
  },
];

/** 最终礼物图片 */
export const GIFT_IMAGE =
  'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=900&q=80';

export const GIFT_CAPTION = '生日快乐，我的全世界。';
