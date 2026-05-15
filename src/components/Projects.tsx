import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaSitemap, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';
import { SystemDiagram, hasDiagram } from './SystemDiagrams';

const projectsData = [
    {
        image: '/projects/finara.svg',
        title: 'Finara — AI Financial Storyteller',
        description: 'A full-stack AI finance platform that transforms raw transaction data into personalized financial narratives using a locally-run Gemma 3:4b model. Features ML-powered anomaly detection, time-series spending forecasts, and an interactive AI chat — with zero data egress.',
        tags: ['Java', 'Spring Boot', 'Python', 'Flask', 'Gemma AI', 'React', 'PostgreSQL', 'Docker', 'Ollama'],
        sourceUrl: 'https://github.com/JosephMeghanathD/Finara',
    },
    {
        image: '/projects/aircontrol.svg',
        title: 'AirControl — Gesture-Driven Desktop',
        description: 'A touchless desktop controller that maps real-time hand gestures to OS-level cursor actions using computer vision. One raised finger moves the cursor, a pinch click, two fingers scroll — all processed locally at ~34 FPS with no hardware beyond a standard webcam.',
        tags: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision', 'PyAutoGUI', 'Gesture Control', 'Hand Tracking'],
        sourceUrl: 'https://github.com/JoeHitHard/AirControl',
    },
    {
        image: '/projects/culinaplan.svg',
        title: 'CulinaPlan — AI Meal Planner',
        description: 'A full-stack AI-powered meal planning platform that uses Gemini 2.0 Flash to generate personalised recipes, analyse nutritional content, and suggest weekly meal plans based on dietary goals. Features daily nutrition tracking, recipe management, and a smart AI chat interface.',
        tags: ['Java', 'Spring Boot', 'Spring Security', 'Gemini AI', 'React', 'TypeScript', 'Recharts', 'PostgreSQL', 'Docker'],
        sourceUrl: 'https://github.com/JosephMeghanathD/Culina-Plan',
    },
    {
        image: '/projects/record.png',
        title: 'RecordRules v1.0.4',
        description: 'A lightweight Java library for enforcing business logic and data integrity within Java Records. Features a fluent API, record-first design, and comprehensive error collection.',
        tags: ['Java', 'Maven', 'Validation', 'Records', 'Fluent API', 'Zero Dependencies'],
        liveUrl: 'https://mvnrepository.com/artifact/io.github.josephmeghanathd/record-rules',
        sourceUrl: 'https://github.com/JosephMeghanathD/record-rules',
    },
    {
        image: '/projects/nano.png',
        title: 'NanoRetry',
        description: 'A high-performance, lightweight Java library for retrying operations in the Virtual Thread era (JDK 21+). Supports fluent API, multiple backoff strategies, and dual-layer timeouts.',
        tags: ['Java', 'Maven', 'Virtual Threads', 'Retry', 'Concurrency', 'Zero Dependencies'],
        liveUrl: 'https://mvnrepository.com/artifact/io.github.josephmeghanathd/nano-retry',
        sourceUrl: 'https://github.com/JosephMeghanathD/NanoRetry',
    },
    {
        image: '/projects/TP.png',
        title: 'TaskPilot: AI Microservices To-Do App',
        description: "A full-stack, cloud-native to-do application built with a microservice architecture, featuring AI-powered task decomposition using Google's Gemini.",
        tags: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'Docker', 'JWT', 'GCP', 'Gemini AI'],
        liveUrl: 'https://jdtaskpilot.netlify.app/',
        sourceUrl: 'https://github.com/JosephMeghanathD/TodoPilot',
    },
    {
        image: '/projects/sm.png',
        title: 'Specialty Marketplace',
        description: 'A full-stack, microservices-based e-commerce platform featuring product browsing, a shopping cart, user authentication, and order management.',
        tags: ['React', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Docker', 'JWT', 'GCP', 'Netlify'],
        liveUrl: 'https://specalitymarketplace.netlify.app/',
        sourceUrl: 'https://github.com/JosephMeghanathD/Specialty-Marketplace',
    },
    {
        image: '/projects/ride.png',
        title: 'AAD RideShare Application',
        description: 'A privacy-first, full-stack ride-sharing platform for students and professionals to split costs, reduce emissions, and build community.',
        tags: ['React', 'Spring Boot', 'PostgreSQL', 'Docker', 'JWT', 'GCP', 'Netlify'],
        liveUrl: 'https://jdride.netlify.app/',
        sourceUrl: 'https://github.com/JoeHitHard/AAD-RideShareApplication',
    },
    {
        image: '/projects/flyfish.png',
        title: 'Fly Fish - Virtual Art Gallery',
        description: 'A virtual art gallery for sustainable living, featuring artisan products and interactive animations with a mobile-first, responsive design.',
        tags: ['React', 'Netlify', 'CSS Grid', 'Flexbox'],
        liveUrl: 'https://flyfish.netlify.app/',
        sourceUrl: 'https://github.com/JosephMeghanathD/fly-fish',
    },
    {
        image: '/projects/sudoku.png',
        title: 'Interactive Sudoku Game',
        description: 'A classic logic-based Sudoku puzzle game built with vanilla JavaScript, featuring a clean UI and validation logic.',
        tags: ['JavaScript', 'HTML5', 'CSS3'],
        liveUrl: 'https://josephmeghanathd.github.io/sudoku',
        sourceUrl: 'https://github.com/JosephMeghanathD/sudoku',
    },
    {
        image: '/projects/xo.png',
        title: 'Tic-Tac-Toe (XO)',
        description: 'The classic game of Tic-Tac-Toe. A simple yet fun project to demonstrate game state management and win-condition logic.',
        tags: ['JavaScript', 'HTML5', 'CSS3'],
        liveUrl: 'https://josephmeghanathd.github.io/XO',
        sourceUrl: 'https://github.com/JosephMeghanathD/XO',
    },
    {
        image: '/projects/multi.png',
        title: 'Multi-Line to Single-Line Tool',
        description: 'A handy browser utility to convert multi-line text blocks into a single continuous line, useful for various data formatting tasks.',
        tags: ['JavaScript', 'HTML5', 'CSS3'],
        liveUrl: 'https://josephmeghanathd.github.io/MultiLinetoSingleLine',
        sourceUrl: 'https://github.com/JosephMeghanathD/MultiLinetoSingleLine',
    },
];

/* ── Mobile compact card ─────────────────────────────────── */
const MobileCard = ({ project, index }: { project: typeof projectsData[0]; index: number }) => (
    <motion.div
        className="rounded-2xl overflow-hidden border border-glass-border bg-glass-bg backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: index * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
        <div className="relative h-40 overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-primary/80 via-transparent to-transparent" />
            <span className="absolute top-2.5 left-3 text-[10px] font-mono text-white/50 tabular-nums">
                {String(index + 1).padStart(2, '0')}
            </span>
            {hasDiagram(project.title) && (
                <span className="absolute top-2.5 right-3 text-[8px] font-mono text-accent border border-accent/30 bg-background-elevated/80 backdrop-blur-sm px-1.5 py-0.5 rounded">
                    ARCH
                </span>
            )}
        </div>
        <div className="p-4">
            <h3 className="text-sm font-bold text-text-primary mb-2 leading-snug">{project.title}</h3>
            <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-border-color text-text-muted">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-border-color">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-accent text-xs font-semibold hover:text-accent-hover transition-colors">
                    <FaExternalLinkAlt size={10} /> Demo
                </a>
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-text-secondary text-xs font-semibold hover:text-text-primary transition-colors">
                    <FaGithub size={12} /> Source
                </a>
            </div>
        </div>
    </motion.div>
);

/* ── Main component ──────────────────────────────────────── */
export const Projects = () => {
    const [activeIdx, setActiveIdx] = useState(0);
    const active = projectsData[activeIdx];
    const activeHasDiagram = hasDiagram(active.title);

    return (
        <section id="projects" className="py-24 px-6 sm:px-10 lg:px-20 xl:px-28">
            <div className="max-w-7xl mx-auto">

                {/* ── Header ── */}
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-label">03 / Projects</span>
                    <h2 className="section-heading">My Projects</h2>
                </motion.div>

                {/* ── DESKTOP: Dossier split-panel ── */}
                <div className="hidden lg:grid lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-0 items-start">

                    {/* LEFT — Index rail */}
                    <div className="border-r border-border-color pr-6 xl:pr-10 sticky top-28 self-start">
                        {/* Rail header */}
                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-border-color">
                            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Index</span>
                            <span className="text-[10px] font-mono text-text-muted tabular-nums">
                                {String(activeIdx + 1).padStart(2, '0')} / {projectsData.length}
                            </span>
                        </div>

                        {/* Project rows */}
                        <div className="flex flex-col">
                            {projectsData.map((project, i) => {
                                const isActive = i === activeIdx;
                                return (
                                    <motion.button
                                        key={project.title}
                                        onClick={() => setActiveIdx(i)}
                                        className={`relative group flex items-start gap-3 py-3.5 border-b border-border-color text-left pl-3 transition-colors duration-200 ${
                                            isActive ? 'bg-accent/[0.04]' : 'hover:bg-background-secondary/40'
                                        }`}
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {/* Sliding accent bar */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-project-bar"
                                                className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent"
                                                transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                                            />
                                        )}

                                        {/* Index number */}
                                        <span className={`text-[10px] font-mono tabular-nums flex-shrink-0 mt-0.5 transition-colors duration-200 ${
                                            isActive ? 'text-accent' : 'text-text-muted group-hover:text-text-secondary'
                                        }`}>
                                            {String(i + 1).padStart(2, '0')}
                                        </span>

                                        {/* Title + tags */}
                                        <div className="flex-1 min-w-0">
                                            <span className={`text-[13px] font-bold leading-snug block truncate transition-colors duration-200 ${
                                                isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
                                            }`}>
                                                {project.title}
                                            </span>
                                            <div className="flex gap-2 mt-1 flex-wrap">
                                                {project.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className={`text-[9px] font-mono transition-colors duration-200 ${
                                                        isActive ? 'text-accent/70' : 'text-text-muted'
                                                    }`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right badges */}
                                        <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                                            {hasDiagram(project.title) && (
                                                <span className="text-[8px] font-mono text-accent border border-accent/25 px-1.5 py-0.5 rounded leading-none">
                                                    ARCH
                                                </span>
                                            )}
                                            <FaArrowRight
                                                size={9}
                                                className={`transition-all duration-200 ${
                                                    isActive ? 'text-accent' : 'text-text-muted opacity-0 group-hover:opacity-100'
                                                }`}
                                            />
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT — Active project detail */}
                    <div className="pl-6 xl:pl-10 min-w-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                                className="relative"
                            >
                                {/* Ghost index number */}
                                <span
                                    aria-hidden="true"
                                    className="absolute -top-2 right-0 font-display font-black leading-none select-none pointer-events-none text-text-primary/[0.04] tabular-nums"
                                    style={{ fontSize: 'clamp(5rem, 10vw, 9rem)' }}
                                >
                                    {String(activeIdx + 1).padStart(2, '0')}
                                </span>

                                {/* Hero image */}
                                <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: '260px' }}>
                                    <motion.img
                                        src={active.image}
                                        alt={active.title}
                                        className="w-full h-full object-cover"
                                        initial={{ scale: 1.06 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-primary/75 via-transparent to-transparent pointer-events-none" />

                                    {/* Top scan line */}
                                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent pointer-events-none" />

                                    {/* Architecture badge */}
                                    {activeHasDiagram && (
                                        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-background-elevated/90 backdrop-blur-sm border border-accent/30 rounded-full px-2.5 py-1">
                                            <FaSitemap size={9} className="text-accent" />
                                            <span className="text-[9px] font-mono text-accent uppercase tracking-wide font-semibold">Architecture</span>
                                        </div>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl xl:text-3xl font-display font-bold text-text-primary leading-tight mb-4 relative">
                                    {active.title}
                                </h3>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-5 relative">
                                    {active.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border border-accent/20 bg-accent/[0.06] text-accent"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Description */}
                                <p className="text-text-secondary text-[15px] leading-relaxed mb-7 relative max-w-[62ch]">
                                    {active.description}
                                </p>

                                {/* CTA buttons */}
                                <div className="flex items-center gap-3 mb-8 relative">
                                    {'liveUrl' in active && active.liveUrl && (
                                        <motion.a
                                            href={active.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-[#09090B] font-bold rounded-xl text-sm tracking-wide"
                                            whileHover={{ y: -2, boxShadow: '0 16px 36px rgba(34,211,238,0.28)' }}
                                            whileTap={{ scale: 0.97 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                        >
                                            <FaExternalLinkAlt size={11} />
                                            Live Demo
                                        </motion.a>
                                    )}
                                    <motion.a
                                        href={active.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 glass-card rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent/25 transition-colors"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                    >
                                        <FaGithub size={14} />
                                        Source Code
                                    </motion.a>
                                </div>

                                {/* Architecture diagram */}
                                {activeHasDiagram && (
                                    <motion.div
                                        className="relative rounded-2xl overflow-hidden border border-glass-border"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {/* Panel titlebar */}
                                        <div className="flex items-center justify-between px-5 py-3 border-b border-border-color bg-background-elevated/40 backdrop-blur-sm">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                                                    <FaSitemap size={10} className="text-accent" />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-mono text-text-muted uppercase tracking-widest leading-none mb-0.5">System Architecture</p>
                                                    <p className="text-[11px] font-semibold text-text-primary leading-none">{active.title}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-green-400/70" />
                                                <span className="w-2 h-2 rounded-full bg-yellow-400/40" />
                                                <span className="w-2 h-2 rounded-full bg-border-color" />
                                            </div>
                                        </div>

                                        {/* Diagram */}
                                        <div className="p-5 bg-glass-bg backdrop-blur-sm">
                                            <SystemDiagram title={active.title} />
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── MOBILE: Compact grid ── */}
                <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projectsData.map((project, i) => (
                        <MobileCard key={project.title} project={project} index={i} />
                    ))}
                </div>

            </div>
        </section>
    );
};
