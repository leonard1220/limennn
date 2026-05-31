/**
 * ease-out exponential — 前段极快、末段明显减速后定格
 * 比 cubic 更符合「疯狂递增 → 缓缓落定」的观感
 */
export function easeOutExpo(t) {
  if (t >= 1) return 1;
  if (t <= 0) return 0;
  return 1 - 2 ** (-10 * t);
}

/** @deprecated 保留别名，统一走 easeOutExpo */
export const easeOutCubic = easeOutExpo;

/** 格式化大数字：等宽 + 千位分隔 */
export function formatSeconds(value) {
  return Math.floor(value).toLocaleString('en-US');
}
