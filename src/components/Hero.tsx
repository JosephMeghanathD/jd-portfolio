import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import DecryptedText from './DecryptedText';
import { TiltCard } from './TiltCard';
import profilePic from '../assets/me.jpeg';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 28, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Chip = ({ children, accent }: { children: React.ReactNode; accent?: boolean }) => (
    <div
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium border backdrop-blur-sm
            ${accent
                ? 'bg-accent-dim border-accent/30 text-accent'
                : 'bg-glass-bg border-glass-border text-text-secondary'
            }`}
    >
        {children}
    </div>
);

export const Hero = () => {
    const { scrollY } = useScroll();
    const contentY = useTransform(scrollY, [0, 600], [0, -60]);
    const imageY = useTransform(scrollY, [0, 600], [0, -30]);

    return (
        <section id="hero" className="relative min-h-[100dvh] flex items-center px-6 sm:px-10 lg:px-20 xl:px-28 pt-24 pb-16 overflow-hidden">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background-primary/80 via-transparent to-background-primary/80 z-0" />

            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-center">

                    {/* ── Left: Content ── */}
                    <motion.div
                        style={{ y: contentY }}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-start"
                    >
                        {/* Status badge */}
                        <motion.div variants={itemVariants} className="mb-8">
                            <div className="inline-flex items-center gap-2.5 glass-card rounded-full px-4 py-2 border-accent/20">
                                <span className="w-2 h-2 bg-accent rounded-full animate-pulse flex-shrink-0" />
                                <span className="text-accent text-sm font-medium tracking-wide">
                                    Sr. Platform Engineer · Lucky Orange
                                </span>
                            </div>
                        </motion.div>

                        {/* Name */}
                        <motion.div variants={itemVariants} className="mb-5">
                            <h1 className="text-[clamp(3.5rem,9vw,8rem)] font-bold leading-[0.9] tracking-tight"
                                style={{ textShadow: '0 0 80px rgba(34,211,238,0.15)' }}>
                                <DecryptedText
                                    text="JOSEPH"
                                    animateOn="view"
                                    sequential
                                    useOriginalCharsOnly
                                    speed={55}
                                    className="text-text-primary"
                                    encryptedClassName="text-accent"
                                />
                                <br />
                                <DecryptedText
                                    text="D."
                                    animateOn="view"
                                    sequential
                                    useOriginalCharsOnly
                                    speed={80}
                                    className="text-accent"
                                    encryptedClassName="text-text-muted"
                                />
                            </h1>
                        </motion.div>

                        {/* Typewriter */}
                        <motion.div variants={itemVariants} className="mb-6 h-7">
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
                                className="text-lg md:text-xl text-text-secondary font-medium"
                            />
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                            variants={itemVariants}
                            className="text-base text-text-secondary leading-relaxed max-w-[52ch] mb-10"
                        >
                            Platform Engineer at Lucky Orange. I architect high-throughput SDK
                            infrastructure, build sub-50ms microservices, and ship integrations
                            that power millions of merchant websites.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div variants={itemVariants} className="flex items-center gap-4 flex-wrap mb-8">
                            <Link to="projects" smooth offset={-80} duration={500}>
                                <motion.button
                                    className="px-7 py-3.5 bg-accent text-[#09090B] font-bold rounded-xl text-sm tracking-wide shadow-lg shadow-accent/20"
                                    whileHover={{ y: -3, boxShadow: '0 20px 40px rgba(34,211,238,0.3)' }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                >
                                    View Projects
                                </motion.button>
                            </Link>
                            <Link to="contact" smooth offset={-80} duration={500}>
                                <motion.button
                                    className="px-7 py-3.5 glass-card rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent/30 transition-colors"
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                >
                                    Get In Touch
                                </motion.button>
                            </Link>
                            <div className="flex items-center gap-2 ml-1">
                                {[
                                    { href: 'https://github.com/JosephMeghanathD', icon: FaGithub, label: 'GitHub' },
                                    { href: 'https://www.linkedin.com/in/joseph-meghanath-9880ba149/', icon: FaLinkedin, label: 'LinkedIn' },
                                    { href: 'https://www.instagram.com/joe_hit_hard/', icon: FaInstagram, label: 'Instagram' },
                                ].map(({ href, icon: Icon, label }) => (
                                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                        aria-label={label}
                                        className="w-9 h-9 flex items-center justify-center rounded-xl text-text-muted hover:text-accent hover:bg-accent/10 border border-transparent hover:border-accent/20 transition-all duration-300">
                                        <Icon size={19} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Floating tech chips row */}
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                            {['Node.js', 'Kafka', 'Redis', 'Shopify Plus', 'Docker', 'K8s'].map(t => (
                                <Chip key={t}>{t}</Chip>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── Right: 3D Profile Image ── */}
                    <motion.div
                        className="flex justify-center lg:justify-end"
                        style={{ y: imageY }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <TiltCard intensity={12} className="rounded-3xl">
                            <div className="relative w-[300px] h-[360px] md:w-[340px] md:h-[410px]">

                                {/* Glow behind image */}
                                <div className="absolute inset-0 rounded-3xl"
                                    style={{ background: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.15) 0%, transparent 70%)' }} />

                                {/* Profile image */}
                                <div
                                    className="w-full h-full rounded-3xl overflow-hidden border border-glass-border shadow-2xl"
                                    style={{ transform: 'translateZ(0px)', boxShadow: '0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px var(--glass-border)' }}
                                >
                                    <img src={profilePic} alt="Joseph D" className="w-full h-full object-cover" />
                                </div>

                                {/* Floating 3D chips — rise above the image surface */}
                                <div style={{ transform: 'translateZ(40px)' }}
                                    className="absolute -top-4 -left-8 bg-background-elevated backdrop-blur-xl rounded-2xl px-4 py-3 shadow-xl border border-accent/30">
                                    <p className="text-xs text-text-secondary font-mono uppercase tracking-widest mb-0.5">Latency SLA</p>
                                    <p className="text-lg font-bold text-accent">&lt; 50ms</p>
                                </div>

                                <div style={{ transform: 'translateZ(50px)' }}
                                    className="absolute -bottom-4 -right-8 bg-background-elevated backdrop-blur-xl rounded-2xl px-4 py-3 shadow-xl border border-accent/30">
                                    <p className="text-xs text-text-secondary font-mono uppercase tracking-widest mb-0.5">Experience</p>
                                    <p className="text-lg font-bold text-accent">6+ Years</p>
                                </div>

                                {/* Corner accents — on free corners (top-right, bottom-left) */}
                                <div style={{ transform: 'translateZ(20px)' }}
                                    className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-accent/40 rounded-tr-2xl pointer-events-none" />
                                <div style={{ transform: 'translateZ(20px)' }}
                                    className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-accent/20 rounded-bl-2xl pointer-events-none" />
                            </div>
                        </TiltCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
