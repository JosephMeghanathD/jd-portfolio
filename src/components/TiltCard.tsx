import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

export const TiltCard = ({
  children,
  className = '',
  intensity = 10,
  glare = true,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spring = { stiffness: 180, damping: 22, mass: 0.4 };
  const sX = useSpring(mouseX, spring);
  const sY = useSpring(mouseY, spring);

  const rotateX = useTransform(sY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(sX, [-0.5, 0.5], [-intensity, intensity]);

  // Glare travels with the cursor
  const glareX = useTransform(sX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(sY, [-0.5, 0.5], [0, 100]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.1) 0%, transparent 55%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: '1000px' }} className="w-full h-full">
      <motion.div
        ref={ref}
        className={`relative w-full h-full ${className}`}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        {glare && (
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
};
