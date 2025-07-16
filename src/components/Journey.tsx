import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence, // Fixed: Added AnimatePresence to the import
  type Variants
} from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaBriefcase, FaGraduationCap, FaChevronDown } from 'react-icons/fa';

const journeyData = [
{
  type: 'education',
  title: 'Master of Science in Computer Science',
  institution: 'University of Central Missouri',
  date: 'Jan 2024 – Aug 2025',
  description: ['GPA: 3.8'],
},
{
  type: 'work',
  title: 'Software Engineer II - Java Developer',
  institution: 'BICYCLE.IO',
  date: 'May 2020 – Nov 2023',
  description: [
    'Created and optimized Java-based microservices and RESTful APIs, improving system performance by 50%.',
    'Led the development of anomaly detection and notification services, enhancing efficiency by 30%.',
    'Built correlation mechanisms to rapidly identify root causes, reducing downtime by 40%.',
    'Integrated React UI with Spring Boot, reducing API response time by 25%.',
  ],
},
{
  type: 'work',
  title: 'Senior Software Engineer',
  institution: 'Agilitix.ai',
  date: 'May 2019 – May 2020',
  description: [
    'Engineered and deployed ML algorithms for anomaly detection, reducing false positives by 35%.',
    'Developed apptuit-py, a Python library for Bigtable ingestion, improving throughput by 60%.',
    'Automated DevOps tasks using Python, reducing manual deployment time by 80%.',
  ],
},
{
  type: 'work',
  title: 'Software Engineer Intern',
  institution: 'Agilitix.ai',
  date: 'Oct 2018 – Apr 2019',
  description: [
    'Assisted in deploying ML models for predictive analytics, increasing model accuracy by 15%.',
    'Developed Python scripts and APIs for real-time monitoring.',
    'Optimized SQL queries, reducing query execution time by 50%.',
  ],
},
{
  type: 'education',
  title: 'Bachelor of Engineering in Computer Science',
  institution: 'CMR College of Engineering and Technology',
  date: 'Aug 2015 – May 2019',
  description: ['GPA: 3.0'],
},
];

const StickMan = (props: React.SVGProps<SVGSVGElement>) => (
  <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
  >
      <circle cx="12" cy="6" r="2" />
      <path d="M12 8v7m-3 0h6M12 15l-3 4m3-4l3 4" />
  </motion.svg>
);

export const Journey = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathD, setPathD] = useState('');
  const [stickManPos, setStickManPos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
      target: timelineRef,
      offset: ["start center", "end center"],
  });

  // Fixed: Dynamically calculate the path's 'd' attribute based on container size
  useEffect(() => {
      const calculatePath = () => {
          const container = svgContainerRef.current;
          if (container) {
              const { width, height } = container.getBoundingClientRect();
              setPathD(`M ${width / 2} 0 V ${height}`);
          }
      };

      calculatePath(); // Calculate on mount

      // Recalculate on window resize
      const resizeObserver = new ResizeObserver(calculatePath);
      if (svgContainerRef.current) {
          resizeObserver.observe(svgContainerRef.current);
      }

      return () => resizeObserver.disconnect();
  }, []);


  useMotionValueEvent(scrollYProgress, "change", (latest) => {
      if (pathRef.current && pathRef.current.getTotalLength() > 0) {
          const pathLength = pathRef.current.getTotalLength();
          const point = pathRef.current.getPointAtLength(latest * pathLength);
          setStickManPos({ x: point.x, y: point.y });
      }
  });

  return (
      <section  id="journey"  className="py-20 px-4">
          <div className="container mx-auto">
              <motion.h2
                  className="text-4xl md:text-5xl font-bold text-center mb-24 text-text-primary"
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
              >
                  My Journey
              </motion.h2>

              <div className="relative" ref={timelineRef}>
                  <div className="absolute left-0 top-0 h-full w-full" ref={svgContainerRef}>
                      <svg width="100%" height="100%" className="hidden md:block">
                          <motion.path
                              ref={pathRef}
                              d={pathD} // Use the state variable for the path
                              fill="none"
                              stroke="var(--accent)"
                              strokeOpacity="0.3"
                              strokeWidth="2"
                          />
                      </svg>
                      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-accent/30 md:hidden" />
                  </div>

                  <StickMan
                      className="text-accent absolute hidden md:block"
                      style={{
                          top: stickManPos.y,
                          left: stickManPos.x,
                          translateX: "-50%",
                          translateY: "-50%",
                          opacity: pathD ? 1 : 0, // Only show when path is calculated
                      }}
                  />

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
  item: {
      type: string;
      title: string;
      institution: string;
      date: string;
      description: string[];
  };
  isLeft: boolean;
}

const TimelineItem = ({ item, isLeft }: TimelineItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { type, title, institution, date, description } = item;

  const cardVariants = {
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
      >
          <p className="text-accent text-sm mb-1">{date}</p>
          <h3 className="text-xl font-bold text-text-primary mb-1">{title}</h3>
          <p className="text-md font-semibold text-text-secondary mb-4">{institution}</p>
          {/* Fixed: AnimatePresence is now correctly imported and will work */}
          <AnimatePresence>
              {isExpanded && (
                  <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                  >
                      <ul className="list-disc list-inside text-text-secondary space-y-2 mt-4">
                          {description.map((point, i) => (
                              <li key={i}>{point}</li>
                          ))}
                      </ul>
                  </motion.div>
              )}
          </AnimatePresence>
          <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 flex items-center gap-2 text-accent font-semibold hover:text-accent-hover transition-colors"
          >
              {isExpanded ? 'View Less' : 'View More'}
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                  <FaChevronDown size={14} />
              </motion.div>
          </button>
      </motion.div>
  );

  return (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-x-4 md:gap-x-8">
          <div className="md:hidden col-start-2 row-start-1" />
          <div className="md:hidden col-start-3 row-start-1">{content}</div>
          <div className="hidden md:block">{isLeft && content}</div>
          <div className="flex items-center justify-center row-start-1 col-start-2 md:col-start-2">
              <div className="z-10 flex items-center justify-center w-12 h-12 bg-background-primary rounded-full border-2 border-accent">
                  {type === 'work' ? <FaBriefcase className="text-accent" size={20} /> : <FaGraduationCap className="text-accent" size={20} />}
              </div>
          </div>
          <div className="hidden md:block">{!isLeft && content}</div>
      </div>
  );
};