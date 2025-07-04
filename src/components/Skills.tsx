import { motion } from 'framer-motion';

const skillsData = [
  {
    category: 'Programming Languages',
    skills: ['Java', 'Python', 'JavaScript', 'C', 'C++'],
  },
  {
    category: 'Backend Development',
    skills: ['Spring Boot', 'RESTful APIs', 'Microservices', 'Node.js'],
  },
  {
    category: 'Frontend Development',
    skills: ['React', 'HTML5', 'CSS3'],
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'Cassandra', 'Oracle', 'Amazon RDS', 'OTSDB'],
  },
  {
    category: 'CI/CD & DevOps',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitLab CI/CD', 'Bash'],
  },
  {
    category: 'Machine Learning & AI',
    skills: ['TensorFlow', 'Py-Torch', 'Scikit-learn'],
  },
  {
    category: 'Logging & Monitoring',
    skills: ['Prometheus', 'Grafana', 'Elasticsearch', 'Splunk', 'Log4j'],
  },
  {
    category: 'Testing & Project Management',
    skills: ['JUnit', 'Jest', 'Selenium', 'Postman', 'Jira', 'Confluence'],
  },
];

export const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
          Skills & Tech Stack
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillsData.map((category, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-cyan-400 mb-4">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-700 text-gray-300 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};