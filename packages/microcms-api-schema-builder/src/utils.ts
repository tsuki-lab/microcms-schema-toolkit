/**
 * 10桁のランダムな英数字を生成する。
 * @returns
 */
export function generateId() {
  return Math.random().toString(36).slice(-10);
}
