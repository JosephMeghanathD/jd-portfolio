import { motion } from 'framer-motion';

const J = "M 5 3 H 20 V 26 Q 20 33 12 33 Q 4 33 4 26";
const D = "M 26 3 V 33 Q 58 33 58 18 Q 58 3 26 3";

const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (delay: number) => ({
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: { delay, duration: 1.1, ease: 'easeInOut' as const },
            opacity: { delay, duration: 0.01 },
        },
    }),
};

const sweepVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: [0, 1, 0],
        opacity: [0, 0.8, 0],
        transition: {
            duration: 1.8,
            ease: 'easeInOut' as const,
            repeat: Infinity,
            repeatDelay: 4,
            delay: 1.8,
        },
    },
};

export const Logo = () => (
    <motion.svg
        width="62"
        height="36"
        viewBox="0 0 62 36"
        fill="none"
        initial="hidden"
        animate="visible"
        aria-label="JD"
    >
        <defs>
            <filter id="lf-glow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* J */}
        <motion.path
            d={J}
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            custom={0}
            variants={drawVariants}
        />

        {/* D */}
        <motion.path
            d={D}
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            custom={0.3}
            variants={drawVariants}
        />

        {/* Perpetual glow sweep on D */}
        <motion.path
            d={D}
            stroke="var(--accent-hover)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            filter="url(#lf-glow)"
            variants={sweepVariants}
        />
    </motion.svg>
);
