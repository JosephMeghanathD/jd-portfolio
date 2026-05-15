import { motion } from 'framer-motion';

// < JD > angle-bracket monogram
// Layers: chevrons draw-in → breathe out-of-phase | tip nodes blink |
//         JD text fade + shimmer | dot scales + pulses | ring expands from dot

export const Logo = () => (
    <motion.svg
        width="56"
        height="30"
        viewBox="0 0 56 30"
        fill="none"
        // allow ring to bleed slightly past SVG bounds without affecting layout
        style={{ overflow: 'visible' }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        aria-label="JD"
    >
        <defs>
            {/* Tight glow for small tip nodes */}
            <filter id="jd-tip-glow" x="-180%" y="-180%" width="460%" height="460%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="b" />
                <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
            {/* Softer, wider glow for the accent dot */}
            <filter id="jd-dot-glow" x="-250%" y="-250%" width="600%" height="600%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.6" result="b" />
                <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* ── < left chevron — draw in, then breathe ── */}
        <motion.path
            d="M 15 3 L 7 15 L 15 27"
            stroke="var(--accent)"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, strokeOpacity: 0 }}
            animate={{
                pathLength: 1,
                // 0 → appear → peak → dim → peak → settle, then repeats
                strokeOpacity: [0, 0.55, 0.92, 0.55, 0.92, 0.55],
            }}
            transition={{
                pathLength: { duration: 0.42, delay: 0.28, ease: [0.22, 1, 0.36, 1] },
                strokeOpacity: {
                    duration: 8,
                    delay: 0.28,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.07, 0.35, 0.65, 0.85, 1],
                },
            }}
        />

        {/* ── > right chevron — draw in, breathe phase-shifted (+2 s) ── */}
        <motion.path
            d="M 41 3 L 49 15 L 41 27"
            stroke="var(--accent)"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, strokeOpacity: 0 }}
            animate={{
                pathLength: 1,
                strokeOpacity: [0, 0.55, 0.92, 0.55, 0.92, 0.55],
            }}
            transition={{
                pathLength: { duration: 0.42, delay: 0.33, ease: [0.22, 1, 0.36, 1] },
                strokeOpacity: {
                    duration: 8,
                    // 2 s phase-shift so left & right glow at different moments
                    delay: 2.33,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.07, 0.35, 0.65, 0.85, 1],
                },
            }}
        />

        {/* ── Left tip node — appears after draw-in, blinks ── */}
        <motion.circle
            cx="7"
            cy="15"
            r="1.3"
            fill="var(--accent)"
            filter="url(#jd-tip-glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: 1,
                opacity: [0, 1, 0.12, 1, 0.12, 1],
            }}
            transition={{
                scale: { duration: 0.22, delay: 0.74, ease: 'backOut' },
                opacity: {
                    duration: 6,
                    delay: 0.74,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.05, 0.35, 0.6, 0.8, 1],
                },
            }}
        />

        {/* ── Right tip node — offset blink (+0.4 s) ── */}
        <motion.circle
            cx="49"
            cy="15"
            r="1.3"
            fill="var(--accent)"
            filter="url(#jd-tip-glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: 1,
                opacity: [0, 1, 0.12, 1, 0.12, 1],
            }}
            transition={{
                scale: { duration: 0.22, delay: 0.82, ease: 'backOut' },
                opacity: {
                    duration: 6,
                    delay: 1.14,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.05, 0.35, 0.6, 0.8, 1],
                },
            }}
        />

        {/* ── JD monogram — fade in, then occasional signal flicker ── */}
        <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.62, 1, 0.62, 1] }}
            transition={{
                duration: 12,
                delay: 0.56,
                repeat: Infinity,
                ease: 'easeInOut',
                // fast appear, long hold, two subtle dips, recover
                times: [0, 0.03, 0.5, 0.64, 0.74, 0.87, 1],
            }}
        >
            <text
                x="28"
                y="18"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="500"
                fontSize="11.5"
                fill="var(--text-primary)"
                letterSpacing="2.5"
            >
                JD
            </text>
        </motion.g>

        {/* ── Accent dot — scales in, then slow breathe ── */}
        <motion.circle
            cx="28"
            cy="24.5"
            r="1.6"
            fill="var(--accent)"
            filter="url(#jd-dot-glow)"
            initial={{ scale: 0 }}
            animate={{
                scale: 1,
                opacity: [0, 1, 0.38, 1, 0.38, 1, 0.38],
            }}
            transition={{
                scale: { duration: 0.28, delay: 0.74, ease: 'easeOut' },
                opacity: { duration: 5.5, delay: 0.74, repeat: Infinity, ease: 'easeInOut' },
            }}
        />

        {/* ── Ring pulse expanding from dot every ~5.5 s ── */}
        <motion.circle
            cx="28"
            cy="24.5"
            r="1.6"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.2"
            initial={{ opacity: 0 }}
            animate={{
                r: [1.6, 5, 10],
                opacity: [0, 0.72, 0],
                strokeWidth: [1.2, 0.7, 0.1],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3.5,
                delay: 1.5,
                ease: 'easeOut',
                times: [0, 0.28, 1],
            }}
        />
    </motion.svg>
);
