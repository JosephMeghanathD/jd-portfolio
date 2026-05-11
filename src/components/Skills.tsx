import { motion, type Variants } from 'framer-motion';
import { TiltCard } from './TiltCard';

const skillsData = [
    {
        category: 'Programming Languages',
        skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++'],
    },
    {
        category: 'Backend Development',
        skills: ['Spring Boot', 'Node.js', 'RESTful APIs', 'Microservices', 'Kafka', 'Redis Pipelines'],
    },
    {
        category: 'Frontend Development',
        skills: ['React', 'HTML5', 'CSS3', 'Tailwind CSS'],
    },
    {
        category: 'Databases',
        skills: ['PostgreSQL', 'MySQL', 'Redis', 'Cassandra', 'Oracle', 'Amazon RDS'],
    },
    {
        category: 'CI/CD & DevOps',
        skills: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitLab CI/CD', 'Bash'],
    },
    {
        category: 'Platform & Integrations',
        skills: ['Shopify Plus', 'Checkout Extensibility', 'Web Pixels API', 'HubSpot', 'Braintree', 'LZ Compression'],
    },
    {
        category: 'Machine Learning & AI',
        skills: ['TensorFlow', 'PyTorch', 'Scikit-learn'],
    },
    {
        category: 'Observability',
        skills: ['Prometheus', 'Grafana', 'Elasticsearch', 'Splunk', 'Log4j'],
    },
    {
        category: 'Testing & Tooling',
        skills: ['JUnit', 'Jest', 'Selenium', 'Postman', 'Jira', 'Confluence'],
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.07 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const Skills = () => {
    return (
        <section id="skills" className="py-24 px-6 sm:px-10 lg:px-20 xl:px-28">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    className="mb-14"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-2">01 / Skills</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
                        Tech Stack
                    </h2>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {skillsData.map((category, idx) => (
                        <motion.div
                            key={category.category}
                            variants={itemVariants}
                            className="h-full"
                        >
                            <TiltCard intensity={8} className="rounded-2xl">
                                <div className="group p-6 rounded-2xl h-full bg-glass-bg backdrop-blur-[20px] border border-glass-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-text-muted text-xs font-mono">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <div className="flex-1 h-px bg-border-color" />
                                    </div>
                                    <h3 className="text-base font-semibold text-text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                                        {category.category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="bg-background-secondary border border-border-color text-text-secondary text-xs font-medium px-3 py-1.5 rounded-lg"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
