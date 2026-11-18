import { useId } from 'react';
import { COUNTRY_250_MAP, type CountryDef } from '../data/flags250';

interface FlagBadgeProps {
  code: string;
  size?: number;
  fluid?: boolean;
  className?: string;
}

export function FlagBadge({ code, size = 32, fluid = false, className = '' }: FlagBadgeProps) {
  const uid = useId();
  const country = COUNTRY_250_MAP[code];
  if (!country) {
    return (
      <span
        style={fluid ? undefined : { width: size, height: size }}
        className={`inline-flex items-center justify-center rounded-full border border-white/20 bg-slate-800 font-mono text-[9px] font-bold text-slate-200 ${
          fluid ? 'h-full w-full' : ''
        } ${className}`}
      >
        {code.slice(0, 3)}
      </span>
    );
  }

  return (
    <svg
      width={fluid ? '100%' : size}
      height={fluid ? '100%' : size}
      viewBox="0 0 64 64"
      aria-label={country.name}
      className={`shrink-0 rounded-full bg-[#0B0F19] ${className}`}
    >
      <defs>
        <clipPath id={`fc-${code}-${uid}`}>
          <circle cx="32" cy="32" r="30" />
        </clipPath>
      </defs>
      <g clipPath={`url(#fc-${code}-${uid})`}>{renderSvgPattern(country)}</g>
      <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2.5" />
    </svg>
  );
}

function renderSvgPattern(c: CountryDef) {
  const [c1, c2, c3, c4] = c.colors;
  const shapes: React.ReactNode[] = [];

  switch (c.pattern) {
    case 'h_bicolor':
      shapes.push(<rect key="1" x="0" y="0" width="64" height="33" fill={c1} />);
      shapes.push(<rect key="2" x="0" y="32" width="64" height="32" fill={c2} />);
      break;
    case 'h_tricolor':
      shapes.push(<rect key="1" x="0" y="0" width="64" height="22" fill={c1} />);
      shapes.push(<rect key="2" x="0" y="21" width="64" height="22" fill={c2} />);
      shapes.push(<rect key="3" x="0" y="42" width="64" height="22" fill={c3} />);
      break;
    case 'h_four':
      shapes.push(<rect key="1" x="0" y="0" width="64" height="17" fill={c1} />);
      shapes.push(<rect key="2" x="0" y="16" width="64" height="17" fill={c2} />);
      shapes.push(<rect key="3" x="0" y="32" width="64" height="17" fill={c3} />);
      shapes.push(<rect key="4" x="0" y="48" width="64" height="16" fill={c4 || c1} />);
      break;
    case 'v_bicolor':
      shapes.push(<rect key="1" x="0" y="0" width="33" height="64" fill={c1} />);
      shapes.push(<rect key="2" x="32" y="0" width="32" height="64" fill={c2} />);
      break;
    case 'v_tricolor':
      shapes.push(<rect key="1" x="0" y="0" width="22" height="64" fill={c1} />);
      shapes.push(<rect key="2" x="21" y="0" width="22" height="64" fill={c2} />);
      shapes.push(<rect key="3" x="42" y="0" width="22" height="64" fill={c3} />);
      break;
    case 'nordic':
      shapes.push(<rect key="bg" x="0" y="0" width="64" height="64" fill={c1} />);
      if (c3) {
        shapes.push(<rect key="v1" x="18" y="0" width="12" height="64" fill={c2} />);
        shapes.push(<rect key="h1" x="0" y="26" width="64" height="12" fill={c2} />);
        shapes.push(<rect key="v2" x="21" y="0" width="6" height="64" fill={c3} />);
        shapes.push(<rect key="h2" x="0" y="29" width="64" height="6" fill={c3} />);
      } else {
        shapes.push(<rect key="v" x="20" y="0" width="9" height="64" fill={c2} />);
        shapes.push(<rect key="h" x="0" y="27" width="64" height="9" fill={c2} />);
      }
      break;
    case 'cross':
      shapes.push(<rect key="bg" x="0" y="0" width="64" height="64" fill={c1} />);
      shapes.push(<rect key="v" x="26" y="0" width="12" height="64" fill={c2} />);
      shapes.push(<rect key="h" x="0" y="26" width="64" height="12" fill={c2} />);
      if (c3) {
        shapes.push(<rect key="v2" x="28" y="0" width="8" height="64" fill={c3} />);
        shapes.push(<rect key="h2" x="0" y="28" width="64" height="8" fill={c3} />);
      }
      break;
    case 'saltire':
      shapes.push(<rect key="bg" x="0" y="0" width="64" height="64" fill={c1} />);
      shapes.push(<path key="s1" d="M0,0 L64,64 M64,0 L0,64" stroke={c2} strokeWidth="11" />);
      if (c3) {
        shapes.push(<path key="s2" d="M0,0 L64,64 M64,0 L0,64" stroke={c3} strokeWidth="5.5" />);
      }
      break;
    case 'canton_stripes':
      shapes.push(<rect key="bg" x="0" y="0" width="64" height="64" fill={c2} />);
      for (let i = 0; i < 7; i += 2) {
        shapes.push(<rect key={`st-${i}`} x="0" y={i * 9.5} width="64" height="9.5" fill={c1} />);
      }
      shapes.push(<rect key="can" x="0" y="0" width="32" height="32" fill={c3 || c1} />);
      break;
    case 'canton_solid':
      shapes.push(<rect key="1" x="0" y="0" width="64" height="33" fill={c1} />);
      shapes.push(<rect key="2" x="0" y="32" width="64" height="32" fill={c2} />);
      shapes.push(<rect key="can" x="0" y="0" width="32" height="32" fill={c3 || c1} />);
      break;
    case 'union_canton':
      shapes.push(<rect key="bg" x="0" y="0" width="64" height="64" fill={c1} />);
      shapes.push(<rect key="v1" x="13" y="0" width="6" height="32" fill={c2} />);
      shapes.push(<rect key="h1" x="0" y="13" width="32" height="6" fill={c2} />);
      shapes.push(<rect key="v2" x="14.5" y="0" width="3" height="32" fill={c3 || '#C8102E'} />);
      shapes.push(<rect key="h2" x="0" y="14.5" width="32" height="3" fill={c3 || '#C8102E'} />);
      break;
    case 'circle':
      shapes.push(<rect key="bg" x="0" y="0" width="64" height="64" fill={c1} />);
      if (c2 && c2 !== c1) {
        shapes.push(<circle key="c" cx="32" cy="32" r="14" fill={c2} />);
      }
      break;
    case 'circle_off':
      shapes.push(<rect key="bg" x="0" y="0" width="64" height="64" fill={c1} />);
      shapes.push(<circle key="c" cx="27" cy="32" r="14" fill={c2} />);
      break;
    case 'diamond':
      shapes.push(<rect key="bg" x="0" y="0" width="64" height="64" fill={c1} />);
      shapes.push(<polygon key="d" points="32,9 56,32 32,55 8,32" fill={c2} />);
      if (c3) shapes.push(<circle key="c" cx="32" cy="32" r="11" fill={c3} />);
      break;
    case 'chevron_h2':
      shapes.push(<rect key="1" x="0" y="0" width="64" height="33" fill={c2} />);
      shapes.push(<rect key="2" x="0" y="32" width="64" height="32" fill={c3 || c2} />);
      shapes.push(<polygon key="ch" points="0,0 34,32 0,64" fill={c1} />);
      break;
    case 'chevron_h3':
      shapes.push(<rect key="1" x="0" y="0" width="64" height="22" fill={c2} />);
      shapes.push(<rect key="2" x="0" y="21" width="64" height="22" fill={c3 || c2} />);
      shapes.push(<rect key="3" x="0" y="42" width="64" height="22" fill={c4 || c2} />);
      shapes.push(<polygon key="ch" points="0,0 34,32 0,64" fill={c1} />);
      break;
    case 'diagonal':
      shapes.push(<rect key="1" x="0" y="0" width="64" height="64" fill={c1} />);
      shapes.push(<polygon key="2" points="64,0 64,64 0,64" fill={c3 || c2} />);
      shapes.push(<line key="3" x1="0" y1="64" x2="64" y2="0" stroke={c2} strokeWidth="12" />);
      break;
    case 'vertical_band_h2':
      shapes.push(<rect key="1" x="0" y="0" width="64" height="33" fill={c2} />);
      shapes.push(<rect key="2" x="0" y="32" width="64" height="32" fill={c3 || c2} />);
      shapes.push(<rect key="vb" x="0" y="0" width="21" height="64" fill={c1} />);
      break;
    case 'vertical_band_h3':
      shapes.push(<rect key="1" x="0" y="0" width="64" height="22" fill={c2} />);
      shapes.push(<rect key="2" x="0" y="21" width="64" height="22" fill={c3 || c2} />);
      shapes.push(<rect key="3" x="0" y="42" width="64" height="22" fill={c4 || c2} />);
      shapes.push(<rect key="vb" x="0" y="0" width="20" height="64" fill={c1} />);
      break;
    case 'quad':
      shapes.push(<rect key="1" x="0" y="0" width="33" height="33" fill={c1} />);
      shapes.push(<rect key="2" x="32" y="0" width="32" height="33" fill={c2} />);
      shapes.push(<rect key="3" x="0" y="32" width="33" height="32" fill={c3 || c2} />);
      shapes.push(<rect key="4" x="32" y="32" width="32" height="32" fill={c4 || c1} />);
      break;
  }

  if (c.emblem && c.emblem !== 'none') {
    const ec = c.emblemColor || '#FFFFFF';
    if (c.emblem === 'star') {
      shapes.push(
        <polygon
          key="em"
          points="32,20 35,29 44,29 37,35 39,44 32,39 25,44 27,35 20,29 29,29"
          fill={ec}
        />
      );
    } else if (c.emblem === 'stars3') {
      shapes.push(<circle key="e1" cx="24" cy="27" r="3.5" fill={ec} />);
      shapes.push(<circle key="e2" cx="40" cy="27" r="3.5" fill={ec} />);
      shapes.push(<circle key="e3" cx="32" cy="40" r="3.5" fill={ec} />);
    } else if (c.emblem === 'crescent') {
      shapes.push(<circle key="cr1" cx="30" cy="32" r="11" fill={ec} />);
      shapes.push(<circle key="cr2" cx="34" cy="32" r="9" fill={c1} />);
    } else if (c.emblem === 'sun' || c.emblem === 'wheel') {
      shapes.push(<circle key="su" cx="32" cy="32" r="8" fill={ec} />);
    } else if (c.emblem === 'maple') {
      shapes.push(
        <polygon key="mp" points="32,18 39,35 34,35 34,46 30,46 30,35 25,35" fill={ec} />
      );
    } else if (c.emblem === 'circle') {
      shapes.push(<circle key="ci" cx="32" cy="32" r="9" fill={ec} />);
    } else if (c.emblem === 'cross') {
      shapes.push(<rect key="cx1" x="29" y="21" width="6" height="22" fill={ec} />);
      shapes.push(<rect key="cx2" x="21" y="29" width="22" height="6" fill={ec} />);
    } else {
      shapes.push(
        <polygon key="sh" points="25,24 39,24 39,34 32,42 25,34" fill={ec} />
      );
    }
  }

  return shapes;
}
