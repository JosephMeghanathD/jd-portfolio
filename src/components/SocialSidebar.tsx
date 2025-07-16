import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const sidebarVariants = {
   
   
    hidden: { x: "-100%", opacity: 0 },
    visible: {
        x: "0%",
        opacity: 1,
        transition: {
            delay: 1,
            duration: 0.5,
        },
    },
};

export const SocialSidebar = () => {
    return (
       
       
       
       
       
        <div className="fixed left-0 inset-y-0 z-40 hidden md:flex items-center pointer-events-none">
            
            <motion.div
               
               
                className="pointer-events-auto flex flex-col gap-5 p-4
                           bg-black dark:bg-white 
                           backdrop-blur-sm rounded-r-lg 
                           border-t-2 border-r-2 border-b-2 border-l-0 border-accent/80 
                           animate-glow"
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
            >
                {/* GitHub Link */}
                <a
                    href="https://github.com/JosephMeghanathD"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="text-white dark:text-black hover:text-accent dark:hover:text-accent transform hover:scale-110 transition-all duration-300"
                >
                    <FaGithub size={32} />
                </a>
                
                {/* LinkedIn Link */}
                <a
                    href="https://www.linkedin.com/in/joseph-meghanath-9880ba149/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="text-white dark:text-black hover:text-accent dark:hover:text-accent transform hover:scale-110 transition-all duration-300"
                >
                    <FaLinkedin size={32} />
                </a>

                {/* Instagram Link */}
                <a
                    href="https://www.instagram.com/joe_hit_hard/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Profile"
                    className="text-white dark:text-black hover:text-accent dark:hover:text-accent transform hover:scale-110 transition-all duration-300"
                >
                    <FaInstagram size={32} />
                </a>

                {/* Email Link */}
                <a
                    href="mailto:josephmeghanath@gmail.com" 
                    aria-label="Send an Email"
                    className="text-white dark:text-black hover:text-accent dark:hover:text-accent transform hover:scale-110 transition-all duration-300"
                >
                    <FaEnvelope size={32} />
                </a>
            </motion.div>
        </div>
    );
};