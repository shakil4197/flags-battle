import { useEffect, useRef } from 'react';
import { arcadeAudio } from '../audio/arcadeAudio';
import { COUNTRY_250_MAP, type CountryDef } from '../data/flags250';
import { drawCountryFlagCircle } from './canvasFlagDraw';

type OrbKind = 'SAW' | 'SHD';

interface FlagEntity {
  code: string;
  country: CountryDef;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alive: boolean;
  flash: number;
  squash: number;
  squashVel: number;
  squashAngle: number;
  shielded: boolean;
  sawTimer: number;
  sawAngle: number;
  sawHitCooldown: number;
  trail: Array<{ x: number; y: number }>;
}

interface ArenaOrb {
  id: number;
  kind: OrbKind;
  x: number;
  y: number;
  r: number;
  pulse: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface FloatingNotice {
  x: number;
  y: number;
  vy: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
}

interface FlagArenaCanvasProps {
  participants: string[];
  targetSurvivors: number;
  matchSeed: number;
  isActive: boolean;
  isFinal: boolean;
  onEliminated: (aliveCodes: string[], eliminatedCode: string) => void;
  onRoundComplete: (survivorCodes: string[]) => void;
}

const LOGICAL_W = 500;
const LOGICAL_H = 500;
const CX = LOGICAL_W / 2;
const CY = LOGICAL_H / 2;
const INITIAL_RING_R = 236;

function normalizeAngle(a: number): number {
  let res = a % (Math.PI * 2);
  if (res < 0) res += Math.PI * 2;
  return res;
}

function isAngleInGap(angle: number, gapCenter: number, gapHalfWidth: number): boolean {
  const diff = Math.abs(normalizeAngle(angle - gapCenter + Math.PI) - Math.PI);
  return diff <= gapHalfWidth;
}

export function FlagArenaCanvas({
  participants,
  targetSurvivors,
  matchSeed,
  isActive,
  isFinal,
  onEliminated,
  onRoundComplete,
}: FlagArenaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onEliminatedRef = useRef(onEliminated);
  const onRoundCompleteRef = useRef(onRoundComplete);
  onEliminatedRef.current = onEliminated;
  onRoundCompleteRef.current = onRoundComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = LOGICAL_W * dpr;
    canvas.height = LOGICAL_H * dpr;

    const count = participants.length;
    const baseRadius = count > 24 ? 13 : 19.5;
    // Bouncy speeds calibrated so matches stay suspenseful (~75-95s team / ~45-60s final)
    const minSpeed = count > 24 ? 115 : 132;
    const maxSpeed = count > 24 ? 215 : 240;

    const entities: FlagEntity[] = participants.map((code, idx) => {
      const country = COUNTRY_250_MAP[code] || {
        code,
        name: code,
        pattern: 'h_bicolor' as const,
        colors: ['#22D3EE', '#0F172A'],
      };

      const ringRatio = count > 1 ? Math.sqrt((idx + 0.6) / count) : 0;
      const dist = ringRatio * (INITIAL_RING_R - baseRadius * 2.4);
      const goldenAngle = idx * 2.3999632 + (matchSeed % 17) * 0.37;
      const x = CX + Math.cos(goldenAngle) * dist;
      const y = CY + Math.sin(goldenAngle) * dist;

      const velAngle = goldenAngle + Math.PI * 0.58 + (idx % 5) * 0.25;
      const speed = minSpeed + (idx % 7) * 12;

      return {
        code,
        country,
        x,
        y,
        vx: Math.cos(velAngle) * speed,
        vy: Math.sin(velAngle) * speed,
        r: baseRadius,
        alive: true,
        flash: 0,
        squash: 0,
        squashVel: 0,
        squashAngle: 0,
        shielded: false,
        sawTimer: 0,
        sawAngle: (idx * 1.1) % (Math.PI * 2),
        sawHitCooldown: 0,
        trail: [],
      };
    });

    const orbs: ArenaOrb[] = [
      {
        id: 1,
        kind: 'SAW',
        x: CX + 20,
        y: CY - 10,
        r: 14,
        pulse: 0,
      },
    ];
    let nextOrbId = 2;
    let orbSpawnTimer = 5.5;

    const sparks: Spark[] = [];
    const notices: FloatingNotice[] = [];

    let gapAngle = -Math.PI / 2;
    let currentRingR = INITIAL_RING_R;
    let elapsed = 0;
    let roundFinished = false;
    let completeTimer = 0;
    let completeFired = false;
    let lastTime = performance.now();
    let rafId = 0;

    const triggerSquash = (f: FlagEntity, nx: number, ny: number, amount: number) => {
      f.squashAngle = Math.atan2(ny, nx);
      f.squash = Math.min(0.32, Math.max(f.squash, amount));
      f.squashVel = -amount * 6.5;
    };

    const spawnSparks = (x: number, y: number, color: string, countParticles: number) => {
      for (let i = 0; i < countParticles; i++) {
        const a = (Math.PI * 2 * i) / countParticles + Math.random() * 0.5;
        const sp = 75 + Math.random() * 190;
        sparks.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0.45 + Math.random() * 0.25,
          maxLife: 0.7,
          color,
          size: 2 + Math.random() * 2.5,
        });
      }
    };

    const eliminateFlag = (f: FlagEntity, reasonColor: string, labelPrefix: string) => {
      if (!f.alive) return;
      f.alive = false;
      spawnSparks(f.x, f.y, reasonColor, 14);
      notices.push({
        x: Math.max(48, Math.min(LOGICAL_W - 48, f.x)),
        y: Math.max(30, Math.min(LOGICAL_H - 30, f.y)),
        vy: -26,
        text: `${labelPrefix} ${f.code}`,
        color: '#FDA4AF',
        life: 1.0,
        maxLife: 1.0,
      });

      const remaining = entities.filter((e) => e.alive).map((e) => e.code);
      onEliminatedRef.current(remaining, f.code);
      if (remaining.length <= targetSurvivors) {
        roundFinished = true;
      }
    };

    const step = (now: number) => {
      const dt = Math.min(0.032, Math.max(0.004, (now - lastTime) / 1000));
      lastTime = now;

      let aliveNow = 0;
      for (let i = 0; i < entities.length; i++) {
        if (entities[i].alive) aliveNow++;
      }

      const targetDuration = count > 24 ? 84 : 54;
      const progress = Math.min(1, elapsed / targetDuration);
      const gapHalfWidth = roundFinished
        ? 0
        : count > 24
        ? 0.13 + progress * 0.14 + (elapsed > targetDuration ? Math.min(0.35, (elapsed - targetDuration) * 0.03) : 0)
        : 0.13 + progress * 0.15 + (elapsed > targetDuration ? Math.min(0.35, (elapsed - targetDuration) * 0.035) : 0);

      if (isActive && !roundFinished) {
        elapsed += dt;
        const speedRot = isFinal ? 0.92 : 0.82;
        gapAngle = normalizeAngle(gapAngle + speedRot * dt);

        const minRingR = count > 24 ? 174 : 158;
        currentRingR = INITIAL_RING_R - (INITIAL_RING_R - minRingR) * Math.pow(progress, 1.3);

        orbSpawnTimer -= dt;
        if (orbSpawnTimer <= 0 && orbs.length < 1) {
          orbSpawnTimer = count > 24 ? 5.8 : 4.8;
          const orbAngle = Math.random() * Math.PI * 2;
          const orbDist = Math.random() * (currentRingR * 0.38);
          const kind: OrbKind = Math.random() < 0.5 ? 'SAW' : 'SHD';
          orbs.push({
            id: nextOrbId++,
            kind,
            x: CX + Math.cos(orbAngle) * orbDist,
            y: CY + Math.sin(orbAngle) * orbDist,
            r: 14,
            pulse: 0,
          });
        }

        for (let i = 0; i < orbs.length; i++) {
          orbs[i].pulse += dt * 4;
        }

        const dynamicR =
          aliveNow <= 8
            ? 21
            : aliveNow <= 16
            ? 18
            : aliveNow <= 28
            ? 15.5
            : baseRadius;

        for (let i = 0; i < entities.length; i++) {
          const f = entities[i];
          if (!f.alive) continue;

          f.r += (dynamicR - f.r) * Math.min(1, dt * 4);
          if (f.flash > 0) f.flash = Math.max(0, f.flash - dt * 3);

          // Spring-damper squash-and-stretch recovery for bouncy ball look
          const springForce = -170 * f.squash - 12 * f.squashVel;
          f.squashVel += springForce * dt;
          f.squash += f.squashVel * dt;
          if (Math.abs(f.squash) < 0.002 && Math.abs(f.squashVel) < 0.01) {
            f.squash = 0;
            f.squashVel = 0;
          }

          if (f.sawTimer > 0) {
            f.sawTimer = Math.max(0, f.sawTimer - dt);
            f.sawAngle += dt * 6.4;
          }
          if (f.sawHitCooldown > 0) {
            f.sawHitCooldown = Math.max(0, f.sawHitCooldown - dt);
          }

          const dx = f.x - CX;
          const dy = f.y - CY;
          const dist = Math.hypot(dx, dy) || 1;
          const tx = -dy / dist;
          const ty = dx / dist;

          // Subtle bouncy gravity + playful orbital bounce forces
          f.vy += 88 * dt;
          f.vx += tx * 16 * dt + (Math.random() - 0.5) * 34 * dt;
          f.vy += ty * 16 * dt + (Math.random() - 0.5) * 34 * dt;

          if (elapsed > targetDuration * 0.92) {
            const push = (elapsed - targetDuration * 0.92) * 8;
            f.vx += (dx / dist) * push * dt;
            f.vy += (dy / dist) * push * dt;
          }

          const sp = Math.hypot(f.vx, f.vy) || 1;
          if (sp < minSpeed) {
            f.vx = (f.vx / sp) * minSpeed;
            f.vy = (f.vy / sp) * minSpeed;
          } else if (sp > maxSpeed) {
            f.vx = (f.vx / sp) * maxSpeed;
            f.vy = (f.vy / sp) * maxSpeed;
          }

          f.x += f.vx * dt;
          f.y += f.vy * dt;

          f.trail.push({ x: f.x, y: f.y });
          if (f.trail.length > 4) f.trail.shift();

          for (let k = orbs.length - 1; k >= 0; k--) {
            const orb = orbs[k];
            const odx = f.x - orb.x;
            const ody = f.y - orb.y;
            if (odx * odx + ody * ody <= (f.r + orb.r) * (f.r + orb.r)) {
              if (orb.kind === 'SAW') {
                f.sawTimer = 5.5;
                arcadeAudio.playBoost();
                spawnSparks(orb.x, orb.y, '#F59E0B', 10);
              } else {
                f.shielded = true;
                arcadeAudio.playShieldBlock();
                spawnSparks(orb.x, orb.y, '#10B981', 10);
              }
              orbs.splice(k, 1);
            }
          }
        }

        // Bouncy elastic flag-to-flag collisions + orbiting SAW blade combat
        for (let i = 0; i < entities.length; i++) {
          const a = entities[i];
          if (!a.alive) continue;
          for (let j = i + 1; j < entities.length; j++) {
            const b = entities[j];
            if (!b.alive) continue;
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distSq = dx * dx + dy * dy;
            const minDist = a.r + b.r + 0.8;

            const sawReach = a.r + b.r + 8;
            if (distSq < sawReach * sawReach) {
              if (a.sawTimer > 0 && a.sawHitCooldown <= 0 && aliveNow > targetSurvivors) {
                a.sawHitCooldown = 2.6;
                if (b.shielded) {
                  b.shielded = false;
                  arcadeAudio.playShieldBlock();
                  spawnSparks(b.x, b.y, '#10B981', 10);
                } else {
                  arcadeAudio.playBladeHit();
                  aliveNow--;
                  eliminateFlag(b, '#F59E0B', 'SAW');
                  if (roundFinished) break;
                  continue;
                }
              } else if (b.sawTimer > 0 && b.sawHitCooldown <= 0 && aliveNow > targetSurvivors) {
                b.sawHitCooldown = 2.6;
                if (a.shielded) {
                  a.shielded = false;
                  arcadeAudio.playShieldBlock();
                  spawnSparks(a.x, a.y, '#10B981', 10);
                } else {
                  arcadeAudio.playBladeHit();
                  aliveNow--;
                  eliminateFlag(a, '#F59E0B', 'SAW');
                  if (roundFinished) break;
                  break;
                }
              }
            }

            if (distSq < minDist * minDist && distSq > 0.0001) {
              const dist = Math.sqrt(distSq);
              const nx = dx / dist;
              const ny = dy / dist;
              const overlap = (minDist - dist) * 0.52;
              a.x -= nx * overlap;
              a.y -= ny * overlap;
              b.x += nx * overlap;
              b.y += ny * overlap;

              const rvx = b.vx - a.vx;
              const rvy = b.vy - a.vy;
              const velAlongNormal = rvx * nx + rvy * ny;
              if (velAlongNormal < 0) {
                // Super elastic bouncy collision (restitution = 1.07)
                const impulse = -velAlongNormal * 1.07;
                a.vx -= impulse * nx;
                a.vy -= impulse * ny;
                b.vx += impulse * nx;
                b.vy += impulse * ny;

                const hitStrength = Math.min(0.28, Math.abs(velAlongNormal) / 520);
                if (hitStrength > 0.08) {
                  triggerSquash(a, nx, ny, hitStrength);
                  triggerSquash(b, nx, ny, hitStrength);
                  a.flash = 0.3;
                  b.flash = 0.3;
                  if (Math.random() < 0.32) arcadeAudio.playBounce(hitStrength * 2.5);
                }
              }
            }
          }
          if (roundFinished) break;
        }

        // Bouncy ring boundary & rotating crimson exit gate check
        if (!roundFinished) {
          for (let i = 0; i < entities.length; i++) {
            const f = entities[i];
            if (!f.alive) continue;

            const dx = f.x - CX;
            const dy = f.y - CY;
            const dist = Math.hypot(dx, dy) || 1;
            const nx = dx / dist;
            const ny = dy / dist;
            const angle = Math.atan2(dy, dx);

            const inGap = isAngleInGap(angle, gapAngle, gapHalfWidth);

            if (inGap && aliveNow > targetSurvivors) {
              if (dist + f.r * 0.4 > currentRingR) {
                if (f.shielded) {
                  f.shielded = false;
                  f.x = CX + nx * (currentRingR - f.r - 2);
                  f.y = CY + ny * (currentRingR - f.r - 2);
                  const dot = f.vx * nx + f.vy * ny;
                  if (dot > 0) {
                    f.vx -= 2.1 * dot * nx;
                    f.vy -= 2.1 * dot * ny;
                  }
                  triggerSquash(f, nx, ny, 0.28);
                  arcadeAudio.playShieldBlock();
                  spawnSparks(f.x, f.y, '#10B981', 12);
                } else if (dist > currentRingR + f.r * 0.35) {
                  arcadeAudio.playElimination();
                  aliveNow--;
                  eliminateFlag(f, '#F43F5E', 'OUT');
                  if (roundFinished) break;
                }
              }
            } else if (dist + f.r > currentRingR) {
              f.x = CX + nx * (currentRingR - f.r - 0.5);
              f.y = CY + ny * (currentRingR - f.r - 0.5);
              const dot = f.vx * nx + f.vy * ny;
              if (dot > 0) {
                // High-energy elastic wall bounce + subtle upward spring when hitting bottom half
                f.vx -= 2.08 * dot * nx;
                f.vy -= 2.08 * dot * ny;
                if (ny > 0.25) {
                  f.vy -= 38 * ny;
                }
                f.vx += -ny * 14;
                f.vy += nx * 14;

                const wallHit = Math.min(0.3, dot / 260);
                triggerSquash(f, nx, ny, Math.max(0.14, wallHit));
                if (Math.random() < 0.35) arcadeAudio.playBounce(0.6);
              }
            }
          }
        }
      } else if (roundFinished && !completeFired) {
        completeTimer += dt;
        if (completeTimer >= 0.7) {
          completeFired = true;
          const survivors = entities.filter((e) => e.alive).map((e) => e.code);
          onRoundCompleteRef.current(survivors);
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.life -= dt;
        if (s.life <= 0) sparks.splice(i, 1);
      }
      for (let i = notices.length - 1; i >= 0; i--) {
        const n = notices[i];
        n.y += n.vy * dt;
        n.life -= dt;
        if (n.life <= 0) notices.splice(i, 1);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

      // Tactical square grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.032)';
      ctx.lineWidth = 1;
      const gridStep = 34;
      for (let gx = (LOGICAL_W % gridStep) / 2; gx < LOGICAL_W; gx += gridStep) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, LOGICAL_H);
        ctx.stroke();
      }
      for (let gy = (LOGICAL_H % gridStep) / 2; gy < LOGICAL_H; gy += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(LOGICAL_W, gy);
        ctx.stroke();
      }

      const bgGrad = ctx.createRadialGradient(CX, CY, 16, CX, CY, currentRingR + 12);
      bgGrad.addColorStop(0, 'rgba(6, 78, 92, 0.24)');
      bgGrad.addColorStop(0.75, 'rgba(7, 25, 34, 0.38)');
      bgGrad.addColorStop(1, 'rgba(7, 9, 14, 0)');
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(CX, CY, currentRingR + 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(34, 211, 238, 0.16)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(CX, CY, currentRingR * 0.48, 0, Math.PI * 2);
      ctx.stroke();

      const wallColor = roundFinished ? '#F59E0B' : '#00EAFF';
      const glowColor = roundFinished ? 'rgba(245, 158, 11, 0.55)' : 'rgba(0, 234, 255, 0.55)';

      ctx.save();
      ctx.strokeStyle = wallColor;
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      if (gapHalfWidth <= 0.001) {
        ctx.arc(CX, CY, currentRingR, 0, Math.PI * 2);
      } else {
        ctx.arc(CX, CY, currentRingR, gapAngle + gapHalfWidth, gapAngle + Math.PI * 2 - gapHalfWidth);
      }
      ctx.stroke();
      ctx.restore();

      if (gapHalfWidth > 0.01 && isActive && !roundFinished) {
        ctx.save();
        ctx.strokeStyle = 'rgba(136, 19, 55, 0.75)';
        ctx.lineWidth = 7.5;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.arc(CX, CY, currentRingR, gapAngle - gapHalfWidth, gapAngle + gapHalfWidth);
        ctx.stroke();

        const p1x = CX + Math.cos(gapAngle - gapHalfWidth) * currentRingR;
        const p1y = CY + Math.sin(gapAngle - gapHalfWidth) * currentRingR;
        const p2x = CX + Math.cos(gapAngle + gapHalfWidth) * currentRingR;
        const p2y = CY + Math.sin(gapAngle + gapHalfWidth) * currentRingR;
        ctx.fillStyle = '#FB3768';
        ctx.shadowColor = 'rgba(251, 55, 104, 0.75)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p1x, p1y, 5.2, 0, Math.PI * 2);
        ctx.arc(p2x, p2y, 5.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (isActive && !roundFinished) {
        for (let i = 0; i < orbs.length; i++) {
          const orb = orbs[i];
          const isSaw = orb.kind === 'SAW';
          const borderCol = isSaw ? '#F59E0B' : '#10B981';
          const fillCol = isSaw ? 'rgba(120, 53, 15, 0.85)' : 'rgba(6, 78, 59, 0.85)';
          const pulseR = orb.r + Math.sin(orb.pulse) * 1.1;

          ctx.save();
          ctx.shadowColor = borderCol;
          ctx.shadowBlur = 12;
          ctx.fillStyle = fillCol;
          ctx.strokeStyle = borderCol;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, pulseR, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.shadowBlur = 0;
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '800 8.5px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(orb.kind, orb.x, orb.y + 0.5);
          ctx.restore();
        }
      }

      const showCodeBadges = aliveNow <= 24;
      for (let i = 0; i < entities.length; i++) {
        const f = entities[i];
        if (!f.alive) continue;

        if (isActive && f.trail.length > 1) {
          for (let t = 0; t < f.trail.length - 1; t++) {
            const alpha = ((t + 1) / f.trail.length) * 0.14;
            ctx.fillStyle = roundFinished ? `rgba(251, 191, 36, ${alpha})` : `rgba(34, 211, 238, ${alpha})`;
            ctx.beginPath();
            ctx.arc(f.trail[t].x, f.trail[t].y, f.r * 0.42, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Apply bouncy squash-and-stretch transform around impact normal
        ctx.save();
        if (Math.abs(f.squash) > 0.005) {
          ctx.translate(f.x, f.y);
          ctx.rotate(f.squashAngle);
          ctx.scale(1 - f.squash * 0.65, 1 + f.squash * 0.65);
          ctx.rotate(-f.squashAngle);
          ctx.translate(-f.x, -f.y);
        }

        drawCountryFlagCircle(ctx, f.country, f.x, f.y, f.r);

        if (f.shielded) {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r + 2.8, 0, Math.PI * 2);
          ctx.strokeStyle = '#10B981';
          ctx.shadowColor = 'rgba(16, 185, 129, 0.75)';
          ctx.shadowBlur = 10;
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        if (roundFinished) {
          ctx.strokeStyle = '#FBBF24';
          ctx.lineWidth = 2.6;
        } else if (f.flash > 0) {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2.2;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.72)';
          ctx.lineWidth = 1.4;
        }
        ctx.stroke();
        ctx.restore();

        if (f.sawTimer > 0 && isActive && !roundFinished) {
          const sx = f.x + Math.cos(f.sawAngle) * (f.r + 7.5);
          const sy = f.y + Math.sin(f.sawAngle) * (f.r + 7.5);
          ctx.save();
          ctx.translate(sx, sy);
          ctx.rotate(f.sawAngle * 2.5);
          ctx.fillStyle = '#F59E0B';
          ctx.strokeStyle = '#FEF3C7';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          for (let t = 0; t < 8; t++) {
            const a = (Math.PI * 2 * t) / 8;
            const rOut = 6.5;
            const rIn = 3.6;
            ctx.lineTo(Math.cos(a) * rOut, Math.sin(a) * rOut);
            ctx.lineTo(Math.cos(a + Math.PI / 8) * rIn, Math.sin(a + Math.PI / 8) * rIn);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }

        if (showCodeBadges) {
          ctx.save();
          ctx.font = '700 8px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const boxW = 24;
          const boxH = 11;
          const boxY = f.y + f.r + 4;
          ctx.fillStyle = 'rgba(9, 13, 22, 0.9)';
          ctx.fillRect(f.x - boxW / 2, boxY, boxW, boxH);
          ctx.fillStyle = '#F8FAFC';
          ctx.fillText(f.code, f.x, boxY + boxH / 2 + 0.5);
          ctx.restore();
        }
      }

      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        ctx.globalAlpha = Math.max(0, s.life / s.maxLife);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      for (let i = 0; i < notices.length; i++) {
        const n = notices[i];
        ctx.globalAlpha = Math.max(0, n.life / n.maxLife);
        ctx.font = '700 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = n.color;
        ctx.fillText(n.text, n.x, n.y);
      }
      ctx.globalAlpha = 1;

      ctx.restore();
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [participants, targetSurvivors, matchSeed, isActive, isFinal]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full object-contain select-none"
      aria-label="Flags fighting area"
    />
  );
}
