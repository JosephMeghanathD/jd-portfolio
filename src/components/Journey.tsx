import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  type Variants,
  type MotionProps,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useState, useRef, useEffect, type SVGProps, type ElementType } from 'react';
import { FaBriefcase, FaGraduationCap, FaChevronDown } from 'react-icons/fa';


const journeyData = [
  {
    type: 'education',
    icon: FaGraduationCap,
    title: 'Master of Science in Computer Science',
    institution: 'University of Central Missouri',
    date: 'Jan 2024 – Present',
    details: [
        'Pursuing advanced studies in algorithms, distributed systems, and machine learning.',
        'Relevant Coursework: Advanced Algorithms, AI, Cloud Computing.',
        'Current GPA: 3.8/4.0',
    ],
  },
  {
    type: 'work',
    icon: FaBriefcase,
    title: 'Software Engineer II - Java Developer',
    institution: 'BICYCLE.IO',
    date: 'May 2020 – Nov 2023',
    details: [
      'Architected and deployed Java-based microservices using Spring Boot, increasing system performance by 50%.',
      'Led development of a real-time anomaly detection service with Kafka, enhancing threat identification efficiency by 30%.',
      'Engineered a log correlation engine using Elasticsearch, reducing system downtime by 40% during outages.',
      'Integrated a React-based UI with a Spring Boot backend, optimizing API response times by 25%.',
    ],
  },
  {
    type: 'work',
    icon: FaBriefcase,
    title: 'Software Engineer',
    institution: 'Agilitix.ai',
    date: 'May 2019 – May 2020',
    details: [
      'Engineered and deployed ML models for anomaly detection, achieving a 35% reduction in false positives.',
      'Authored `apptuit-py`, a high-throughput Python library for Google Bigtable ingestion, improving data pipeline speed by 60%.',
      'Automated CI/CD pipelines and deployment workflows using Python and Jenkins, cutting manual deployment time by 80%.',
    ],
  },
  {
    type: 'work',
    icon: FaBriefcase,
    title: 'Software Engineer Intern',
    institution: 'Agilitix.ai',
    date: 'Oct 2018 – Apr 2019',
    details: [
      'Contributed to the deployment of predictive analytics models, improving overall model accuracy by 15%.',
      'Developed Python scripts and RESTful APIs for real-time system monitoring and data collection.',
      'Optimized complex SQL queries, resulting in a 50% reduction in database query execution time.',
    ],
  },
  {
    type: 'education',
    icon: FaGraduationCap,
    title: 'Bachelor of Engineering in Computer Science',
    institution: 'CMR College of Engineering & Technology',
    date: 'Aug 2015 – May 2019',
    details: [
        'Graduated with a focus on data structures, algorithms, and software engineering principles.',
        'Final Year Project: Developed a machine learning model for sentiment analysis on social media data.',
        'GPA: 3.0/4.0',
    ],
  },
];


const StickMan = (props: { scrollYProgress: any } & MotionProps & SVGProps<SVGSVGElement>) => {
  const frame = useTransform(props.scrollYProgress, [0, 1], [0, 4]);
  const legOpacity = (offset: number) => useTransform(frame, v => (Math.floor(v) % 2 === offset ? 1 : 0));

  return (
      <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="12" cy="6" r="2" />
          <path d="M12 8v7m-3 0h6" />
          <motion.path d="M12 15l-3 4" style={{ opacity: legOpacity(0) }} />
          <motion.path d="M12 15l3 4" style={{ opacity: legOpacity(1) }} />
      </motion.svg>
  );
};


export const Journey = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [pathD, setPathD] = useState('');
  
  const stickManX = useMotionValue(0);
  const stickManY = useMotionValue(0);
  const smoothX = useSpring(stickManX, { stiffness: 500, damping: 50, mass: 0.5 });
  const smoothY = useSpring(stickManY, { stiffness: 500, damping: 50, mass: 0.5 });

  const { scrollYProgress } = useScroll({
      target: timelineRef,
      offset: ["start center", "end center"],
  });

  useEffect(() => {
      const calculatePath = () => {
          if (timelineRef.current) {
              const { width, height } = timelineRef.current.getBoundingClientRect();
              setPathD(`M ${width / 2} 0 V ${height}`);
          }
      };
      calculatePath();
      const resizeObserver = new ResizeObserver(calculatePath);
      if (timelineRef.current) resizeObserver.observe(timelineRef.current);
      return () => resizeObserver.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
      if (timelineRef.current) {
          const { width, height } = timelineRef.current.getBoundingClientRect();
          const centerX = width / 2;
          const newY = latest * height;
          stickManX.set(centerX);
          stickManY.set(newY);
      }
  });

  return (
      <section id="journey" className="py-20 px-4">
          <div className="container mx-auto">
              <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-24 text-text-primary" initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                  My Journey
              </motion.h2>

              <div className="relative" ref={timelineRef}>
                  <div className="absolute left-0 top-0 h-full w-full">
                      <svg width="100%" height="100%" className="hidden md:block">
                          <path d={pathD} fill="none" stroke="var(--accent)" strokeOpacity="0.15" strokeWidth="2" />
                          <motion.path d={pathD} fill="none" stroke="var(--accent)" strokeOpacity="1" strokeWidth="2" style={{ pathLength: scrollYProgress }} />
                      </svg>
                      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-accent/30 md:hidden" />
                  </div>

                  <motion.div className="absolute hidden md:block" style={{ top: smoothY, left: smoothX, x: "-50%", y: "-50%", opacity: scrollYProgress }}>
                      <StickMan scrollYProgress={scrollYProgress} className="text-accent"/>
                  </motion.div>

                  <div className="space-y-12">
                      {journeyData.map((item, index) => (
                          <TimelineItem key={index} item={item} isLeft={index % 2 === 0} />
                      ))}
                  </div>
              </div>
          </div>
      </section>
  );
};


interface TimelineItemProps {
  item: { type: string; icon: ElementType; title: string; institution: string; date: string; details: string[]; };
  isLeft: boolean;
}

const TimelineItem = ({ item, isLeft }: TimelineItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { icon: Icon, title, institution, date, details } = item;

  const cardVariants: Variants = {
      hidden: { opacity: 0, x: isLeft ? -50 : 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const content = (
      <motion.div
          className="bg-background-primary/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-border-color w-full"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
          <p className="text-accent text-sm mb-1 font-semibold">{date}</p>
          <h3 className="text-xl font-bold text-text-primary mb-1">{title}</h3>
          <p className="text-md font-medium text-text-secondary mb-4">{institution}</p>
          <AnimatePresence>
              {isExpanded && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <ul className="list-disc list-inside text-text-secondary space-y-2 mt-4 pl-2">
                          {details.map((point, i) => (<li key={i}>{point}</li>))}
                      </ul>
                  </motion.div>
              )}
          </AnimatePresence>
          <button onClick={() => setIsExpanded(!isExpanded)} className="mt-4 flex items-center gap-2 text-accent font-semibold hover:text-accent-hover transition-colors">
              {isExpanded ? 'View Less' : 'View More'}
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}><FaChevronDown size={14} /></motion.div>
          </button>
      </motion.div>
  );
  
  return (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-x-4 md:gap-x-8">
          <div className="md:hidden col-start-2 col-span-2 row-start-1 pl-4">{content}</div>
          <div className="hidden md:block">{isLeft ? content : <div/>}</div>
          <div className="flex items-center justify-center row-start-1 col-start-2 md:col-start-2">
              <div className="z-10 flex items-center justify-center w-12 h-12 bg-background-primary rounded-full border-2 border-accent">
                  <Icon className="text-accent" size={20} />
              </div>
          </div>
          <div className="hidden md:block">{!isLeft && content}</div>
      </div>
  );
};