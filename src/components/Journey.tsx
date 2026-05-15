import {
  motion,
  useScroll,
  AnimatePresence,
} from 'framer-motion';
import { useState, useRef, type ElementType } from 'react';
import { FaBriefcase, FaGraduationCap, FaChevronDown } from 'react-icons/fa';
import { TiltCard } from './TiltCard';

const journeyData = [
  {
    type: 'work',
    icon: FaBriefcase,
    title: 'Sr. Platform Engineer',
    institution: 'Lucky Orange',
    ghost: 'LUCKY',
    date: 'Feb 2026 – Present',
    duration: '3+ mo',
    highlight: '<50ms latency',
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
    ghost: 'UCM',
    date: 'Jan 2024 – Present',
    duration: '1+ yr',
    highlight: '3.8 GPA',
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
    ghost: 'BICYCLE',
    date: 'May 2020 – Nov 2023',
    duration: '3.5 yr',
    highlight: '+50% perf.',
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
    ghost: 'AGILITIX',
    date: 'May 2019 – May 2020',
    duration: '1 yr',
    highlight: '−35% false positives',
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
    ghost: 'AGILITIX',
    date: 'Oct 2018 – Apr 2019',
    duration: '6 mo',
    highlight: '+15% accuracy',
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
    ghost: 'CMR',
    date: 'Aug 2015 – May 2019',
    duration: '4 yr',
    highlight: '3.0 GPA',
    current: false,
    details: [
      'Graduated with a focus on data structures, algorithms, and software engineering principles.',
      'Final Year Project: Developed a machine learning model for sentiment analysis on social media data.',
      'GPA: 3.0/4.0',
    ],
  },
];

interface JourneyItemData {
  type: string;
  icon: ElementType;
  title: string;
  institution: string;
  ghost: string;
  date: string;
  duration: string;
  highlight: string;
  current: boolean;
  details: string[];
}

export const Journey = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section id="journey" className="py-28 px-6 sm:px-10 lg:px-20 xl:px-28">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">02 / Journey</span>
          <h2 className="section-heading">My Journey</h2>
        </motion.div>

        <div className="relative" ref={timelineRef}>
          {/* Scroll-driven vertical line — centered in the dot column (w-10 = 40px, center = 20px = left-5) */}
          <div className="absolute left-5 top-3 bottom-3 w-px pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-accent/[0.08]" />
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top"
              style={{
                height: '100%',
                scaleY: scrollYProgress,
                background: 'linear-gradient(to bottom, var(--accent), rgba(34,211,238,0.15))',
              }}
            />
          </div>

          <div className="space-y-5">
            {journeyData.map((item, index) => (
              <JourneyEntry
                key={index}
                item={item as JourneyItemData}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const JourneyEntry = ({ item, index }: { item: JourneyItemData; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(item.current);
  const { icon: Icon, title, institution, ghost, date, duration, highlight, details, type, current } = item;
  const isEdu = type === 'education';

  return (
    <motion.div
      className="relative flex gap-5 sm:gap-7"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left: dot — w-10 keeps line centered */}
      <div className="flex-shrink-0 w-10 flex justify-center pt-[3px] z-10">
        <div
          className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 flex-shrink-0 transition-all duration-300
            ${current
              ? 'bg-accent border-accent shadow-[0_0_20px_rgba(34,211,238,0.35)]'
              : isEdu
                ? 'bg-violet-500/10 border-violet-500/40'
                : 'bg-background-primary border-accent/35 hover:border-accent/70'
            }`}
        >
          {/* Live indicator */}
          {current && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
            </span>
          )}
          <Icon
            size={14}
            className={
              current
                ? 'text-background-primary'
                : isEdu
                  ? 'text-violet-400'
                  : 'text-accent'
            }
          />
        </div>
      </div>

      {/* Right: card */}
      <div className="flex-1 min-w-0 pb-5">
        <TiltCard intensity={3} className="rounded-2xl">
          <div
            className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 transition-all duration-300
              ${current
                ? 'bg-glass-bg backdrop-blur-[20px] border border-accent/30 shadow-lg shadow-accent/[0.06]'
                : isEdu
                  ? 'bg-glass-bg backdrop-blur-[20px] border border-glass-border hover:border-violet-500/20'
                  : 'bg-glass-bg backdrop-blur-[20px] border border-glass-border hover:border-accent/15'
              }`}
          >
            {/* Ghost watermark — institution shorthand */}
            <span
              aria-hidden="true"
              className="absolute right-0 bottom-[-0.15em] font-display font-black leading-none uppercase select-none pointer-events-none"
              style={{
                fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                color: 'var(--text-primary)',
                opacity: isEdu ? 0.025 : 0.03,
              }}
            >
              {ghost}
            </span>

            {/* Gradient tint for current */}
            {current && (
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.055) 0%, transparent 55%)' }}
              />
            )}

            {/* Edu tint */}
            {isEdu && (
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.04) 0%, transparent 50%)' }}
              />
            )}

            {/* ── Top badge row ── */}
            <div className="relative flex flex-wrap items-center gap-2 mb-4">
              {/* Type badge */}
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border
                  ${isEdu
                    ? 'text-violet-400 border-violet-500/25 bg-violet-500/[0.08]'
                    : 'text-accent border-accent/25 bg-accent/[0.08]'
                  }`}
              >
                <Icon size={8} />
                {isEdu ? 'Education' : 'Work'}
              </span>

              {/* Current badge */}
              {current && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-green-400/25 bg-green-400/[0.08] text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Current
                </span>
              )}

              {/* Highlight metric */}
              <span className="inline-flex items-center text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border border-border-color text-text-muted bg-background-secondary/40">
                {highlight}
              </span>

              {/* Duration + date — pushed right */}
              <div className="ml-auto flex items-center gap-2">
                <span className="hidden sm:block text-[10px] font-mono text-text-muted">{duration}</span>
                <span className={`text-[10px] font-mono ${current ? 'text-accent' : 'text-text-muted'}`}>{date}</span>
              </div>
            </div>

            {/* ── Title ── */}
            <h3 className="relative text-lg sm:text-xl font-display font-bold text-text-primary leading-tight mb-1">
              {title}
            </h3>

            {/* ── Institution ── */}
            <p className="relative text-sm font-medium text-text-secondary mb-4">{institution}</p>

            {/* ── Expandable details ── */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="relative border-t border-border-color pt-4 mt-1">
                    <ul className="space-y-2.5">
                      {details.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed">
                          <span
                            className={`mt-[6px] flex-shrink-0 ${isEdu ? 'text-violet-400' : 'text-accent'}`}
                            style={{ fontSize: '7px' }}
                          >
                            ▶
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Toggle ── */}
            <button
              onClick={() => setIsExpanded(v => !v)}
              className={`relative mt-4 flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest transition-colors duration-200
                ${isEdu ? 'text-violet-400 hover:text-violet-300' : 'text-accent hover:text-accent-hover'}`}
            >
              {isExpanded ? 'Collapse' : 'View Details'}
              <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <FaChevronDown size={9} />
              </motion.span>
            </button>
          </div>
        </TiltCard>
      </div>
    </motion.div>
  );
};
