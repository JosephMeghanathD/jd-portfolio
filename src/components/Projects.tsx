import { motion, type Variants } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';


const projectsData = [
  {
    image: '/projects/sm.png',
    title: 'Specialty Marketplace',
    description: 'A full-stack, microservices-based e-commerce platform featuring product browsing, a shopping cart, user authentication, and order management. Built with React and Spring Boot, and deployed on GCP and Netlify.',
    tags: ['React', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Docker', 'JWT', 'GCP', 'Netlify', 'Tailwind CSS'],
    liveUrl: 'https://specalitymarketplace.netlify.app/',
    sourceUrl: 'https://github.com/JosephMeghanathD/Specialty-Marketplace',
  },
  {
    image: '/projects/ride.png', 
    title: 'AAD RideShare Application',
    description: 'A privacy-first, full-stack ride-sharing platform for students and professionals to split costs, reduce emissions, and build community via secure, in-app messaging.',
    tags: ['React', 'Spring Boot', 'PostgreSQL', 'Docker', 'JWT', 'GCP', 'Netlify', 'NeonDb'],
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


export const Projects = () => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

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
          My Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:-translate-y-2"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-cyan-900/50 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-400 mb-6">{project.description}</p>
                
                <div className="flex items-center justify-start gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-200 transition-colors"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 font-semibold hover:text-white transition-colors"
                  >
                    <FaGithub /> Source
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};