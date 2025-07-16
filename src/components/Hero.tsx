import { motion, type Variants } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import DecryptedText from './DecryptedText';

import profilePic from '../assets/me.jpeg';

export const Hero = () => {
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <section id = "hero" className="min-h-screen flex items-center justify-center p-4 md:p-8">
            <motion.div 
                className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 max-w-6xl mx-auto p-8 md:p-12 rounded-2xl
                           bg-background-primary/50 backdrop-blur-sm shadow-lg"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="flex-shrink-0">
                    <img
                        src={profilePic}
                        alt="Joseph D"
                        className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-[6px] border-accent shadow-xl shadow-accent/20 animate-glow"
                    />
                </motion.div>

                <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-text-secondary mb-2"
                    >
                        {/* "Hello, I'm" now uses the decrypt effect */}
                        <DecryptedText
                            text="Hello, I'm"
                            animateOn="view"
                            sequential
                            useOriginalCharsOnly
                            className="text-text-secondary"
                            encryptedClassName="text-accent"
                        />
                    </motion.p>
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold text-text-primary mb-4"
                    >
                        {/* "Joseph D" now uses the decrypt effect */}
                        <DecryptedText
                            text="Joseph D"
                            animateOn="view"
                            sequential
                            useOriginalCharsOnly
                            speed={70}
                            className="text-text-primary"
                            encryptedClassName="text-accent"
                        />
                    </motion.h1>

                    <motion.div variants={itemVariants}>
                        <TypeAnimation
                            sequence={[
                                'Full-Stack Developer', 2000,
                                'Creative Technologist', 2000,
                                'Lifelong Learner', 2000,
                            ]}
                            wrapper="p"
                            cursor={true}
                            repeat={Infinity}
                            className="text-2xl md:text-3xl text-accent font-semibold mb-6"
                        />
                    </motion.div>
                    
                    <motion.p
                        variants={itemVariants}
                        className="text-base md:text-lg text-text-secondary mb-8 leading-relaxed">
                        {/* Updated the paragraph to also be sequential for a cleaner reveal */}
                        <DecryptedText
                            text="I'm a full-stack software engineer who loves to code and always thrives to learn new technologies to build amazing things."
                            animateOn="view"
                            sequential
                            useOriginalCharsOnly
                            speed={20}
                            className="text-text-secondary"
                            encryptedClassName="text-accent"
                        />
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center md:justify-start gap-6"
                    >
                        <a
                            href="https://github.com/JosephMeghanathD?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-3 text-lg font-bold text-background-primary bg-text-primary rounded-lg transform transition-all duration-300 hover:bg-accent hover:text-white dark:hover:text-black hover:-translate-y-1"
                        >
                            My Works
                        </a>
                        
                        <div className="flex items-center gap-4">
                            <a
                                href="https://github.com/JosephMeghanathD" 
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub Profile"
                                className="text-text-secondary hover:text-accent transform hover:scale-110 transition-all duration-300"
                            >
                                <FaGithub size={32} />
                            </a>
                            <a
                                href="https://linkedin.com" 
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn Profile"
                                className="text-text-secondary hover:text-accent transform hover:scale-110 transition-all duration-300"
                            >
                                <FaLinkedin size={32} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};