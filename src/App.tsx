import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Crown, Play, Sparkles, Trophy, Volume2, VolumeX } from 'lucide-react';
import { arcadeAudio } from './audio/arcadeAudio';
import { voiceAnnouncer } from './audio/voiceAnnouncer';
import { FlagArenaCanvas } from './components/FlagArenaCanvas';
import { FlagBadge } from './components/FlagBadge';
import { TournamentBracket } from './components/TournamentBracket';
import {
  COUNTRY_250_MAP,
  TEAM_KEYS,
  shuffleAndSplitInto5Teams,
  type TeamKey,
  type TournamentPhase,
} from './data/flags250';

const EMPTY_TOP3: Record<TeamKey, string[]> = {
  A: [],
  B: [],
  C: [],
  D: [],
  E: [],
};

function getCountryName(code: string): string {
  return COUNTRY_250_MAP[code]?.name || code;
}

export default function App() {
  const [teams, setTeams] = useState<Record<TeamKey, string[]>>(() => shuffleAndSplitInto5Teams());
  const [teamIndex, setTeamIndex] = useState(0);
  const [phase, setPhase] = useState<TournamentPhase>('AWAITING_START');
  const [tournamentNumber, setTournamentNumber] = useState(1);
  const [matchSeed, setMatchSeed] = useState(() => Math.floor(Math.random() * 100000));
  const [aliveCodes, setAliveCodes] = useState<string[]>(() => []);
  const [lastEliminated, setLastEliminated] = useState<string | null>(null);
  const [teamTop3, setTeamTop3] = useState<Record<TeamKey, string[]>>(EMPTY_TOP3);
  const [championCode, setChampionCode] = useState<string | null>(null);
  const [muted, setMuted] = useState(() => arcadeAudio.isMuted());
  const [celebrationSecondsLeft, setCelebrationSecondsLeft] = useState(8);

  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const aliveCodesRef = useRef(aliveCodes);
  aliveCodesRef.current = aliveCodes;

  const currentTeam: TeamKey = TEAM_KEYS[teamIndex];

  const allFinalists = useMemo(
    () => TEAM_KEYS.flatMap((k) => teamTop3[k]),
    [teamTop3]
  );

  const activeRoster = useMemo(() => {
    if (phase === 'FINAL_ANNOUNCE' || phase === 'FINAL_BATTLE' || phase === 'CHAMPION_CELEBRATION') {
      return allFinalists;
    }
    return teams[currentTeam];
  }, [phase, allFinalists, teams, currentTeam]);

  const championOriginTeam = useMemo(() => {
    if (!championCode) return null;
    for (const k of TEAM_KEYS) {
      if (teamTop3[k].includes(championCode)) return k;
    }
    return null;
  }, [championCode, teamTop3]);

  const aliveSet = useMemo(() => new Set(aliveCodes), [aliveCodes]);

  const handleToggleMute = () => {
    const next = !muted;
    setMuted(next);
    arcadeAudio.setMuted(next);
    voiceAnnouncer.setMuted(next);
  };

  const handleInitialStart = () => {
    arcadeAudio.unlock();
    voiceAnnouncer.setMuted(muted);
    setAliveCodes(teams.A);
    setLastEliminated(null);
    setChampionCode(null);
    setPhase('TEAM_ANNOUNCE');
  };

  // Phase transition automation & professional announcements
  useEffect(() => {
    if (phase === 'AWAITING_START') return;

    if (phase === 'TEAM_ANNOUNCE') {
      const roster = teams[currentTeam];
      setAliveCodes(roster);
      setLastEliminated(null);
      arcadeAudio.playTournamentStart();
      voiceAnnouncer.speak(
        `Team ${currentTeam} is ready for battle! Fifty country flags enter the arena. Top three advance to the Final. Match starts now!`
      );
      const timer = window.setTimeout(() => {
        setPhase('TEAM_BATTLE');
      }, 3800);
      return () => window.clearTimeout(timer);
    }

    if (phase === 'TEAM_TOP3_ANNOUNCE') {
      const top3 = teamTop3[currentTeam];
      const names = top3.map(getCountryName);
      arcadeAudio.playTop3Fanfare();
      voiceAnnouncer.speak(
        `Team ${currentTeam} battle complete! Top three countries selected for the Final: ${names[0]}, ${names[1]}, and ${names[2]}.`
      );

      const timer = window.setTimeout(() => {
        if (teamIndex < TEAM_KEYS.length - 1) {
          const nextIdx = teamIndex + 1;
          const nextTeam = TEAM_KEYS[nextIdx];
          setTeamIndex(nextIdx);
          setAliveCodes(teams[nextTeam]);
          setLastEliminated(null);
          setMatchSeed((s) => s + 1);
          setPhase('TEAM_ANNOUNCE');
        } else {
          setAliveCodes(TEAM_KEYS.flatMap((k) => teamTop3[k]));
          setLastEliminated(null);
          setMatchSeed((s) => s + 1);
          setPhase('FINAL_ANNOUNCE');
        }
      }, 6000);
      return () => window.clearTimeout(timer);
    }

    if (phase === 'FINAL_ANNOUNCE') {
      setAliveCodes(allFinalists);
      setLastEliminated(null);
      arcadeAudio.playTournamentStart();
      voiceAnnouncer.speak(
        'Final match begins now! All fifteen top countries are selected for the Final battle. Who will become the Grand Champion?'
      );
      const timer = window.setTimeout(() => {
        setPhase('FINAL_BATTLE');
      }, 4800);
      return () => window.clearTimeout(timer);
    }

    if (phase === 'CHAMPION_CELEBRATION' && championCode) {
      const champName = getCountryName(championCode);
      const originLabel = championOriginTeam ? ` from Team ${championOriginTeam}` : '';
      arcadeAudio.playChampion();
      voiceAnnouncer.speak(
        `Grand Champion! ${champName}${originLabel} wins Match ${tournamentNumber}! Shuffling two hundred fifty flags for the next tournament.`
      );

      setCelebrationSecondsLeft(8);
      const countdown = window.setInterval(() => {
        setCelebrationSecondsLeft((prev) => Math.max(0, prev - 1));
      }, 1000);

      const timer = window.setTimeout(() => {
        const freshTeams = shuffleAndSplitInto5Teams();
        setTeams(freshTeams);
        setTeamTop3(EMPTY_TOP3);
        setTeamIndex(0);
        setChampionCode(null);
        setLastEliminated(null);
        setAliveCodes(freshTeams.A);
        setTournamentNumber((n) => n + 1);
        setMatchSeed((s) => s + 1);
        setPhase('TEAM_ANNOUNCE');
      }, 8500);

      return () => {
        window.clearInterval(countdown);
        window.clearTimeout(timer);
      };
    }
  }, [
    phase,
    currentTeam,
    teamIndex,
    teams,
    teamTop3,
    allFinalists,
    championCode,
    championOriginTeam,
    tournamentNumber,
  ]);

  const handleEliminated = useCallback((remainingCodes: string[], eliminatedCode: string) => {
    setAliveCodes(remainingCodes);
    setLastEliminated(eliminatedCode);
  }, []);

  const handleRoundComplete = useCallback(
    (survivors: string[]) => {
      if (phaseRef.current === 'TEAM_BATTLE') {
        const top3 = survivors.slice(0, 3);
        setAliveCodes(top3);
        setTeamTop3((prev) => ({
          ...prev,
          [currentTeam]: top3,
        }));
        setPhase('TEAM_TOP3_ANNOUNCE');
      } else if (phaseRef.current === 'FINAL_BATTLE') {
        const winner = survivors[0] || aliveCodesRef.current[0];
        if (winner) {
          setAliveCodes([winner]);
          setChampionCode(winner);
          setPhase('CHAMPION_CELEBRATION');
        }
      }
    },
    [currentTeam]
  );

  const isFinal =
    phase === 'FINAL_ANNOUNCE' ||
    phase === 'FINAL_BATTLE' ||
    phase === 'CHAMPION_CELEBRATION';

  const headerTitle = isFinal ? 'FINAL' : `TEAM - ${currentTeam}`;
  const gridColsClass = isFinal ? 'grid-cols-5' : 'grid-cols-10';
  const totalInRound = isFinal ? 15 : 50;
  const aliveCount = aliveCodes.length > 0 ? aliveCodes.length : totalInRound;

  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-[#04060B] p-1 overflow-hidden">
      {/* Pure 9:16 Vertical Stage matching sketch */}
      <div
        className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#070A12] px-2 py-1.5 shadow-[0_0_60px_rgba(34,211,238,0.14)]"
        style={{
          width: 'min(97vw, calc(97dvh * 9 / 16))',
          height: 'min(97dvh, calc(97vw * 16 / 9))',
        }}
      >
        {/* Subtle radial ambient top glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent"
          aria-hidden="true"
        />

        {/* COMPACT TOP HEADER & PARTICIPATING FLAGS GRID */}
        <header className="relative z-10 flex flex-col gap-1">
          <div className="relative flex items-center justify-center">
            <span className="absolute left-0 font-mono text-[9.5px] font-semibold tracking-wider text-slate-400 tabular-nums">
              #{tournamentNumber}
            </span>

            <h1
              className={`font-display text-base sm:text-lg font-bold tracking-[0.14em] uppercase ${
                isFinal ? 'text-amber-300' : 'text-white'
              }`}
              style={{ textWrap: 'balance' }}
            >
              {headerTitle}
            </h1>

            <div className="absolute right-0 flex items-center gap-1">
              {lastEliminated && (phase === 'TEAM_BATTLE' || phase === 'FINAL_BATTLE') && (
                <span className="hidden sm:inline-block font-mono text-[9px] text-rose-300">
                  -{lastEliminated}
                </span>
              )}
              <span className="font-mono text-[10px] font-bold tabular-nums text-cyan-300">
                {aliveCount}/{totalInRound}
              </span>
              <button
                type="button"
                onClick={handleToggleMute}
                aria-label={muted ? 'Unmute announcer and sound' : 'Mute announcer and sound'}
                className="flex h-5 w-5 items-center justify-center rounded border border-slate-700/80 bg-slate-900/80 text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-300"
              >
                {muted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
              </button>
            </div>
          </div>

          {/* Compact 50-flag (10x5) or 15-flag (5x3) Participant Grid */}
          <div className="rounded-lg border border-slate-700/80 bg-[#0B101B]/95 p-1">
            <div className={`grid ${gridColsClass} gap-0.5 place-items-center`}>
              {activeRoster.map((code) => {
                const isAlive = phase === 'AWAITING_START' || aliveSet.has(code);
                const isTop3Locked =
                  !isFinal && aliveSet.size <= 3 && isAlive && phase !== 'AWAITING_START';

                return (
                  <div
                    key={code}
                    title={getCountryName(code)}
                    className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                      isAlive
                        ? isTop3Locked
                          ? 'scale-110 ring-2 ring-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.55)]'
                          : 'opacity-100 scale-100'
                        : 'opacity-20 grayscale scale-90'
                    }`}
                  >
                    <FlagBadge code={code} size={isFinal ? 24 : 16} />
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        {/* MIDDLE: BIGGER FLAGS FIGHTING AREA + BROADCAST ANNOUNCEMENT OVERLAYS */}
        <section className="relative flex-1 min-h-0 flex items-center justify-center my-0.5">
          <FlagArenaCanvas
            participants={activeRoster}
            targetSurvivors={isFinal ? 1 : 3}
            matchSeed={matchSeed}
            isActive={phase === 'TEAM_BATTLE' || phase === 'FINAL_BATTLE'}
            isFinal={isFinal}
            onEliminated={handleEliminated}
            onRoundComplete={handleRoundComplete}
          />

          {/* INITIAL SINGLE-CLICK START OVERLAY */}
          {phase === 'AWAITING_START' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-xl bg-[#070A12]/88 backdrop-blur-sm px-5 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/50 bg-cyan-500/15 shadow-[0_0_30px_rgba(34,211,238,0.28)]">
                <Trophy className="h-7 w-7 text-cyan-300" />
              </div>
              <h2
                className="font-display text-2xl font-bold tracking-wide text-white uppercase"
                style={{ textWrap: 'balance' }}
              >
                250 Flag Battle
              </h2>
              <p className="mt-1.5 max-w-[260px] text-xs leading-relaxed text-slate-300">
                250 nations split into 5 teams of 50. Top 3 from each team advance to the 15-flag Final in an endless live loop.
              </p>

              <button
                type="button"
                onClick={handleInitialStart}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-cyan-300/60 bg-cyan-400 px-6 py-3 font-display text-sm font-bold tracking-wider text-slate-950 uppercase shadow-[0_0_28px_rgba(34,211,238,0.45)] transition hover:scale-[1.03] hover:bg-cyan-300 active:scale-[0.98] cursor-pointer"
              >
                <Play className="h-4 w-4 fill-slate-950" />
                Start Tournament
              </button>
              <span className="mt-2.5 font-mono text-[10px] text-slate-400">
                One click starts automatic broadcast &amp; voice announcer
              </span>
            </div>
          )}

          {/* TEAM ANNOUNCE OVERLAY */}
          {phase === 'TEAM_ANNOUNCE' && (
            <div className="pointer-events-none absolute inset-x-3 z-20 flex flex-col items-center justify-center rounded-xl border border-cyan-400/60 bg-[#090E1A]/92 px-4 py-5 text-center shadow-[0_0_40px_rgba(34,211,238,0.25)] animate-fade-in">
              <span className="font-mono text-[11px] font-bold tracking-[0.22em] text-cyan-300 uppercase">
                Tournament #{tournamentNumber}
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-wider text-white uppercase">
                TEAM - {currentTeam}
              </h2>
              <p className="mt-1 text-sm font-semibold text-cyan-200">
                Ready For Battle — 50 Flags Enter
              </p>
              <p className="mt-1 font-mono text-[11px] text-slate-400">
                Top 3 Survivors Advance to Final
              </p>
            </div>
          )}

          {/* TEAM TOP 3 SELECTED OVERLAY */}
          {phase === 'TEAM_TOP3_ANNOUNCE' && (
            <div className="pointer-events-none absolute inset-x-2 z-20 flex flex-col items-center rounded-xl border border-emerald-400/60 bg-[#081119]/95 px-3 py-4 text-center shadow-[0_0_44px_rgba(16,185,129,0.28)]">
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-emerald-300 uppercase">
                TEAM-{currentTeam} BATTLE COMPLETE
              </span>
              <h2 className="mt-0.5 font-display text-xl font-bold tracking-wide text-white uppercase">
                Top 3 Selected For Final
              </h2>
              <div className="mt-3 grid w-full grid-cols-3 gap-2">
                {teamTop3[currentTeam].map((code, idx) => (
                  <div
                    key={code}
                    className="flex flex-col items-center gap-1 rounded-lg border border-amber-400/45 bg-slate-900/90 px-1.5 py-2"
                  >
                    <span className="font-mono text-[10px] font-bold text-amber-300">
                      #{idx + 1}
                    </span>
                    <FlagBadge code={code} size={36} />
                    <span className="line-clamp-2 text-[10px] font-semibold leading-tight text-white">
                      {getCountryName(code)}
                    </span>
                  </div>
                ))}
              </div>
              <span className="mt-3 font-mono text-[10px] text-cyan-300">
                {teamIndex < TEAM_KEYS.length - 1
                  ? `Next Up: TEAM-${TEAM_KEYS[teamIndex + 1]} starting automatically...`
                  : 'All 15 Finalists Ready — Preparing Final Match...'}
              </span>
            </div>
          )}

          {/* FINAL ANNOUNCE OVERLAY */}
          {phase === 'FINAL_ANNOUNCE' && (
            <div className="pointer-events-none absolute inset-x-2 z-20 flex flex-col items-center rounded-xl border border-amber-400/70 bg-[#100D14]/95 px-4 py-5 text-center shadow-[0_0_50px_rgba(251,191,36,0.3)]">
              <Trophy className="h-8 w-8 text-amber-300" />
              <span className="mt-1 font-mono text-[10px] font-bold tracking-[0.22em] text-amber-300 uppercase">
                15 Finalist Nations Selected
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-wider text-white uppercase">
                Final Match Begins Now
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                Top 3 from Teams A, B, C, D &amp; E battle for the Crown!
              </p>
            </div>
          )}

          {/* GRAND CHAMPION CELEBRATION OVERLAY */}
          {phase === 'CHAMPION_CELEBRATION' && championCode && (
            <div className="pointer-events-none absolute inset-1 z-30 flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-amber-400/80 bg-gradient-to-b from-[#171222]/96 via-[#0B101D]/96 to-[#07090E]/98 px-4 py-5 text-center shadow-[0_0_60px_rgba(251,191,36,0.38)]">
              {/* Animated celebratory confetti burst */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                {Array.from({ length: 24 }).map((_, idx) => {
                  const leftPct = ((idx * 37) % 94) + 3;
                  const delayMs = (idx % 6) * 220;
                  const colors = ['#FBBF24', '#22D3EE', '#34D399', '#F472B6', '#FFFFFF'];
                  const color = colors[idx % colors.length];
                  return (
                    <span
                      key={idx}
                      className="confetti-piece absolute top-0 h-2.5 w-1.5 rounded-sm"
                      style={{
                        left: `${leftPct}%`,
                        backgroundColor: color,
                        animationDelay: `${delayMs}ms`,
                      }}
                    />
                  );
                })}
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-amber-300">
                  <Crown className="h-6 w-6 fill-amber-300/30" />
                  <span className="font-mono text-xs font-bold tracking-[0.24em] uppercase">
                    Grand Champion
                  </span>
                  <Sparkles className="h-5 w-5" />
                </div>

                <div className="mt-3 rounded-full p-1.5 ring-4 ring-amber-400/80 shadow-[0_0_45px_rgba(251,191,36,0.65)] animate-champion-pop">
                  <FlagBadge code={championCode} size={96} />
                </div>

                <h2
                  className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-wide text-white uppercase"
                  style={{ textWrap: 'balance' }}
                >
                  {getCountryName(championCode)}
                </h2>

                <p className="mt-1 font-mono text-xs font-semibold text-cyan-300">
                  MATCH #{tournamentNumber} WINNER
                  {championOriginTeam ? ` • TEAM-${championOriginTeam}` : ''}
                </p>

                <div className="mt-4 w-48 overflow-hidden rounded-full bg-slate-800 h-1.5">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-amber-400 transition-all duration-1000"
                    style={{ width: `${(celebrationSecondsLeft / 8) * 100}%` }}
                  />
                </div>
                <span className="mt-1.5 font-mono text-[10px] text-slate-400 tabular-nums">
                  Auto-shuffling 250 flags for Match #{tournamentNumber + 1} in {celebrationSecondsLeft}s
                </span>
              </div>
            </div>
          )}
        </section>

        {/* BOTTOM BRACKET BOX (TEAM-A..E -> FINAL) */}
        <footer className="relative z-10">
          <TournamentBracket
            currentTeam={currentTeam}
            phase={phase}
            teamTop3={teamTop3}
            finalistsCount={allFinalists.length}
            championCode={championCode}
          />
        </footer>
      </div>
    </main>
  );
}
