export function formatAngle(angle) {
  const absAngle = Math.abs(angle);
  const sign = angle < 0 ? '-' : '+';
  const formatted = absAngle < 10 
    ? `0${absAngle.toFixed(1)}` 
    : absAngle.toFixed(1);
  return `${sign}${formatted}°`;
}
