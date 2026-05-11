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
        <div className="fixed left-0 inset-y-0 z-40 hidden md:flex items-center pointer-events-none pl-4">
            <motion.div
                className="pointer-events-auto flex flex-col items-center gap-2"
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Accent line top */}
                <div className="w-px h-16 bg-gradient-to-b from-transparent to-accent/70" />

                {/* Icon panel */}
                <div
                    className="flex flex-col gap-1 p-2 rounded-2xl bg-glass-bg backdrop-blur-[20px] border border-glass-border"
                    style={{ boxShadow: '0 0 40px rgba(34,211,238,0.1), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)' }}
                >
                    {links.map(({ icon: Icon, href, label }, i) => (
                        <motion.a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto') ? undefined : '_blank'}
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="group relative flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className="w-11 h-11 flex items-center justify-center rounded-xl text-text-secondary group-hover:text-accent group-hover:bg-accent/10 border border-transparent group-hover:border-accent/20 transition-all duration-300">
                                <Icon size={20} />
                            </div>
                            {/* Slide-out label */}
                            <span className="absolute left-full ml-3 px-2.5 py-1 text-xs font-mono font-medium text-accent bg-background-elevated border border-accent/20 rounded-lg whitespace-nowrap pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-lg">
                                {label}
                            </span>
                        </motion.a>
                    ))}
                </div>

                {/* Accent line bottom */}
                <div className="w-px h-16 bg-gradient-to-t from-transparent to-accent/70" />
            </motion.div>
        </div>
    );
};
