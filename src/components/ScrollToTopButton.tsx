import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsVisible(latest > 400);
    });

    return (
        <motion.button
            className="fixed bottom-8 right-8 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-glass-bg backdrop-blur-[20px] border border-glass-border text-text-secondary hover:text-accent hover:border-accent/30 transition-all"
            style={{ boxShadow: '0 0 20px rgba(34,211,238,0.08), 0 4px 20px rgba(0,0,0,0.3)' }}
            onClick={() => scroll.scrollToTop({ duration: 500, smooth: true })}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
            whileHover={{ y: -3, boxShadow: '0 0 30px rgba(34,211,238,0.2), 0 8px 24px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Scroll to top"
        >
            <FaArrowUp size={14} />
        </motion.button>
    );
};
