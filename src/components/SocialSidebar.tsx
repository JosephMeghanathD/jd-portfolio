import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const links = [
    { icon: FaGithub, href: 'https://github.com/JosephMeghanathD', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/joseph-meghanath-9880ba149/', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://www.instagram.com/joe_hit_hard/', label: 'Instagram' },
    { icon: FaEnvelope, href: 'mailto:josephmeghanath@gmail.com', label: 'Email' },
];

export const SocialSidebar = () => {
    return (
        <div className="fixed left-0 inset-y-0 z-40 hidden md:flex items-center pointer-events-none">
            <motion.div
                className="pointer-events-auto flex flex-col gap-4 p-3 bg-background-elevated/80 backdrop-blur-xl rounded-r-2xl border-t border-r border-b border-border-color"
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {links.map(({ icon: Icon, href, label }) => (
                    <motion.a
                        key={label}
                        href={href}
                        target={href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-9 h-9 flex items-center justify-center rounded-xl text-text-muted hover:text-accent hover:bg-accent-dim transition-all duration-300"
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Icon size={18} />
                    </motion.a>
                ))}
            </motion.div>
        </div>
    );
};
