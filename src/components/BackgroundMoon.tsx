import { useScroll, useTransform, useMotionValueEvent, motion, type MotionValue } from 'framer-motion';
import { useState } from 'react';

/* ── Constants ──────────────────────────────────────────── */
const R = 120;

const P0 = { x: 3,  y: 7  };
const P1 = { x: 50, y: 1  };
const P2 = { x: 82, y: 76 };

function bezier(t: number) {
    const u = 1 - t;
    return {
        x: u * u * P0.x + 2 * u * t * P1.x + t * t * P2.x,
        y: u * u * P0.y + 2 * u * t * P1.y + t * t * P2.y,
    };
}

function moonPath(phase: number, r: number): string {
    const a = r * Math.abs(Math.cos(Math.PI * phase));
    const sweep = phase <= 0.5 ? 1 : 0;
    return `M 0,${-r} A ${r},${r} 0 0,0 0,${r} A ${a},${r} 0 0,${sweep} 0,${-r} Z`;
}

function phaseName(p: number): string {
    if (p < 0.08) return 'Full Moon';
    if (p < 0.22) return 'Waning Gibbous';
    if (p < 0.38) return 'Third Quarter';
    if (p < 0.52) return 'Waning Crescent';
    if (p < 0.62) return 'New Moon';
    if (p < 0.76) return 'Waxing Crescent';
    if (p < 0.88) return 'First Quarter';
    return 'Waxing Gibbous';
}

/* ── Star field (seeded, deterministic) ─────────────────── */
function sr(n: number) { const x = Math.sin(n) * 10000; return x - Math.floor(x); }

const STARS_NEAR = Array.from({ length: 35 }, (_, i) => ({
    x: sr(i * 3.14) * 100,
    y: sr(i * 2.71) * 100,
    r: sr(i * 1.41) * 1.6 + 0.5,
    tw: (i % 4) as 0 | 1 | 2 | 3,
    dur: `${sr(i * 3.3) * 3 + 1.8}s`,
    del: `${sr(i * 2.2) * 4}s`,
}));
const STARS_FAR = Array.from({ length: 60 }, (_, i) => ({
    x: sr(i * 7.39 + 1) * 100,
    y: sr(i * 4.67 + 1) * 100,
    r: sr(i * 2.23 + 1) * 0.9 + 0.2,
    tw: ((i + 2) % 4) as 0 | 1 | 2 | 3,
    dur: `${sr(i * 5.1 + 1) * 4 + 2.5}s`,
    del: `${sr(i * 1.7 + 1) * 6}s`,
}));

/* ── Live phase label ───────────────────────────────────── */
function PhaseLabel({ sv }: { sv: MotionValue<number> }) {
    const [label, setLabel] = useState('Full Moon');
    useMotionValueEvent(sv, 'change', (v) => setLabel(phaseName(v)));
    return <>{label}</>;
}

/* ══════════════════════════════════════════════════════════ */
export function BackgroundMoon() {
    const { scrollYProgress } = useScroll();

    /* Position — quadratic bezier */
    const moonLeft = useTransform(scrollYProgress, (t) => `${bezier(t).x}vw`);
    const moonTop  = useTransform(scrollYProgress, (t) => `${bezier(t).y}vh`);

    /* Rotation */
    const moonRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    /* Phase path */
    const moonD = useTransform(scrollYProgress, (v) => moonPath(v, R));

    /* Satellite */
    const satRad = useTransform(scrollYProgress, (t) => t * 8 * Math.PI);
    const satX   = useTransform(satRad, (a) => (R + 24) * Math.cos(a));
    const satY   = useTransform(satRad, (a) => (R + 24) * Math.sin(a));
    const sat2X  = useTransform(satRad, (a) => (R + 24) * Math.cos(a - 0.25));
    const sat2Y  = useTransform(satRad, (a) => (R + 24) * Math.sin(a - 0.25));
    const sat3X  = useTransform(satRad, (a) => (R + 24) * Math.cos(a - 0.5));
    const sat3Y  = useTransform(satRad, (a) => (R + 24) * Math.sin(a - 0.5));

    /* Atmosphere */
    const glowOp    = useTransform(scrollYProgress, [0, 0.42, 0.85, 1], [1, 0.6, 0.15, 0]);
    const glowScale = useTransform(scrollYProgress, [0, 1], [1, 0.45]);
    const moonOp    = useTransform(scrollYProgress, [0, 0.75, 1], [0.75, 0.52, 0.18]);
    const orbitRingOp = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.18, 0.18, 0]);

    /* Star parallax */
    const nearY = useTransform(scrollYProgress, [0, 1], ['0vh', '-12vh']);
    const farY  = useTransform(scrollYProgress, [0, 1], ['0vh', '-4vh']);

    /* ── Comet wake — trailing glow orbs at previous bezier positions ── */
    const wakeBase = useTransform(scrollYProgress, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);
    const w1Op = useTransform(wakeBase, v => v * 0.58);
    const w2Op = useTransform(wakeBase, v => v * 0.38);
    const w3Op = useTransform(wakeBase, v => v * 0.22);
    const w4Op = useTransform(wakeBase, v => v * 0.12);
    const w5Op = useTransform(wakeBase, v => v * 0.06);

    const w1l = useTransform(scrollYProgress, t => `${bezier(Math.max(0, t - 0.04)).x}vw`);
    const w1t = useTransform(scrollYProgress, t => `${bezier(Math.max(0, t - 0.04)).y}vh`);
    const w2l = useTransform(scrollYProgress, t => `${bezier(Math.max(0, t - 0.09)).x}vw`);
    const w2t = useTransform(scrollYProgress, t => `${bezier(Math.max(0, t - 0.09)).y}vh`);
    const w3l = useTransform(scrollYProgress, t => `${bezier(Math.max(0, t - 0.16)).x}vw`);
    const w3t = useTransform(scrollYProgress, t => `${bezier(Math.max(0, t - 0.16)).y}vh`);
    const w4l = useTransform(scrollYProgress, t => `${bezier(Math.max(0, t - 0.24)).x}vw`);
    const w4t = useTransform(scrollYProgress, t => `${bezier(Math.max(0, t - 0.24)).y}vh`);
    const w5l = useTransform(scrollYProgress, t => `${bezier(Math.max(0, t - 0.34)).x}vw`);
    const w5t = useTransform(scrollYProgress, t => `${bezier(Math.max(0, t - 0.34)).y}vh`);

    /* ── Nebula clouds — atmospheric parallax blobs ── */
    const neb1Y  = useTransform(scrollYProgress, [0, 1], ['0vh', '-20vh']);
    const neb2Y  = useTransform(scrollYProgress, [0, 1], ['0vh', '-9vh']);
    const neb3Y  = useTransform(scrollYProgress, [0, 1], ['0vh', '-15vh']);
    const neb1Op = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.55, 1.0, 0.65, 0.25]);
    const neb2Op = useTransform(scrollYProgress, [0, 0.40, 0.80, 1], [0.40, 0.80, 0.50, 0.15]);
    const neb3Op = useTransform(scrollYProgress, [0.08, 0.48, 0.88, 1], [0, 0.60, 0.45, 0.10]);

    /* ── Aurora band ── */
    const auroraOp = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.5, 0.9, 0.5, 0]);
    const auroraY  = useTransform(scrollYProgress, [0, 1], ['0vh', '8vh']);

    return (
        <>
            {/* ══ FAR STARS ══ */}
            <motion.svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ y: farY }}
                aria-hidden="true"
            >
                {STARS_FAR.map((s, i) => (
                    <circle key={i}
                        cx={`${s.x}%`} cy={`${s.y}%`} r={s.r}
                        className={`star-tw-${s.tw}`}
                        style={{ fill: 'var(--star-far)', '--dur': s.dur, '--del': s.del } as React.CSSProperties}
                    />
                ))}
            </motion.svg>

            {/* ══ NEAR STARS ══ */}
            <motion.svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ y: nearY }}
                aria-hidden="true"
            >
                {STARS_NEAR.map((s, i) => (
                    <circle key={i}
                        cx={`${s.x}%`} cy={`${s.y}%`} r={s.r}
                        className={`star-tw-${s.tw}`}
                        style={{ fill: 'var(--star-near)', '--dur': s.dur, '--del': s.del } as React.CSSProperties}
                    />
                ))}
            </motion.svg>

            {/* ══ NEBULA A — cyan, upper right ══ */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    top: '4%', left: '48%',
                    width: '58vw', height: '42vh',
                    background:
                        'radial-gradient(ellipse 58% 62% at 38% 44%, ' +
                        'rgba(34,211,238,0.11) 0%, ' +
                        'rgba(34,211,238,0.04) 48%, ' +
                        'transparent 72%)',
                    filter: 'blur(64px)',
                    y: neb1Y,
                    opacity: neb1Op,
                }}
                aria-hidden="true"
            />

            {/* ══ NEBULA B — violet, lower left ══ */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    top: '46%', left: '-8%',
                    width: '52vw', height: '48vh',
                    background:
                        'radial-gradient(ellipse 62% 58% at 48% 46%, ' +
                        'rgba(139,92,246,0.10) 0%, ' +
                        'rgba(139,92,246,0.03) 50%, ' +
                        'transparent 74%)',
                    filter: 'blur(72px)',
                    y: neb2Y,
                    opacity: neb2Op,
                }}
                aria-hidden="true"
            />

            {/* ══ NEBULA C — warm dust, center-right ══ */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    top: '20%', right: '3%',
                    width: '40vw', height: '34vh',
                    background:
                        'radial-gradient(ellipse 52% 56% at 52% 44%, ' +
                        'rgba(250,190,80,0.07) 0%, ' +
                        'rgba(200,150,60,0.02) 52%, ' +
                        'transparent 72%)',
                    filter: 'blur(58px)',
                    y: neb3Y,
                    opacity: neb3Op,
                }}
                aria-hidden="true"
            />

            {/* ══ AURORA BAND — horizon shimmer ══ */}
            <motion.div
                className="absolute pointer-events-none w-full"
                style={{
                    bottom: '18%',
                    height: '120px',
                    background:
                        'linear-gradient(to right, ' +
                        'transparent 0%, ' +
                        'rgba(34,211,238,0.04) 15%, ' +
                        'rgba(139,92,246,0.06) 40%, ' +
                        'rgba(34,211,238,0.05) 65%, ' +
                        'rgba(250,190,80,0.03) 85%, ' +
                        'transparent 100%)',
                    filter: 'blur(28px)',
                    y: auroraY,
                    opacity: auroraOp,
                }}
                aria-hidden="true"
            />

            {/* ══ COMET WAKE — trailing luminous orbs ══ */}
            {/* Orb 5 — farthest, smallest */}
            <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                    left: w5l, top: w5t,
                    width: 70, height: 70,
                    marginLeft: -35, marginTop: -35,
                    background:
                        'radial-gradient(circle, ' +
                        'rgba(240,225,165,0.14) 0%, ' +
                        'rgba(34,211,238,0.06) 48%, ' +
                        'transparent 70%)',
                    filter: 'blur(26px)',
                    opacity: w5Op,
                }}
                aria-hidden="true"
            />
            {/* Orb 4 */}
            <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                    left: w4l, top: w4t,
                    width: 110, height: 110,
                    marginLeft: -55, marginTop: -55,
                    background:
                        'radial-gradient(circle, ' +
                        'rgba(240,225,165,0.18) 0%, ' +
                        'rgba(34,211,238,0.08) 48%, ' +
                        'transparent 70%)',
                    filter: 'blur(22px)',
                    opacity: w4Op,
                }}
                aria-hidden="true"
            />
            {/* Orb 3 */}
            <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                    left: w3l, top: w3t,
                    width: 155, height: 155,
                    marginLeft: -77, marginTop: -77,
                    background:
                        'radial-gradient(circle, ' +
                        'rgba(240,225,165,0.22) 0%, ' +
                        'rgba(34,211,238,0.11) 46%, ' +
                        'transparent 70%)',
                    filter: 'blur(18px)',
                    opacity: w3Op,
                }}
                aria-hidden="true"
            />
            {/* Orb 2 */}
            <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                    left: w2l, top: w2t,
                    width: 200, height: 200,
                    marginLeft: -100, marginTop: -100,
                    background:
                        'radial-gradient(circle, ' +
                        'rgba(240,225,165,0.27) 0%, ' +
                        'rgba(34,211,238,0.14) 44%, ' +
                        'transparent 70%)',
                    filter: 'blur(13px)',
                    opacity: w2Op,
                }}
                aria-hidden="true"
            />
            {/* Orb 1 — closest to moon */}
            <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                    left: w1l, top: w1t,
                    width: 240, height: 240,
                    marginLeft: -120, marginTop: -120,
                    background:
                        'radial-gradient(circle, ' +
                        'rgba(240,225,165,0.32) 0%, ' +
                        'rgba(34,211,238,0.18) 42%, ' +
                        'transparent 70%)',
                    filter: 'blur(8px)',
                    opacity: w1Op,
                }}
                aria-hidden="true"
            />

            {/* ══ MOON CONTAINER ══ */}
            <motion.div
                aria-hidden="true"
                className="absolute pointer-events-none"
                style={{ left: moonLeft, top: moonTop, opacity: moonOp }}
            >
                {/* Directional atmospheric halo */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: '280%', height: '280%',
                        top: '-90%', left: '-90%',
                        background:
                            'radial-gradient(ellipse 55% 50% at 42% 40%, ' +
                            'rgba(240,230,200,0.20) 0%, ' +
                            'rgba(130,190,255,0.06) 48%, ' +
                            'transparent 72%)',
                        opacity: glowOp,
                        scale: glowScale,
                    }}
                />

                {/* ── Rotating moon disc + satellite ── */}
                <motion.div
                    className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72"
                    style={{ rotate: moonRotate }}
                >
                    <svg
                        viewBox={`${-R} ${-R} ${R * 2} ${R * 2}`}
                        className="w-full h-full"
                        style={{ overflow: 'visible' }}
                    >
                        <defs>
                            <radialGradient id="mgLit" cx="36%" cy="30%" r="70%">
                                <stop offset="0%"   stopColor="#F5F0E6" />
                                <stop offset="40%"  stopColor="#E0DAC8" />
                                <stop offset="100%" stopColor="#B4AEA1" />
                            </radialGradient>
                            <radialGradient id="mgDark" cx="52%" cy="48%" r="56%">
                                <stop offset="0%"   stopColor="#201E2D" stopOpacity="0.97" />
                                <stop offset="100%" stopColor="#0F0E18" stopOpacity="1"    />
                            </radialGradient>
                            <radialGradient id="mgEdgeLight" cx="30%" cy="28%" r="72%">
                                <stop offset="0%"   stopColor="rgba(255,250,235,0.08)" />
                                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                            </radialGradient>
                            <filter id="satGlow" x="-300%" y="-300%" width="700%" height="700%">
                                <feGaussianBlur stdDeviation="3" result="b"/>
                                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                            </filter>
                            <clipPath id="mgEdge">
                                <circle cx="0" cy="0" r={R} />
                            </clipPath>
                        </defs>

                        {/* Dark side base */}
                        <circle cx="0" cy="0" r={R} fill="url(#mgDark)" />

                        {/* Lit phase */}
                        <motion.path d={moonD} fill="url(#mgLit)" clipPath="url(#mgEdge)" />

                        {/* Surface depth overlay */}
                        <circle cx="0" cy="0" r={R} fill="url(#mgEdgeLight)" clipPath="url(#mgEdge)" />

                        {/* Mare + crater layer */}
                        <g clipPath="url(#mgEdge)" opacity="0.5">
                            <ellipse cx="-20" cy="-12" rx="34" ry="26" fill="rgba(0,0,0,0.09)"/>
                            <ellipse cx="30"  cy="28"  rx="24" ry="18" fill="rgba(0,0,0,0.07)"/>
                            <ellipse cx="-26" cy="52"  rx="30" ry="21" fill="rgba(0,0,0,0.06)"/>
                            <circle cx="-52" cy="-16" r="14" fill="rgba(0,0,0,0.11)"/>
                            <circle cx="-52" cy="-16" r="11" fill="rgba(255,252,240,0.05)"/>
                            <circle cx="-48" cy="-14" r="4"  fill="rgba(0,0,0,0.08)"/>
                            <circle cx="58"  cy="-44" r="15" fill="rgba(0,0,0,0.10)"/>
                            <circle cx="58"  cy="-44" r="12" fill="rgba(255,252,240,0.04)"/>
                            <circle cx="18"  cy="38"  r="10" fill="rgba(0,0,0,0.09)"/>
                            <circle cx="18"  cy="38"  r="8"  fill="rgba(255,252,240,0.04)"/>
                            <circle cx="-68" cy="28"  r="8"  fill="rgba(0,0,0,0.08)"/>
                            <circle cx="8"   cy="-74" r="9"  fill="rgba(0,0,0,0.07)"/>
                            <circle cx="44"  cy="64"  r="7"  fill="rgba(0,0,0,0.06)"/>
                            <circle cx="-80" cy="-10" r="6"  fill="rgba(0,0,0,0.07)"/>
                            <circle cx="78"  cy="16"  r="5"  fill="rgba(0,0,0,0.06)"/>
                            <circle cx="-34" cy="82"  r="6"  fill="rgba(0,0,0,0.05)"/>
                            <circle cx="70"  cy="52"  r="5"  fill="rgba(0,0,0,0.05)"/>
                            <circle cx="-88" cy="44"  r="5"  fill="rgba(0,0,0,0.05)"/>
                        </g>

                        {/* Rim highlight */}
                        <circle cx="0" cy="0" r={R - 0.6}
                            fill="none"
                            stroke="rgba(215,208,188,0.10)"
                            strokeWidth="1.8" />

                        {/* Orbit ring */}
                        <motion.circle
                            cx="0" cy="0" r={R + 24}
                            fill="none"
                            stroke="rgba(34,211,238,0.12)"
                            strokeWidth="0.6"
                            strokeDasharray="3 5"
                            style={{ opacity: orbitRingOp }}
                        />

                        {/* Satellite ghost trail */}
                        <motion.circle cx={sat3X} cy={sat3Y} r={1.2}
                            fill="rgba(34,211,238,0.22)" />
                        <motion.circle cx={sat2X} cy={sat2Y} r={1.8}
                            fill="rgba(34,211,238,0.42)" />

                        {/* Satellite */}
                        <motion.circle cx={satX} cy={satY} r={3.2}
                            fill="rgba(34,211,238,0.25)"
                            filter="url(#satGlow)" />
                        <motion.circle cx={satX} cy={satY} r={2}
                            fill="#22D3EE" />
                    </svg>
                </motion.div>

                {/* Phase label — counter-rotated to stay upright */}
                <motion.div
                    className="absolute -bottom-8 left-0 right-0 flex justify-center"
                    style={{ rotate: useTransform(moonRotate, (r) => -r) }}
                >
                    <span
                        className="text-[8px] font-mono tracking-[0.25em] uppercase select-none"
                        style={{ color: 'var(--text-muted)', opacity: 0.5 }}
                    >
                        <PhaseLabel sv={scrollYProgress} />
                    </span>
                </motion.div>
            </motion.div>
        </>
    );
}
