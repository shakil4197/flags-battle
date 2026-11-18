import { Trophy } from 'lucide-react';
import { TEAM_KEYS, type TeamKey, type TournamentPhase } from '../data/flags250';
import { FlagBadge } from './FlagBadge';

interface TournamentBracketProps {
  currentTeam: TeamKey;
  phase: TournamentPhase;
  teamTop3: Record<TeamKey, string[]>;
  finalistsCount: number;
  championCode: string | null;
}

function TeamSlotCard({
  team,
  qualifiers,
  isCurrent,
  isFinalPhase,
  align = 'left',
}: {
  team: TeamKey;
  qualifiers: string[];
  isCurrent: boolean;
  isFinalPhase: boolean;
  align?: 'left' | 'right' | 'center';
}) {
  const done = qualifiers.length === 3;
  const active = !isFinalPhase && isCurrent;

  return (
    <div
      className={`flex items-center justify-between gap-1.5 rounded-md border px-1.5 py-0.5 transition-colors ${
        active
          ? 'border-cyan-400/75 bg-cyan-500/12 shadow-[0_0_12px_rgba(34,211,238,0.16)]'
          : done
          ? 'border-emerald-400/40 bg-emerald-500/8'
          : 'border-slate-700/70 bg-[#0D1322]/90'
      } ${align === 'right' ? 'flex-row-reverse' : ''}`}
    >
      <span
        className={`font-display text-[9px] font-bold tracking-wider whitespace-nowrap ${
          active ? 'text-cyan-300' : done ? 'text-emerald-300' : 'text-slate-300'
        }`}
      >
        TEAM-{team}
      </span>

      <div className="flex items-center gap-0.5">
        {[0, 1, 2].map((slotIdx) => {
          const code = qualifiers[slotIdx];
          return code ? (
            <div
              key={code}
              className="rounded-full ring-1 ring-amber-400/60"
            >
              <FlagBadge code={code} size={14} />
            </div>
          ) : (
            <span
              key={slotIdx}
              className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-dashed border-slate-600/80 bg-slate-900/80 font-mono text-[7px] text-slate-500"
            >
              ?
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function TournamentBracket({
  currentTeam,
  phase,
  teamTop3,
  finalistsCount,
  championCode,
}: TournamentBracketProps) {
  const isFinalPhase =
    phase === 'FINAL_ANNOUNCE' ||
    phase === 'FINAL_BATTLE' ||
    phase === 'CHAMPION_CELEBRATION';

  const countDone = TEAM_KEYS.filter((k) => teamTop3[k].length === 3).length;

  return (
    <div className="relative w-full rounded-lg border border-slate-700/80 bg-[#0B101B]/95 px-2 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      {/* Compact connector arrows matching user sketch */}
      <svg
        viewBox="0 0 360 88"
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <marker id="arrow-cyan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#22D3EE" />
          </marker>
          <marker id="arrow-dim" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#475569" />
          </marker>
        </defs>
        <line
          x1="126"
          y1="16"
          x2="152"
          y2="28"
          stroke={teamTop3.A.length === 3 ? '#22D3EE' : '#475569'}
          strokeWidth="1.5"
          markerEnd={teamTop3.A.length === 3 ? 'url(#arrow-cyan)' : 'url(#arrow-dim)'}
        />
        <line
          x1="126"
          y1="44"
          x2="152"
          y2="34"
          stroke={teamTop3.B.length === 3 ? '#22D3EE' : '#475569'}
          strokeWidth="1.5"
          markerEnd={teamTop3.B.length === 3 ? 'url(#arrow-cyan)' : 'url(#arrow-dim)'}
        />
        <line
          x1="234"
          y1="16"
          x2="208"
          y2="28"
          stroke={teamTop3.C.length === 3 ? '#22D3EE' : '#475569'}
          strokeWidth="1.5"
          markerEnd={teamTop3.C.length === 3 ? 'url(#arrow-cyan)' : 'url(#arrow-dim)'}
        />
        <line
          x1="234"
          y1="44"
          x2="208"
          y2="34"
          stroke={teamTop3.D.length === 3 ? '#22D3EE' : '#475569'}
          strokeWidth="1.5"
          markerEnd={teamTop3.D.length === 3 ? 'url(#arrow-cyan)' : 'url(#arrow-dim)'}
        />
        <line
          x1="180"
          y1="62"
          x2="180"
          y2="52"
          stroke={teamTop3.E.length === 3 ? '#22D3EE' : '#475569'}
          strokeWidth="1.5"
          markerEnd={teamTop3.E.length === 3 ? 'url(#arrow-cyan)' : 'url(#arrow-dim)'}
        />
      </svg>

      <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-1.5">
        <div className="flex flex-col gap-1">
          <TeamSlotCard
            team="A"
            qualifiers={teamTop3.A}
            isCurrent={currentTeam === 'A'}
            isFinalPhase={isFinalPhase}
            align="left"
          />
          <TeamSlotCard
            team="B"
            qualifiers={teamTop3.B}
            isCurrent={currentTeam === 'B'}
            isFinalPhase={isFinalPhase}
            align="left"
          />
        </div>

        <div className="flex flex-col items-center justify-center px-1">
          <div
            className={`flex h-11 w-11 flex-col items-center justify-center rounded-full border-2 transition-all ${
              championCode
                ? 'border-amber-400 bg-amber-500/20 shadow-[0_0_18px_rgba(251,191,36,0.45)]'
                : isFinalPhase
                ? 'border-cyan-400 bg-cyan-500/20 shadow-[0_0_16px_rgba(34,211,238,0.4)]'
                : 'border-slate-500/80 bg-[#070B14]'
            }`}
          >
            {championCode ? (
              <FlagBadge code={championCode} size={24} />
            ) : (
              <>
                <div className="flex items-center gap-0.5">
                  <Trophy className={`h-2.5 w-2.5 ${isFinalPhase ? 'text-amber-300' : 'text-cyan-300'}`} />
                  <span className="font-display text-[8.5px] font-bold tracking-wide text-white">
                    FINAL
                  </span>
                </div>
                <span className="font-mono text-[8.5px] font-semibold tabular-nums text-cyan-300">
                  {finalistsCount}/15
                </span>
              </>
            )}
          </div>
          <span className="mt-0.5 font-mono text-[7.5px] uppercase tracking-wider text-slate-400 tabular-nums">
            {countDone}/5
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <TeamSlotCard
            team="C"
            qualifiers={teamTop3.C}
            isCurrent={currentTeam === 'C'}
            isFinalPhase={isFinalPhase}
            align="right"
          />
          <TeamSlotCard
            team="D"
            qualifiers={teamTop3.D}
            isCurrent={currentTeam === 'D'}
            isFinalPhase={isFinalPhase}
            align="right"
          />
        </div>
      </div>

      <div className="relative z-10 mt-1 flex justify-center">
        <TeamSlotCard
          team="E"
          qualifiers={teamTop3.E}
          isCurrent={currentTeam === 'E'}
          isFinalPhase={isFinalPhase}
          align="center"
        />
      </div>
    </div>
  );
}
