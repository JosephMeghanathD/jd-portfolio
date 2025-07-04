import { motion } from 'framer-motion';
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
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 p-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            
            <motion.div variants={itemVariants} className="flex-shrink-0">
                <img
                    src={profilePic}
                    alt="Joseph D"
                    className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-[6px] border-cyan-400 shadow-xl shadow-cyan-500/40"
                />
            </motion.div>

            
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-gray-300 mb-2"
                >
                    Hello, I'm
                </motion.p>
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl font-bold text-white mb-4"
                >
                    Joseph D
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
                        className="text-2xl md:text-3xl text-cyan-400 font-semibold mb-6"
                    />
                </motion.div>

                
                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-gray-300 mb-2">
                    <DecryptedText
                        text=" I'm a full-stack software engineer who loves to code and always thrives to learn new technologies to build amazing things."
                    />
                </motion.p>

                
                <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-6 mt-4"
                >
                    <a
                        href="https://github.com/JosephMeghanathD?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 text-lg font-bold text-gray-900 bg-cyan-400 rounded-lg transform transition-all duration-300 hover:bg-cyan-300 hover:-translate-y-1"
                    >
                        My Works
                    </a>

                    
                    <a
                        href="https://github.com/JosephMeghanathD" 
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                        className="text-gray-400 hover:text-cyan-400 transform hover:scale-110 transition-all duration-300"
                    >
                        <FaGithub size={40} />
                    </a>
                    <a
                        href="https://linkedin.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile"
                        className="text-gray-400 hover:text-cyan-400 transform hover:scale-110 transition-all duration-300"
                    >
                        <FaLinkedin size={40} />
                    </a>
                </motion.div>
            </div>
        </motion.div>
    );
};