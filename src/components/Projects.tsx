import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaSitemap } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { SystemDiagram, hasDiagram } from './SystemDiagrams';

const projectsData = [
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
        description: 'A full-stack, cloud-native to-do application built with a microservice architecture, featuring AI-powered task decomposition using Google\'s Gemini.',
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

const CARD_WIDTH = 440;
const GAP = 28;

export const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [archOpen, setArchOpen] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const displayProjects = [...projectsData, ...projectsData, ...projectsData];
    const centeredIndex = projectsData.length + (currentIndex % projectsData.length);
    const activeProject = projectsData[currentIndex % projectsData.length];
    const activeHasDiagram = hasDiagram(activeProject.title);

    // Close architecture panel when switching to a project without a diagram
    useEffect(() => {
        if (!activeHasDiagram) setArchOpen(false);
    }, [activeHasDiagram, currentIndex]);

    // Auto-scroll — pauses on card click, resumes on click outside section
    useEffect(() => {
        if (isHovering || isPaused) return;
        const interval = setInterval(() => setCurrentIndex(p => p + 1), 3000);
        return () => clearInterval(interval);
    }, [isHovering, isPaused]);

    // Click outside the section resumes auto-scroll
    useEffect(() => {
        if (!isPaused) return;
        const handler = (e: MouseEvent) => {
            if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
                setIsPaused(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [isPaused]);

    const handleCardClick = (i: number) => {
        if (i === centeredIndex) return;
        setIsPaused(true);
        setCurrentIndex(currentIndex + (i - centeredIndex));
    };

    return (
        <section id="projects" ref={sectionRef} className="py-24 overflow-hidden">
            <div className="flex flex-col items-center">

                {/* Header */}
                <motion.div
                    className="mb-12 w-full px-6 sm:px-10 lg:px-20 xl:px-28 max-w-7xl mx-auto"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-2">03 / Projects</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-text-primary">My Projects</h2>
                </motion.div>

                {/* Carousel */}
                <div
                    className="w-full relative h-[530px] md:h-[560px]"
                    style={{ perspective: '2000px' }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <motion.div
                        ref={carouselRef}
                        className="absolute left-1/2 flex"
                        style={{ gap: GAP, transformStyle: 'preserve-3d' }}
                        animate={{ x: `calc(-${centeredIndex * (CARD_WIDTH + GAP)}px - ${CARD_WIDTH / 2}px)` }}
                        transition={{ type: 'spring', stiffness: 200, damping: 40 }}
                    >
                        {displayProjects.map((project, i) => {
                            const distance = i - centeredIndex;
                            const rotateY = Math.max(-22, Math.min(22, distance * 9));
                            const isCentered = i === centeredIndex;
                            const projectHasDiagram = hasDiagram(project.title);

                            return (
                                <motion.div
                                    key={`${project.title}-${i}`}
                                    className={`flex-shrink-0 rounded-2xl overflow-hidden ${!isCentered ? 'cursor-pointer' : ''}`}
                                    style={{
                                        width: CARD_WIDTH,
                                        background: isCentered ? 'var(--glass-bg)' : 'var(--bg-elevated)',
                                        backdropFilter: isCentered ? 'blur(20px)' : 'none',
                                        WebkitBackdropFilter: isCentered ? 'blur(20px)' : 'none',
                                    }}
                                    onClick={() => handleCardClick(i)}
                                    animate={{
                                        scale: isCentered ? 1.04 : 0.87,
                                        opacity: isCentered ? 1 : 0.42,
                                        filter: isCentered ? 'blur(0px)' : 'blur(2.5px)',
                                        rotateY,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                >
                                    <div className={`border rounded-2xl overflow-hidden h-full flex flex-col ${
                                        isCentered ? 'border-accent/20 shadow-xl shadow-accent/8' : 'border-border-color'
                                    }`}>
                                        {/* Image */}
                                        <div className="relative h-52 overflow-hidden flex-shrink-0">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-background-elevated/80 via-transparent to-transparent" />
                                            {/* Architecture badge */}
                                            {projectHasDiagram && (
                                                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-background-elevated/90 backdrop-blur-sm border border-accent/25 rounded-full px-2.5 py-1">
                                                    <FaSitemap size={9} className="text-accent" />
                                                    <span className="text-accent text-[9px] font-mono font-semibold uppercase tracking-wide">Architecture</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-text-primary mb-2 leading-tight">{project.title}</h3>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {project.tags.slice(0, 5).map(tag => (
                                                    <span key={tag} className="bg-accent/8 text-accent text-[10px] font-semibold px-2 py-0.5 rounded-full border border-accent/18">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags.length > 5 && (
                                                    <span className="text-text-muted text-[10px] px-2 py-0.5 font-mono">
                                                        +{project.tags.length - 5}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-text-secondary text-sm leading-relaxed flex-grow mb-4">{project.description}</p>

                                            {/* Actions */}
                                            <div className="flex items-center gap-4 mt-auto pt-2 border-t border-border-color">
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-accent text-sm font-semibold hover:text-accent-hover transition-colors">
                                                    <FaExternalLinkAlt size={12} /> Live Demo
                                                </a>
                                                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-text-secondary text-sm font-semibold hover:text-text-primary transition-colors">
                                                    <FaGithub size={14} /> Source
                                                </a>
                                                {projectHasDiagram && isCentered && (
                                                    <button
                                                        onClick={() => setArchOpen(o => !o)}
                                                        className={`ml-auto flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-full border transition-all duration-300 ${
                                                            archOpen
                                                                ? 'bg-accent text-[#09090B] border-accent'
                                                                : 'text-accent border-accent/30 hover:bg-accent/10'
                                                        }`}
                                                    >
                                                        <FaSitemap size={10} />
                                                        {archOpen ? 'Hide' : 'Architecture'}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Nav dots */}
                <div className="flex items-center gap-2 mt-4">
                    {projectsData.map((_, i) => {
                        const active = i === currentIndex % projectsData.length;
                        return (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(projectsData.length + i)}
                                aria-label={`Go to project ${i + 1}`}
                                className={`rounded-full transition-all duration-300 ${
                                    active ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-border-color hover:bg-text-muted'
                                }`}
                            />
                        );
                    })}
                </div>

                {/* Architecture panel */}
                <AnimatePresence>
                    {archOpen && activeHasDiagram && (
                        <motion.div
                            key={activeProject.title}
                            className="w-full max-w-3xl px-6 mt-8"
                            initial={{ opacity: 0, y: 20, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: 10, height: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl p-6 shadow-xl shadow-black/20">
                                {/* Panel header */}
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                                        <FaSitemap size={12} className="text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-text-muted font-mono uppercase tracking-widest">System Architecture</p>
                                        <p className="text-sm font-semibold text-text-primary leading-tight">{activeProject.title}</p>
                                    </div>
                                </div>

                                {/* Diagram */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeProject.title}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <SystemDiagram title={activeProject.title} />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};
