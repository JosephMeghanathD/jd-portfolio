import {
  motion,
  useScroll,
  AnimatePresence,
  type Variants,
} from 'framer-motion';
import { useState, useRef, useEffect, type ElementType } from 'react';
import { FaBriefcase, FaGraduationCap, FaChevronDown } from 'react-icons/fa';
import { TiltCard } from './TiltCard';


const journeyData = [
  {
    type: 'work',
    icon: FaBriefcase,
    title: 'Sr. Platform Engineer',
    institution: 'Lucky Orange',
    date: 'Feb 2026 – Present',
    current: true,
    details: [
      'Architecting and scaling a next-generation SDK infrastructure to support high-throughput event tracking for millions of merchant websites, focusing on minimal client-side footprint and LZ-based data compression.',
      'Leading the modernization of the integration ecosystem for Shopify Plus and HubSpot, implementing Shopify Checkout Extensibility and Web Pixels API to ensure seamless session recording on secure pages.',
      'Building high-concurrency backend services using Node.js to meet strict sub-50ms latency SLAs while ingesting billions of micro-events.',
      'Designing stateless, containerized microservices utilizing Redis Pipelines and Kafka to ensure horizontal scalability and consistent telemetry tracking across distributed environments.',
      'Optimizing platform profitability by re-architecting cross-platform billing systems (Shopify vs. Braintree) to ensure accurate attribution and reduced churn for returning customers.',
    ],
  },
  {
    type: 'education',
    icon: FaGraduationCap,
    title: 'Master of Science in Computer Science',
    institution: 'University of Central Missouri',
    date: 'Jan 2024 – Present',
    current: false,
    details: [
      'Pursuing advanced studies in algorithms, distributed systems, and machine learning.',
      'Relevant Coursework: Advanced Algorithms, AI, Cloud Computing.',
      'Current GPA: 3.8/4.0',
    ],
  },
  {
    type: 'work',
    icon: FaBriefcase,
    title: 'Software Engineer II — Java Developer',
    institution: 'BICYCLE.IO',
    date: 'May 2020 – Nov 2023',
    current: false,
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
    current: false,
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
    current: false,
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
    current: false,
    details: [
      'Graduated with a focus on data structures, algorithms, and software engineering principles.',
      'Final Year Project: Developed a machine learning model for sentiment analysis on social media data.',
      'GPA: 3.0/4.0',
    ],
  },
];



export const Journey = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [pathD, setPathD] = useState('');

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

  return (
      <section id="journey" className="py-24 px-6 sm:px-10 lg:px-20 xl:px-28">
          <div className="max-w-7xl mx-auto">
              <motion.div
                className="mb-20"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                  <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-2">02 / Journey</p>
                  <h2 className="text-4xl md:text-5xl font-bold text-text-primary">My Journey</h2>
              </motion.div>

              <div className="relative" ref={timelineRef}>
                  <div className="absolute left-0 top-0 h-full w-full">
                      <svg width="100%" height="100%" className="hidden md:block">
                          <path d={pathD} fill="none" stroke="var(--accent)" strokeOpacity="0.15" strokeWidth="2" />
                          <motion.path d={pathD} fill="none" stroke="var(--accent)" strokeOpacity="1" strokeWidth="2" style={{ pathLength: scrollYProgress }} />
                      </svg>
                      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-accent/30 md:hidden" />
                  </div>

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


interface TimelineItemData {
  type: string;
  icon: ElementType;
  title: string;
  institution: string;
  date: string;
  current: boolean;
  details: string[];
}

interface TimelineItemProps {
  item: TimelineItemData;
  isLeft: boolean;
}

const TimelineItem = ({ item, isLeft }: TimelineItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { icon: Icon, title, institution, date, details, type, current } = item;

  const cardVariants: Variants = {
      hidden: { opacity: 0, x: isLeft ? -50 : 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const content = (
      <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
          <TiltCard intensity={6} className="rounded-xl">
              <div className={`relative p-6 rounded-xl overflow-hidden
                ${current
                  ? 'bg-glass-bg backdrop-blur-[20px] border border-accent/40 shadow-xl shadow-accent/10'
                  : 'bg-glass-bg backdrop-blur-[20px] border border-glass-border'
                }`}
              >
                  {current && (
                      <div className="absolute inset-0 rounded-xl pointer-events-none"
                           style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, transparent 60%)' }} />
                  )}

                  <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border
                        ${type === 'work'
                          ? 'bg-accent/10 text-accent border-accent/20'
                          : 'bg-violet-500/10 text-violet-400 border-violet-500/20'
                        }`}>
                          {type === 'work' ? 'Experience' : 'Education'}
                      </span>
                      {current && (
                          <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent text-xs font-bold px-2.5 py-1 rounded-full border border-accent/30">
                              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                              CURRENT
                          </span>
                      )}
                  </div>

                  <p className="text-accent text-sm mb-1 font-semibold">{date}</p>
                  <h3 className="text-xl font-bold mb-1 text-text-primary">{title}</h3>
                  <p className="text-md font-semibold text-text-secondary mb-4">{institution}</p>

                  <AnimatePresence>
                      {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                              <ul className="space-y-2.5 mt-2">
                                  {details.map((point, i) => (
                                      <li key={i} className="flex items-start gap-2.5 text-text-secondary text-sm leading-relaxed">
                                          <span className="text-accent mt-1 flex-shrink-0 text-xs">▸</span>
                                          {point}
                                      </li>
                                  ))}
                              </ul>
                          </motion.div>
                      )}
                  </AnimatePresence>

                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 flex items-center gap-2 text-accent font-semibold hover:text-accent-hover transition-colors text-sm"
                  >
                      {isExpanded ? 'View Less' : 'View More'}
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <FaChevronDown size={12} />
                      </motion.div>
                  </button>
              </div>
          </TiltCard>
      </motion.div>
  );

  return (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-x-4 md:gap-x-8">
          <div className="md:hidden col-start-2 col-span-2 row-start-1 pl-4">{content}</div>
          <div className="hidden md:block">{isLeft ? content : <div/>}</div>
          <div className="flex items-center justify-center row-start-1 col-start-2 md:col-start-2">
              <div className={`z-10 flex items-center justify-center w-12 h-12 rounded-full border-2
                ${current
                  ? 'bg-accent text-background-primary border-accent shadow-lg shadow-accent/30'
                  : 'bg-background-primary border-accent'
                }`}>
                  <Icon className={current ? 'text-background-primary' : 'text-accent'} size={20} />
              </div>
          </div>
          <div className="hidden md:block">{!isLeft && content}</div>
      </div>
  );
};
