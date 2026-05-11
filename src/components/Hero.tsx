import { motion, type Variants } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import DecryptedText from './DecryptedText';
import profilePic from '../assets/me.jpeg';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
};

const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

export const Hero = () => {
    return (
        <section id="hero" className="relative min-h-[100dvh] flex items-center px-6 sm:px-10 lg:px-20 xl:px-28 pt-24 pb-16 overflow-hidden">
            {/* Dot grid background */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.25] dark:opacity-[0.15]"
                style={{
                    backgroundImage: 'radial-gradient(circle, var(--text-muted) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background-primary via-transparent to-background-primary" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background-primary via-transparent to-background-primary" />
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-center">

                    {/* Left: Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-start"
                    >
                        {/* Current role badge */}
                        <motion.div variants={itemVariants} className="mb-7">
                            <div className="inline-flex items-center gap-2.5 bg-accent-dim border border-accent/20 rounded-full px-4 py-2">
                                <span className="w-2 h-2 bg-accent rounded-full animate-pulse flex-shrink-0" />
                                <span className="text-accent text-sm font-medium tracking-wide">
                                    Sr. Platform Engineer · Lucky Orange
                                </span>
                            </div>
                        </motion.div>

                        {/* Name */}
                        <motion.div variants={itemVariants} className="mb-5">
                            <h1 className="text-[clamp(3.5rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-tight">
                                <DecryptedText
                                    text="JOSEPH"
                                    animateOn="view"
                                    sequential
                                    useOriginalCharsOnly
                                    speed={60}
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

                        {/* Type animation */}
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
                        <motion.div variants={itemVariants} className="flex items-center gap-5 flex-wrap">
                            <Link to="projects" smooth offset={-80} duration={500}>
                                <motion.button
                                    className="px-6 py-3 bg-accent text-[#09090B] font-bold rounded-xl text-sm tracking-wide"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                >
                                    View Projects
                                </motion.button>
                            </Link>

                            <Link to="contact" smooth offset={-80} duration={500}>
                                <motion.button
                                    className="px-6 py-3 border border-border-color text-text-secondary font-medium rounded-xl text-sm hover:text-text-primary hover:border-accent/40 transition-colors"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                >
                                    Get In Touch
                                </motion.button>
                            </Link>

                            <div className="flex items-center gap-4 ml-1">
                                <a
                                    href="https://github.com/JosephMeghanathD"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="text-text-muted hover:text-accent transition-colors"
                                >
                                    <FaGithub size={22} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/joseph-meghanath-9880ba149/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="text-text-muted hover:text-accent transition-colors"
                                >
                                    <FaLinkedin size={22} />
                                </a>
                                <a
                                    href="https://www.instagram.com/joe_hit_hard/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="text-text-muted hover:text-accent transition-colors"
                                >
                                    <FaInstagram size={22} />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Profile Image */}
                    <motion.div
                        className="flex justify-center lg:justify-end"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative">
                            {/* Decorative corner frame — top right */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-accent/30 rounded-tr-2xl pointer-events-none" />
                            {/* Decorative corner frame — bottom left */}
                            <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-accent/20 rounded-bl-2xl pointer-events-none" />

                            {/* Image container */}
                            <div className="w-72 h-80 md:w-80 md:h-[22rem] rounded-3xl overflow-hidden border border-border-color shadow-2xl shadow-black/30 animate-glow">
                                <img
                                    src={profilePic}
                                    alt="Joseph D"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating stat chip */}
                            <motion.div
                                className="absolute -bottom-5 -right-5 bg-background-elevated border border-border-color rounded-2xl px-4 py-3 shadow-xl"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <p className="text-xs text-text-muted font-mono uppercase tracking-widest mb-0.5">Experience</p>
                                <p className="text-lg font-bold text-text-primary">6+ Years</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
