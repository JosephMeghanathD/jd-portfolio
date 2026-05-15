import { motion } from 'framer-motion';
import { useState } from 'react';

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
        category: 'Platform & Integrations',
        skills: ['Shopify Plus', 'Checkout Extensibility', 'Web Pixels API', 'HubSpot', 'Braintree', 'LZ Compression'],
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
        category: 'Observability',
        skills: ['Prometheus', 'Grafana', 'Elasticsearch', 'Splunk', 'Log4j'],
    },
    {
        category: 'Frontend Development',
        skills: ['React', 'HTML5', 'CSS3', 'Tailwind CSS'],
    },
    {
        category: 'Testing & Tooling',
        skills: ['JUnit', 'Jest', 'Selenium', 'Postman', 'Jira', 'Confluence'],
    },
    {
        category: 'Machine Learning & AI',
        skills: ['TensorFlow', 'PyTorch', 'Scikit-learn'],
    },
];

const ROW_DURATIONS = [22, 26, 19, 24, 17, 21, 14, 20, 13];

export const Skills = () => {
    return (
        <section id="skills" className="py-28 px-6 sm:px-10 lg:px-20 xl:px-28">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-label">01 / Skills</span>
                    <h2 className="section-heading">Tech Stack</h2>
                </motion.div>

                <div className="border-t border-border-color">
                    {skillsData.map((item, idx) => (
                        <SkillRow
                            key={item.category}
                            item={item}
                            idx={idx}
                            reverse={idx % 2 === 1}
                            duration={ROW_DURATIONS[idx]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

interface SkillRowProps {
    item: { category: string; skills: string[] };
    idx: number;
    reverse: boolean;
    duration: number;
}

const SkillRow = ({ item, idx, reverse, duration }: SkillRowProps) => {
    const [hovered, setHovered] = useState(false);
    const pills = [...item.skills, ...item.skills, ...item.skills, ...item.skills];

    return (
        <motion.div
            className="group relative border-b border-border-color"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: idx * 0.055, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Hover bg */}
            <div className="absolute inset-0 bg-accent/[0.025] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

            <div className="flex items-center">
                {/* Category label column */}
                <div className="relative flex-shrink-0 flex items-center gap-2.5 py-5 pr-4 w-[148px] sm:w-[210px] lg:w-[268px]">
                    <span className="text-[10px] font-mono text-text-muted tabular-nums select-none flex-shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="w-px h-3.5 bg-border-color flex-shrink-0" />
                    <h3 className="flex-1 min-w-0 text-[11px] sm:text-xs font-bold text-text-secondary uppercase tracking-[0.1em] group-hover:text-accent transition-colors duration-300 leading-tight truncate">
                        {item.category}
                    </h3>
                    <span className="hidden sm:flex items-center flex-shrink-0 text-[9px] font-mono text-text-muted bg-background-secondary/60 border border-border-color px-1.5 py-0.5 rounded-md ml-auto">
                        {item.skills.length}
                    </span>
                </div>

                {/* Vertical separator */}
                <div className="w-px h-8 bg-border-color flex-shrink-0 group-hover:bg-accent/30 transition-colors duration-300" />

                {/* Direction indicator */}
                <span className="hidden sm:block text-[11px] font-mono text-text-muted/40 group-hover:text-accent/60 transition-colors duration-300 flex-shrink-0 w-7 text-center select-none">
                    {reverse ? '←' : '→'}
                </span>

                {/* Marquee */}
                <div
                    className="flex-1 overflow-hidden py-5 px-3 sm:px-4 min-w-0"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                    }}
                >
                    <div
                        className="flex items-center gap-3 w-max"
                        style={{
                            animation: `${reverse ? 'marquee-rtl' : 'marquee'} ${duration}s linear infinite`,
                            animationPlayState: hovered ? 'paused' : 'running',
                        }}
                    >
                        {pills.map((skill, i) => (
                            <span
                                key={i}
                                className="flex-shrink-0 text-[11px] font-mono text-text-muted whitespace-nowrap px-3 py-1.5 rounded-lg border border-border-color bg-background-secondary/30 group-hover:border-accent/20 group-hover:text-text-secondary group-hover:bg-accent/[0.04] transition-all duration-300"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
