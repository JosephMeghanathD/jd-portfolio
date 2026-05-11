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
            className="fixed bottom-8 right-8 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-background-elevated border border-border-color text-text-muted hover:text-accent hover:border-accent/40 shadow-lg transition-colors"
            onClick={() => scroll.scrollToTop({ duration: 500, smooth: true })}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Scroll to top"
        >
            <FaArrowUp size={14} />
        </motion.button>
    );
};
