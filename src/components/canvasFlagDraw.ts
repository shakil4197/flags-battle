import type { CountryDef, FlagEmblem } from '../data/flags250';

export function drawCountryFlagCircle(
  ctx: CanvasRenderingContext2D,
  c: CountryDef,
  x: number,
  y: number,
  r: number
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  const d = r * 2;
  const [c1, c2, c3, c4] = c.colors;

  switch (c.pattern) {
    case 'h_bicolor': {
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, d, r + 0.5);
      ctx.fillStyle = c2;
      ctx.fillRect(-r, 0, d, r + 0.5);
      break;
    }
    case 'h_tricolor': {
      const h = d / 3;
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, d, h + 0.8);
      ctx.fillStyle = c2;
      ctx.fillRect(-r, -r + h, d, h + 0.8);
      ctx.fillStyle = c3;
      ctx.fillRect(-r, -r + h * 2, d, h + 0.8);
      break;
    }
    case 'h_four': {
      const h = d / 4;
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, d, h + 0.8);
      ctx.fillStyle = c2;
      ctx.fillRect(-r, -r + h, d, h + 0.8);
      ctx.fillStyle = c3;
      ctx.fillRect(-r, -r + h * 2, d, h + 0.8);
      ctx.fillStyle = c4 || c1;
      ctx.fillRect(-r, -r + h * 3, d, h + 0.8);
      break;
    }
    case 'v_bicolor': {
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, r + 0.5, d);
      ctx.fillStyle = c2;
      ctx.fillRect(0, -r, r + 0.5, d);
      break;
    }
    case 'v_tricolor': {
      const w = d / 3;
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, w + 0.8, d);
      ctx.fillStyle = c2;
      ctx.fillRect(-r + w, -r, w + 0.8, d);
      ctx.fillStyle = c3;
      ctx.fillRect(-r + w * 2, -r, w + 0.8, d);
      break;
    }
    case 'nordic': {
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, d, d);
      if (c3) {
        ctx.fillStyle = c2;
        ctx.fillRect(-r * 0.42, -r, r * 0.36, d);
        ctx.fillRect(-r, -r * 0.18, d, r * 0.36);
        ctx.fillStyle = c3;
        ctx.fillRect(-r * 0.34, -r, r * 0.2, d);
        ctx.fillRect(-r, -r * 0.1, d, r * 0.2);
      } else {
        ctx.fillStyle = c2;
        ctx.fillRect(-r * 0.36, -r, r * 0.26, d);
        ctx.fillRect(-r, -r * 0.13, d, r * 0.26);
      }
      break;
    }
    case 'cross': {
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, d, d);
      if (c3) {
        ctx.fillStyle = c2;
        ctx.fillRect(-r * 0.22, -r, r * 0.44, d);
        ctx.fillRect(-r, -r * 0.22, d, r * 0.44);
        ctx.fillStyle = c3;
        ctx.fillRect(-r * 0.12, -r, r * 0.24, d);
        ctx.fillRect(-r, -r * 0.12, d, r * 0.24);
      } else {
        ctx.fillStyle = c2;
        ctx.fillRect(-r * 0.16, -r, r * 0.32, d);
        ctx.fillRect(-r, -r * 0.16, d, r * 0.32);
      }
      break;
    }
    case 'saltire': {
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, d, d);
      ctx.strokeStyle = c2;
      ctx.lineWidth = r * 0.34;
      ctx.beginPath();
      ctx.moveTo(-r, -r);
      ctx.lineTo(r, r);
      ctx.moveTo(r, -r);
      ctx.lineTo(-r, r);
      ctx.stroke();
      if (c3) {
        ctx.strokeStyle = c3;
        ctx.lineWidth = r * 0.18;
        ctx.beginPath();
        ctx.moveTo(-r, -r);
        ctx.lineTo(r, r);
        ctx.moveTo(r, -r);
        ctx.lineTo(-r, r);
        ctx.stroke();
      }
      break;
    }
    case 'canton_stripes': {
      ctx.fillStyle = c2;
      ctx.fillRect(-r, -r, d, d);
      ctx.fillStyle = c1;
      const sh = d / 7;
      for (let i = 0; i < 7; i += 2) {
        ctx.fillRect(-r, -r + i * sh, d, sh);
      }
      ctx.fillStyle = c3 || c1;
      ctx.fillRect(-r, -r, r, r);
      break;
    }
    case 'canton_solid': {
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, d, r + 0.5);
      ctx.fillStyle = c2;
      ctx.fillRect(-r, 0, d, r + 0.5);
      ctx.fillStyle = c3 || c1;
      ctx.fillRect(-r, -r, r, r);
      break;
    }
    case 'union_canton': {
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, d, d);
      ctx.fillStyle = c2;
      ctx.fillRect(-r * 0.58, -r, r * 0.18, r);
      ctx.fillRect(-r, -r * 0.58, r, r * 0.18);
      ctx.fillStyle = c3 || '#C8102E';
      ctx.fillRect(-r * 0.54, -r, r * 0.1, r);
      ctx.fillRect(-r, -r * 0.54, r, r * 0.1);
      break;
    }
    case 'circle': {
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, d, d);
      if (c2 && c2 !== c1) {
        ctx.fillStyle = c2;
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.44, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 'circle_off': {
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, d, d);
      ctx.fillStyle = c2;
      ctx.beginPath();
      ctx.arc(-r * 0.14, 0, r * 0.42, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'diamond': {
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, d, d);
      ctx.fillStyle = c2;
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.72);
      ctx.lineTo(r * 0.78, 0);
      ctx.lineTo(0, r * 0.72);
      ctx.lineTo(-r * 0.78, 0);
      ctx.closePath();
      ctx.fill();
      if (c3) {
        ctx.fillStyle = c3;
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.34, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 'chevron_h2': {
      ctx.fillStyle = c2;
      ctx.fillRect(-r, -r, d, r + 0.5);
      ctx.fillStyle = c3 || c2;
      ctx.fillRect(-r, 0, d, r + 0.5);
      ctx.fillStyle = c1;
      ctx.beginPath();
      ctx.moveTo(-r, -r);
      ctx.lineTo(r * 0.1, 0);
      ctx.lineTo(-r, r);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'chevron_h3': {
      const h = d / 3;
      ctx.fillStyle = c2;
      ctx.fillRect(-r, -r, d, h + 0.8);
      ctx.fillStyle = c3 || c2;
      ctx.fillRect(-r, -r + h, d, h + 0.8);
      ctx.fillStyle = c4 || c2;
      ctx.fillRect(-r, -r + h * 2, d, h + 0.8);
      ctx.fillStyle = c1;
      ctx.beginPath();
      ctx.moveTo(-r, -r);
      ctx.lineTo(r * 0.1, 0);
      ctx.lineTo(-r, r);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'diagonal': {
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, d, d);
      ctx.fillStyle = c3 || c2;
      ctx.beginPath();
      ctx.moveTo(r, -r);
      ctx.lineTo(r, r);
      ctx.lineTo(-r, r);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = c2;
      ctx.lineWidth = r * 0.36;
      ctx.beginPath();
      ctx.moveTo(-r, r);
      ctx.lineTo(r, -r);
      ctx.stroke();
      break;
    }
    case 'vertical_band_h2': {
      ctx.fillStyle = c2;
      ctx.fillRect(-r, -r, d, r + 0.5);
      ctx.fillStyle = c3 || c2;
      ctx.fillRect(-r, 0, d, r + 0.5);
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, r * 0.65, d);
      break;
    }
    case 'vertical_band_h3': {
      const h = d / 3;
      ctx.fillStyle = c2;
      ctx.fillRect(-r, -r, d, h + 0.8);
      ctx.fillStyle = c3 || c2;
      ctx.fillRect(-r, -r + h, d, h + 0.8);
      ctx.fillStyle = c4 || c2;
      ctx.fillRect(-r, -r + h * 2, d, h + 0.8);
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, r * 0.6, d);
      break;
    }
    case 'quad': {
      ctx.fillStyle = c1;
      ctx.fillRect(-r, -r, r + 0.5, r + 0.5);
      ctx.fillStyle = c2;
      ctx.fillRect(0, -r, r + 0.5, r + 0.5);
      ctx.fillStyle = c3 || c2;
      ctx.fillRect(-r, 0, r + 0.5, r + 0.5);
      ctx.fillStyle = c4 || c1;
      ctx.fillRect(0, 0, r + 0.5, r + 0.5);
      break;
    }
  }

  if (c.emblem && c.emblem !== 'none') {
    drawEmblem(ctx, c.emblem, c.emblemColor || '#FFFFFF', r, c1);
  }

  ctx.restore();

  // Crisp outer medallion ring
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.38)';
  ctx.lineWidth = Math.max(1.2, r * 0.08);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawEmblem(
  ctx: CanvasRenderingContext2D,
  emblem: FlagEmblem,
  color: string,
  r: number,
  bgColor: string
) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  switch (emblem) {
    case 'star':
      drawStar(ctx, 0, 0, 5, r * 0.36, r * 0.15, color);
      break;
    case 'stars3':
      drawStar(ctx, -r * 0.25, -r * 0.15, 5, r * 0.16, r * 0.07, color);
      drawStar(ctx, r * 0.22, -r * 0.15, 5, r * 0.16, r * 0.07, color);
      drawStar(ctx, 0, r * 0.22, 5, r * 0.16, r * 0.07, color);
      break;
    case 'crescent':
      ctx.beginPath();
      ctx.arc(-r * 0.08, 0, r * 0.34, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.arc(r * 0.05, 0, r * 0.27, 0, Math.PI * 2);
      ctx.fill();
      drawStar(ctx, r * 0.3, 0, 5, r * 0.14, r * 0.06, color);
      break;
    case 'sun':
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.24, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'wheel':
      ctx.lineWidth = Math.max(1.2, r * 0.09);
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.26, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.08, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'maple':
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.38);
      ctx.lineTo(r * 0.24, r * 0.14);
      ctx.lineTo(r * 0.05, r * 0.14);
      ctx.lineTo(r * 0.05, r * 0.36);
      ctx.lineTo(-r * 0.05, r * 0.36);
      ctx.lineTo(-r * 0.05, r * 0.14);
      ctx.lineTo(-r * 0.24, r * 0.14);
      ctx.closePath();
      ctx.fill();
      break;
    case 'shield':
      ctx.beginPath();
      ctx.moveTo(-r * 0.22, -r * 0.22);
      ctx.lineTo(r * 0.22, -r * 0.22);
      ctx.lineTo(r * 0.22, r * 0.04);
      ctx.lineTo(0, r * 0.28);
      ctx.lineTo(-r * 0.22, r * 0.04);
      ctx.closePath();
      ctx.fill();
      break;
    case 'crown':
      ctx.beginPath();
      ctx.moveTo(-r * 0.26, r * 0.18);
      ctx.lineTo(-r * 0.26, -r * 0.14);
      ctx.lineTo(-r * 0.08, 0);
      ctx.lineTo(0, -r * 0.24);
      ctx.lineTo(r * 0.08, 0);
      ctx.lineTo(r * 0.26, -r * 0.14);
      ctx.lineTo(r * 0.26, r * 0.18);
      ctx.closePath();
      ctx.fill();
      break;
    case 'yin_yang':
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.38, 0, Math.PI);
      ctx.fill();
      break;
    case 'circle':
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'cross': {
      const arm = r * 0.28;
      const thick = Math.max(2, r * 0.14);
      ctx.fillRect(-thick / 2, -arm, thick, arm * 2);
      ctx.fillRect(-arm, -thick / 2, arm * 2, thick);
      break;
    }
  }
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerR: number,
  innerR: number,
  fill: string
) {
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerR);
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
    rot += step;
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}
