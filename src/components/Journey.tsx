import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
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


export const Journey = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Journey
        </motion.h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-cyan-400/30 transform -translate-x-1/2"></div>
          {journeyData.map((item, index) => (
            <TimelineItem key={index} item={item} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};


const TimelineItem = ({ item, isLeft }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { type, title, institution, date, description } = item;

  const cardVariants = {
    hidden: { opacity: 0, x: isLeft ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    
    <div className={`mb-6 flex justify-between items-center w-full ${isLeft ? 'flex-row-reverse' : ''}`}>
      
      <div className="w-2/5"></div> 
      
      <div className="z-20 flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full border-2 border-cyan-400">
        {type === 'work' ? <FaBriefcase className="text-cyan-400" size={20} /> : <FaGraduationCap className="text-cyan-400" size={20} />}
      </div>
      
      
      <motion.div 
        className="w-2/5 bg-gray-800/50 backdrop-blur-sm p-5 rounded-lg shadow-lg border border-gray-700"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="text-cyan-400 text-sm mb-1">{date}</p>
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-md font-semibold text-gray-300 mb-4">{institution}</p>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <ul className="list-disc list-inside text-gray-400 space-y-2 mt-4">
                {description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-200 transition-colors"
        >
          {isExpanded ? 'View Less' : 'View More'}
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
            <FaChevronDown size={14} />
          </motion.div>
        </button>
      </motion.div>
    </div>
  );
};