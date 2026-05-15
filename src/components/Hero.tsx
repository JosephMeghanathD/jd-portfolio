import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import DecryptedText from './DecryptedText';
import { TiltCard } from './TiltCard';
import profilePic from '../assets/me.jpeg';

const contentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.55 } },
};

const lineVariant: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stats = [
    { value: '6+',   label: 'Yrs. Exp.' },
    { value: '10+',  label: 'Projects' },
    { value: '<50ms', label: 'Latency SLA' },
    { value: '3',    label: 'OSS Libraries' },
];

const socials = [
    { href: 'https://github.com/JosephMeghanathD',                    icon: FaGithub,    label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/joseph-meghanath-9880ba149/', icon: FaLinkedin,  label: 'LinkedIn' },
    { href: 'https://www.instagram.com/joe_hit_hard/',                 icon: FaInstagram, label: 'Instagram' },
];

const marqueeItems = [
    'Node.js', 'Apache Kafka', 'Redis', 'Shopify Plus', 'Docker',
    'Kubernetes', 'Spring Boot', 'PostgreSQL', 'TypeScript', 'React',
    'Python', 'Elasticsearch', 'Prometheus', 'Grafana', 'Java',
];

export const Hero = () => {
    const { scrollY } = useScroll();
    const heroY     = useTransform(scrollY, [0, 600], [0, -45]);
    const imageScale = useTransform(scrollY, [0, 400], [1, 1.05]);

    return (
        <section
            id="hero"
            className="relative min-h-[100dvh] flex flex-col px-6 sm:px-10 lg:px-20 xl:px-28 pt-24 overflow-hidden"
        >
            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background-primary/55 via-transparent to-background-primary/95 z-0" />

            <motion.div
                className="relative z-10 w-full max-w-7xl mx-auto flex flex-col flex-1"
                style={{ y: heroY }}
            >
                {/* ── SYSTEM HEADER BAR ── */}
                <motion.div
                    className="flex items-center justify-between py-3 border-b border-border-color"
                    initial={{ opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="flex items-center gap-3 sm:gap-5 text-[10px] font-mono text-text-muted">
                        <span className="tabular-nums tracking-widest text-text-muted/60">SYS/001</span>
                        <span className="hidden sm:block w-8 h-px bg-border-color" />
                        <span className="uppercase tracking-[0.18em]">Platform Engineer</span>
                        <span className="hidden md:flex items-center gap-1.5">
                            <span className="text-border-color mx-1">·</span>
                            <span>Lucky Orange</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border-color bg-background-elevated/40 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2 flex-shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                            </span>
                            <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">Available</span>
                        </div>
                        {/* Mini avatar */}
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-accent/30 flex-shrink-0">
                            <img src={profilePic} alt="Joseph D" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </motion.div>

                {/* ── MAIN CONTENT ── */}
                <div className="flex-1 flex flex-col justify-center py-6 lg:py-8">

                    {/* ── GIANT NAME — full container width ── */}
                    <motion.div
                        className="mb-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                    >
                        <h1 className="font-display font-extrabold leading-[0.85] tracking-[-0.02em] text-[clamp(3.5rem,13vw,12rem)]">
                            <DecryptedText
                                text="JOSEPH"
                                animateOn="view"
                                sequential
                                useOriginalCharsOnly
                                speed={42}
                                className="text-text-primary"
                                encryptedClassName="text-accent"
                            />{' '}
                            <DecryptedText
                                text="D."
                                animateOn="view"
                                sequential
                                useOriginalCharsOnly
                                speed={68}
                                className="text-accent"
                                encryptedClassName="text-text-muted"
                            />
                        </h1>
                    </motion.div>

                    {/* ── Signature divider — draws left → right ── */}
                    <motion.div
                        className="h-px w-full mb-6 lg:mb-8"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            background: 'linear-gradient(to right, var(--accent) 0%, rgba(34,211,238,0.25) 55%, transparent 80%)',
                            transformOrigin: 'left center',
                        }}
                    />

                    {/* ── TWO-COL: left content | right photo panel ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-10 xl:gap-14 items-start">

                        {/* LEFT */}
                        <motion.div
                            className="flex flex-col"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Typewriter */}
                            <motion.div variants={lineVariant} className="mb-5 h-7">
                                <TypeAnimation
                                    sequence={[
                                        'Building distributed systems at scale.', 2500,
                                        'Architecting SDK infrastructure.', 2000,
                                        'Engineering sub-50ms microservices.', 2200,
                                        'Shipping platform integrations.', 2000,
                                    ]}
                                    wrapper="p"
                                    cursor={true}
                                    repeat={Infinity}
                                    className="text-base sm:text-lg md:text-xl text-text-secondary font-medium"
                                />
                            </motion.div>

                            {/* Bio */}
                            <motion.p
                                variants={lineVariant}
                                className="text-base text-text-secondary leading-relaxed max-w-[52ch] mb-8"
                            >
                                Platform Engineer at Lucky Orange. I architect high-throughput SDK
                                infrastructure, build sub-50ms microservices, and ship integrations
                                that power millions of merchant websites.
                            </motion.p>

                            {/* CTAs + Socials */}
                            <motion.div variants={lineVariant} className="flex items-center gap-3 flex-wrap mb-10">
                                <Link to="projects" smooth offset={-80} duration={500}>
                                    <motion.button
                                        className="group inline-flex items-center gap-2 px-6 py-3 bg-accent text-[#09090B] font-bold rounded-xl text-sm tracking-wide"
                                        whileHover={{ y: -3, boxShadow: '0 20px 40px rgba(34,211,238,0.30)' }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                    >
                                        View Projects
                                        <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-200" />
                                    </motion.button>
                                </Link>
                                <Link to="contact" smooth offset={-80} duration={500}>
                                    <motion.button
                                        className="px-6 py-3 glass-card rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent/30 transition-colors"
                                        whileHover={{ y: -3 }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                    >
                                        Get In Touch
                                    </motion.button>
                                </Link>
                                <div className="flex items-center gap-1 ml-1">
                                    {socials.map(({ href, icon: Icon, label }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="w-9 h-9 flex items-center justify-center rounded-xl text-text-muted hover:text-accent hover:bg-accent/10 border border-transparent hover:border-accent/20 transition-all duration-300"
                                        >
                                            <Icon size={16} />
                                        </a>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Stats — 4 metrics in a clean row */}
                            <motion.div
                                variants={lineVariant}
                                className="flex items-end gap-8 sm:gap-10 pt-7 border-t border-border-color"
                            >
                                {stats.map((stat, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <span className="text-xl sm:text-2xl font-display font-extrabold text-accent leading-none tabular-nums">
                                            {stat.value}
                                        </span>
                                        <span className="text-[9px] sm:text-[10px] text-text-muted font-mono uppercase tracking-widest whitespace-nowrap">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* RIGHT — Data panel */}
                        <motion.div
                            className="hidden lg:flex flex-col"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Panel titlebar */}
                            <div className="flex items-center justify-between px-4 py-2.5 rounded-t-2xl border border-b-0 border-glass-border bg-background-elevated/50 backdrop-blur-sm">
                                <span className="text-[9px] font-mono text-text-muted uppercase tracking-[0.18em]">
                                    Operator / JD
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-border-color" />
                                </div>
                            </div>

                            {/* Photo */}
                            <TiltCard intensity={7} className="rounded-b-2xl rounded-tr-none flex-1">
                                <div
                                    className="relative overflow-hidden rounded-b-2xl rounded-tr-none border border-glass-border"
                                    style={{ boxShadow: '0 28px 70px rgba(0,0,0,0.45), 0 0 0 1px var(--glass-border)' }}
                                >
                                    <motion.img
                                        src={profilePic}
                                        alt="Joseph D"
                                        className="w-full object-cover"
                                        style={{ height: 'clamp(280px, 32vw, 380px)', scale: imageScale }}
                                    />

                                    {/* Inner gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-primary/70 via-transparent to-transparent pointer-events-none" />

                                    {/* Bottom chips row */}
                                    <div className="absolute bottom-4 inset-x-4 flex items-end justify-between pointer-events-none">
                                        <div className="bg-background-elevated/90 backdrop-blur-xl rounded-xl px-3.5 py-2.5 border border-glass-border shadow-lg">
                                            <p className="text-[8px] text-text-muted font-mono uppercase tracking-widest mb-0.5">Latency SLA</p>
                                            <p className="text-base font-display font-bold text-accent leading-none">&lt;50ms</p>
                                        </div>
                                        <div className="bg-background-elevated/90 backdrop-blur-xl rounded-xl px-3.5 py-2.5 border border-glass-border shadow-lg">
                                            <p className="text-[8px] text-text-muted font-mono uppercase tracking-widest mb-0.5">Experience</p>
                                            <p className="text-base font-display font-bold text-accent leading-none">6+ Yrs</p>
                                        </div>
                                    </div>

                                    {/* Scan-line accent on top edge of photo */}
                                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent pointer-events-none" />
                                </div>
                            </TiltCard>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* ── TECH MARQUEE ── */}
            <motion.div
                className="relative z-10 border-t border-border-color py-4 marquee-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
            >
                <div className="flex items-center gap-10 w-max animate-marquee">
                    {[...marqueeItems, ...marqueeItems].map((item, i) => (
                        <span key={i} className="flex items-center gap-2.5 text-text-muted text-xs font-mono whitespace-nowrap">
                            <span className="w-1 h-1 rounded-full bg-accent/40 flex-shrink-0" />
                            {item}
                        </span>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
