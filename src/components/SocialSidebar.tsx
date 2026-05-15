import { motion, useScroll, useTransform, AnimatePresence, type MotionValue } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';

/* ── Channel definitions ─────────────────────────────────── */
const links = [
    {
        icon: FaGithub,
        href: 'https://github.com/JosephMeghanathD',
        label: 'GitHub',
        code: 'GH',
        status: 'OPEN SOURCE',
        accent: 'var(--text-primary)',
        glowRgb: '160,160,160',
        panelBg: 'rgba(160,160,160,0.08)',
        panelBorder: 'rgba(160,160,160,0.18)',
    },
    {
        icon: FaLinkedin,
        href: 'https://www.linkedin.com/in/joseph-meghanath-9880ba149/',
        label: 'LinkedIn',
        code: 'LI',
        status: 'PROFESSIONAL',
        accent: '#3B82F6',
        glowRgb: '59,130,246',
        panelBg: 'rgba(59,130,246,0.09)',
        panelBorder: 'rgba(59,130,246,0.22)',
    },
    {
        icon: FaInstagram,
        href: 'https://www.instagram.com/joe_hit_hard/',
        label: 'Instagram',
        code: 'IG',
        status: 'SOCIAL',
        accent: '#EC4899',
        glowRgb: '236,72,153',
        panelBg: 'rgba(236,72,153,0.09)',
        panelBorder: 'rgba(236,72,153,0.22)',
    },
    {
        icon: FaEnvelope,
        href: 'mailto:josephmeghanath@gmail.com',
        label: 'Email',
        code: 'EM',
        status: 'DIRECT LINE',
        accent: 'var(--accent)',
        glowRgb: '34,211,238',
        panelBg: 'var(--accent-dim)',
        panelBorder: 'rgba(34,211,238,0.22)',
    },
] as const;

/* ── Animated signal bars ─────────────────────────────────── */
function SignalBars({ active, glowRgb }: { active: boolean; glowRgb: string }) {
    return (
        <div className="flex items-end gap-[2px]" aria-hidden="true">
            {[4, 7, 10].map((h, i) => (
                <motion.span
                    key={i}
                    className="block w-[2px] rounded-[1px]"
                    style={{
                        height: h,
                        background: active ? `rgb(${glowRgb})` : 'var(--text-muted)',
                        transformOrigin: '50% 100%',
                    }}
                    animate={{
                        scaleY: active
                            ? [1, 1.55, 0.55, 1.35, 1]
                            : [1, 1.08, 0.93, 1.04, 1],
                        opacity: active
                            ? [0.7, 1, 0.4, 0.95, 0.7]
                            : [0.2, 0.38, 0.2, 0.32, 0.2],
                    }}
                    transition={{
                        duration: active ? 1.05 : 3,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

/* ── Measurement rail with tick marks ────────────────────── */
function MeasureRail({ flip = false }: { flip?: boolean }) {
    return (
        <motion.div
            className="relative flex justify-center"
            style={{ width: 1, height: 72, transformOrigin: flip ? 'bottom center' : 'top center' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Gradient line */}
            <div
                className="absolute inset-0"
                style={{
                    background: flip
                        ? 'linear-gradient(to bottom, var(--accent) 0%, transparent 100%)'
                        : 'linear-gradient(to bottom, transparent 0%, var(--accent) 100%)',
                    opacity: 0.55,
                }}
            />
            {/* Tick marks */}
            {[18, 36, 54].map((top, i) => (
                <div
                    key={i}
                    aria-hidden="true"
                    className="absolute"
                    style={{
                        top,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: i === 1 ? 10 : 6,
                        height: 1,
                        background: 'var(--accent)',
                        opacity: 0.38,
                    }}
                />
            ))}
        </motion.div>
    );
}

/* ── Scroll progress rail ─────────────────────────────────── */
function ScrollRail({ progress }: { progress: MotionValue<string> }) {
    return (
        <motion.div
            className="relative"
            style={{ width: 1, height: 72, transformOrigin: 'top center' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Dim track */}
            <div
                className="absolute inset-0"
                style={{ background: 'var(--accent)', opacity: 0.12 }}
            />
            {/* Live fill */}
            <motion.div
                className="absolute top-0 inset-x-0"
                style={{
                    height: progress,
                    background: 'linear-gradient(to bottom, var(--accent), rgba(34,211,238,0.35))',
                    opacity: 0.85,
                }}
            />
            {/* Tick marks */}
            {[18, 36, 54].map((top, i) => (
                <div
                    key={i}
                    aria-hidden="true"
                    className="absolute"
                    style={{
                        top,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: i === 1 ? 10 : 6,
                        height: 1,
                        background: 'var(--accent)',
                        opacity: 0.28,
                    }}
                />
            ))}
        </motion.div>
    );
}

/* ── Individual channel node ──────────────────────────────── */
function ChannelNode({
    link,
    idx,
    isHovered,
    onEnter,
    onLeave,
    showSeparator,
}: {
    link: typeof links[number];
    idx: number;
    isHovered: boolean;
    onEnter: () => void;
    onLeave: () => void;
    showSeparator: boolean;
}) {
    const Icon = link.icon;

    return (
        <>
            <motion.div
                className="relative"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + idx * 0.09, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Hover glow bloom */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                boxShadow: `0 0 20px rgba(${link.glowRgb},0.25), 0 0 8px rgba(${link.glowRgb},0.15)`,
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* The button */}
                <motion.a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="relative flex items-center justify-center overflow-hidden"
                    style={{
                        width: 46,
                        height: 46,
                        borderRadius: 12,
                        background: isHovered ? link.panelBg : 'transparent',
                        border: `1px solid ${isHovered ? link.panelBorder : 'transparent'}`,
                        transition: 'background 0.2s ease, border-color 0.2s ease',
                    }}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                    whileTap={{ scale: 0.88 }}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                >
                    {/* Scan-line sweep on hover */}
                    <motion.div
                        className="absolute inset-y-0 w-12 pointer-events-none"
                        style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.09) 50%, transparent 100%)',
                        }}
                        variants={{
                            rest: { x: '-150%' },
                            hover: { x: '250%' },
                        }}
                        transition={{ duration: 0.48, ease: 'easeOut' }}
                    />

                    {/* Icon */}
                    <span
                        className="relative z-10 transition-none"
                        style={{
                            color: isHovered ? link.accent : 'var(--text-muted)',
                            transition: 'color 0.18s ease',
                        }}
                    >
                        <Icon size={18} />
                    </span>

                    {/* Code badge — bottom right */}
                    <span
                        className="absolute bottom-[3px] right-[4px] font-mono leading-none pointer-events-none"
                        style={{
                            fontSize: 7,
                            color: isHovered ? link.accent : 'var(--text-muted)',
                            opacity: isHovered ? 0.9 : 0.45,
                            transition: 'color 0.18s ease, opacity 0.18s ease',
                            letterSpacing: '0.04em',
                        }}
                    >
                        {link.code}
                    </span>
                </motion.a>

                {/* Expand panel — slides out to the right */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="absolute top-0 left-full ml-2.5 z-50"
                            initial={{ opacity: 0, x: -10, scaleX: 0.88 }}
                            animate={{ opacity: 1, x: 0, scaleX: 1 }}
                            exit={{ opacity: 0, x: -8, scaleX: 0.92 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            style={{ transformOrigin: 'left center' }}
                        >
                            <div
                                className="flex flex-col justify-center px-3.5 py-2.5 rounded-xl whitespace-nowrap"
                                style={{
                                    height: 46,
                                    background: link.panelBg,
                                    border: `1px solid ${link.panelBorder}`,
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    boxShadow: `0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px ${link.panelBorder}`,
                                }}
                            >
                                {/* Label */}
                                <p
                                    className="font-bold leading-none mb-1.5"
                                    style={{
                                        fontSize: 12,
                                        color: link.accent,
                                        fontFamily: "'JetBrains Mono', monospace",
                                    }}
                                >
                                    {link.label}
                                </p>

                                {/* Status + signal */}
                                <div className="flex items-center gap-2.5">
                                    <p
                                        className="font-mono uppercase leading-none"
                                        style={{ fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.15em' }}
                                    >
                                        {link.status}
                                    </p>
                                    <SignalBars active={true} glowRgb={link.glowRgb} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Node separator */}
            {showSeparator && (
                <div
                    className="self-center"
                    style={{ width: 1, height: 4, background: 'var(--border-color)' }}
                    aria-hidden="true"
                />
            )}
        </>
    );
}

/* ══════════════════════════════════════════════════════════ */
export const SocialSidebar = () => {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const { scrollYProgress } = useScroll();
    const scrollH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div className="fixed left-0 inset-y-0 z-40 hidden md:flex items-center pointer-events-none pl-4">
            <motion.div
                className="pointer-events-auto flex flex-col items-center"
                initial={{ x: '-130%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                transition={{ delay: 0.95, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* COMMS vertical label */}
                <motion.span
                    className="font-mono uppercase select-none mb-2"
                    style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        fontSize: 7.5,
                        letterSpacing: '0.32em',
                        color: 'var(--text-muted)',
                        opacity: 0,
                    }}
                    animate={{ opacity: 0.45 }}
                    transition={{ delay: 1.55, duration: 0.5 }}
                    aria-hidden="true"
                >
                    COMMS
                </motion.span>

                {/* Top measurement rail */}
                <MeasureRail />

                {/* Channel panel */}
                <motion.div
                    className="flex flex-col items-center py-2 px-1.5 rounded-2xl"
                    style={{
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        boxShadow:
                            '0 0 48px rgba(34,211,238,0.07), ' +
                            '0 12px 40px rgba(0,0,0,0.22), ' +
                            'inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                >
                    {links.map((link, i) => (
                        <ChannelNode
                            key={link.label}
                            link={link}
                            idx={i}
                            isHovered={hoveredIdx === i}
                            onEnter={() => setHoveredIdx(i)}
                            onLeave={() => setHoveredIdx(null)}
                            showSeparator={i < links.length - 1}
                        />
                    ))}
                </motion.div>

                {/* Scroll progress rail */}
                <ScrollRail progress={scrollH} />

                {/* Progress label */}
                <motion.span
                    className="font-mono uppercase select-none mt-1.5"
                    style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        fontSize: 7,
                        letterSpacing: '0.28em',
                        color: 'var(--text-muted)',
                        opacity: 0,
                    }}
                    animate={{ opacity: 0.35 }}
                    transition={{ delay: 1.7, duration: 0.5 }}
                    aria-hidden="true"
                >
                    SCROLL
                </motion.span>
            </motion.div>
        </div>
    );
};
