/**
 * 1ランダムな英数字を生成する。
 * @returns
 */
export function generateId(number: number = 10) {
  return Math.random()
    .toString(36)
    .slice(number * -1);
}
