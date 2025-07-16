import { motion } from 'framer-motion';

export const Logo = () => {
  const svgVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Animate each group with a slight delay
      },
    },
  };

  // Variant for the main letter strokes to draw themselves
  const strokeVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: 'easeInOut' },
    },
  };

  // Variant for the solid fill to appear after the stroke is drawn
  const fillVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.8 },
    },
  };

  // Variant for the glowing line effect
  const glowLineVariant = {
    hidden: { pathLength: 0, opacity: 0.5 },
    visible: {
      pathLength: [0, 1, 0], // Draw on, then draw off
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        ease: 'circOut',
        repeat: Infinity,
        repeatDelay: 2,
        times: [0, 0.5, 1],
      },
    },
  };

  return (
    <motion.svg
      width="72"
      height="42"
      viewBox="0 9 58 37"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
      aria-label="Joseph D Logo"
    >
      <defs>
        {/* Main gradient for the logo's fill */}
        <linearGradient id="logo-fill-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-hover)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>

        {/* A brighter gradient for the glowing stroke effect */}
        <linearGradient id="logo-glow-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" /> {/* Lighter cyan */}
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>

        {/* A filter to create the glow effect on the stroke */}
        <filter id="logo-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Group for the solid fill of the letters */}
      <motion.g fill="url(#logo-fill-gradient)" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
        <motion.path
          d="M0.10 35.11L4.37 34.52Q4.54 38.62 5.91 40.14Q7.28 41.65 9.69 41.65Q11.47 41.65 12.77 40.83Q14.06 40.01 14.55 38.61Q15.04 37.21 15.04 34.13L15.04 9.47L19.78 9.47L19.78 33.86Q19.78 38.35 18.69 40.82Q17.60 43.29 15.25 44.58Q12.89 45.87 9.72 45.87Q5.00 45.87 2.50 43.16Q0 40.45 0.10 35.11Z"
          variants={fillVariant}
        />
        <motion.path
          d="M27.51 45.26L27.51 9.47L39.84 9.47Q44.02 9.47 46.22 9.99Q49.29 10.69 51.46 12.55Q54.30 14.94 55.70 18.66Q57.10 22.39 57.10 27.17Q57.10 31.25 56.15 34.40Q55.20 37.55 53.71 39.61Q52.22 41.67 50.45 42.86Q48.68 44.04 46.18 44.65Q43.68 45.26 40.43 45.26L27.51 45.26M32.25 41.04L39.89 41.04Q43.43 41.04 45.45 40.38Q47.46 39.72 48.66 38.53Q50.34 36.84 51.28 34.00Q52.22 31.15 52.22 27.10Q52.22 21.48 50.38 18.47Q48.54 15.45 45.90 14.43Q43.99 13.70 39.77 13.70L32.25 13.70L32.25 41.04Z"
          variants={fillVariant}
        />
      </motion.g>

      {/* Group for the animated glowing stroke */}
      <motion.g
        stroke="url(#logo-glow-gradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#logo-glow)"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.path
          d="M0.10 35.11L4.37 34.52Q4.54 38.62 5.91 40.14Q7.28 41.65 9.69 41.65Q11.47 41.65 12.77 40.83Q14.06 40.01 14.55 38.61Q15.04 37.21 15.04 34.13L15.04 9.47L19.78 9.47L19.78 33.86Q19.78 38.35 18.69 40.82Q17.60 43.29 15.25 44.58Q12.89 45.87 9.72 45.87Q5.00 45.87 2.50 43.16Q0 40.45 0.10 35.11Z"
          variants={strokeVariant}
        />
        <motion.path
          d="M27.51 45.26L27.51 9.47L39.84 9.47Q44.02 9.47 46.22 9.99Q49.29 10.69 51.46 12.55Q54.30 14.94 55.70 18.66Q57.10 22.39 57.10 27.17Q57.10 31.25 56.15 34.40Q55.20 37.55 53.71 39.61Q52.22 41.67 50.45 42.86Q48.68 44.04 46.18 44.65Q43.68 45.26 40.43 45.26L27.51 45.26M32.25 41.04L39.89 41.04Q43.43 41.04 45.45 40.38Q47.46 39.72 48.66 38.53Q50.34 36.84 51.28 34.00Q52.22 31.15 52.22 27.10Q52.22 21.48 50.38 18.47Q48.54 15.45 45.90 14.43Q43.99 13.70 39.77 13.70L32.25 13.70L32.25 41.04Z"
          variants={strokeVariant}
        />
      </motion.g>

      {/* An extra "energy" line that continuously traces the 'D' */}
      <motion.path
          d="M27.51 9.47L39.84 9.47Q44.02 9.47 46.22 9.99Q49.29 10.69 51.46 12.55Q54.30 14.94 55.70 18.66Q57.10 22.39 57.10 27.17Q57.10 31.25 56.15 34.40Q55.20 37.55 53.71 39.61Q52.22 41.67 50.45 42.86Q48.68 44.04 46.18 44.65Q43.68 45.26 40.43 45.26L27.51 45.26"
          stroke="#fff"
          strokeWidth="1"
          fill="none"
          variants={glowLineVariant}
      />
    </motion.svg>
  );
};