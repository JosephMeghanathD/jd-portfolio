import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

const projectsData = [
  {
    image: '/projects/sm.png',
    title: 'Specialty Marketplace',
    description: 'A full-stack, microservices-based e-commerce platform featuring product browsing, a shopping cart, user authentication, and order management.',
    tags: ['React', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Docker', 'JWT', 'GCP', 'Netlify'],
    liveUrl: 'https://specalitymarketplace.netlify.app/',
    sourceUrl: 'https://github.com/JosephMeghanathD/Specialty-Marketplace',
  },
  {
    image: '/projects/ride.png',
    title: 'AAD RideShare Application',
    description: 'A privacy-first, full-stack ride-sharing platform for students and professionals to split costs, reduce emissions, and build community.',
    tags: ['React', 'Spring Boot', 'PostgreSQL', 'Docker', 'JWT', 'GCP', 'Netlify'],
    liveUrl: 'https://jdride.netlify.app/',
    sourceUrl: 'https://github.com/JoeHitHard/AAD-RideShareApplication',
  },
  {
    image: '/projects/flyfish.png',
    title: 'Fly Fish - Virtual Art Gallery',
    description: 'A virtual art gallery for sustainable living, featuring artisan products and interactive animations with a mobile-first, responsive design.',
    tags: ['React', 'Netlify', 'CSS Grid', 'Flexbox'],
    liveUrl: 'https://flyfish.netlify.app/',
    sourceUrl: 'https://github.com/JosephMeghanathD/fly-fish',
  },
  {
    image: '/projects/sudoku.png',
    title: 'Interactive Sudoku Game',
    description: 'A classic logic-based Sudoku puzzle game built with vanilla JavaScript, featuring a clean UI and validation logic.',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    liveUrl: 'https://josephmeghanathd.github.io/sudoku',
    sourceUrl: 'https://github.com/JosephMeghanathD/sudoku',
  },
  {
    image: '/projects/xo.png',
    title: 'Tic-Tac-Toe (XO)',
    description: 'The classic game of Tic-Tac-Toe. A simple yet fun project to demonstrate game state management and win-condition logic.',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    liveUrl: 'https://josephmeghanathd.github.io/XO',
    sourceUrl: 'https://github.com/JosephMeghanathD/XO',
  },
  {
    image: '/projects/multi.png',
    title: 'Multi-Line to Single-Line Tool',
    description: 'A handy browser utility to convert multi-line text blocks into a single continuous line, useful for various data formatting tasks.',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    liveUrl: 'https://josephmeghanathd.github.io/MultiLinetoSingleLine',
    sourceUrl: 'https://github.com/JosephMeghanathD/MultiLinetoSingleLine',
  }
];

const CARD_WIDTH = 450; // Or your card's width in pixels
const GAP = 32; // The gap between cards in pixels (gap-8)

export const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 2500); // Auto-scroll every 2.5 seconds

    return () => clearInterval(interval);
  }, [isHovering]);

  const displayProjects = [
    ...projectsData,
    ...projectsData,
    ...projectsData
  ];
  
  const centeredIndex = projectsData.length + (currentIndex % projectsData.length);

  return (
    <section  id="projects"  className="py-20 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-text-primary"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>

        <div
          className="w-full relative h-[520px] md:h-[550px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            ref={carouselRef}
            className="absolute left-1/2 flex gap-8"
            animate={{ x: `calc(-${centeredIndex * (CARD_WIDTH + GAP)}px - ${CARD_WIDTH / 2}px)` }}
            transition={{ type: 'spring', stiffness: 200, damping: 40 }}
          >
            {displayProjects.map((project, i) => (
              <motion.div
                key={`${project.title}-${i}`}
                className="w-[90vw] md:w-[450px] flex-shrink-0 bg-background-primary/50 backdrop-blur-sm border border-border-color rounded-lg overflow-hidden shadow-lg"
                animate={{
                  scale: i === centeredIndex ? 1.05 : 0.9,
                  opacity: i === centeredIndex ? 1 : 0.5,
                  filter: i === centeredIndex ? 'blur(0px)' : 'blur(4px)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col h-[calc(100%-14rem)]">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="bg-accent/10 text-accent text-xs font-semibold px-2.5 py-1 rounded-full border border-accent/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-text-secondary mb-6 flex-grow">{project.description}</p>
                  <div className="flex items-center justify-start gap-4 mt-auto">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-accent font-semibold hover:text-accent-hover transition-colors"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-text-secondary font-semibold hover:text-text-primary transition-colors"
                    >
                      <FaGithub /> Source
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};