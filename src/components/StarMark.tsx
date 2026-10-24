import { constellations } from '../constellations';

export function StarMark({ mark, className = '' }: { mark: number; className?: string }) {
  const points = constellations[mark];
  return (
    <svg viewBox="0 0 200 200" className={`star-mark ${className}`} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="0.7" opacity="0.3">
        <circle cx="100" cy="100" r="85" />
        <circle cx="100" cy="100" r="62" strokeDasharray="2 5" />
        <ellipse cx="100" cy="100" rx="94" ry="35" transform={`rotate(${-32 + mark * 9} 100 100)`} />
        <path d="M100 5V23M100 177V195M5 100H23M177 100H195" />
      </g>
      <polyline points={points.map(([x, y]) => `${x},${y}`).join(' ')} stroke="currentColor" strokeWidth="1.4" />
      {points.map(([cx, cy], index) => (
        <g key={index}>
          <circle cx={cx} cy={cy} r={index === 2 ? 6 : 3} fill="currentColor" />
          {index === 2 && <circle cx={cx} cy={cy} r="11" stroke="currentColor" strokeWidth="0.6" />}
        </g>
      ))}
    </svg>
  );
}
