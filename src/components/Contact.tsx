import { motion } from 'framer-motion';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FaEnvelope, FaLinkedin, FaGithub, FaArrowRight } from 'react-icons/fa';
import { TiltCard } from './TiltCard';

interface IFormInput {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const contactLinks = [
    {
        icon: FaEnvelope,
        label: 'josephmeghanath@gmail.com',
        sublabel: 'Email',
        href: 'mailto:josephmeghanath@gmail.com',
    },
    {
        icon: FaLinkedin,
        label: 'linkedin.com/in/joseph-meghanath',
        sublabel: 'LinkedIn',
        href: 'https://www.linkedin.com/in/joseph-meghanath-9880ba149/',
    },
    {
        icon: FaGithub,
        label: 'github.com/JosephMeghanathD',
        sublabel: 'GitHub',
        href: 'https://github.com/JosephMeghanathD',
    },
];

const inputClass =
    'w-full bg-background-secondary/60 border border-border-color rounded-xl p-4 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/40 hover:border-accent/20 transition-all duration-200';

export const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<IFormInput>();

    const API_URL = 'https://auth-service-1002278726079.us-central1.run.app/api/rs/contact';

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const successText = await response.text();
                alert(successText || 'Thank you! Your message has been sent.');
                reset();
            } else {
                const errorText = await response.text();
                alert(`Something went wrong: ${errorText}`);
            }
        } catch {
            alert('Could not connect to the server. Please try again.');
        }
    };

    return (
        <section id="contact" className="py-28 px-6 sm:px-10 lg:px-20 xl:px-28">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-16 lg:gap-20 items-start">

                    {/* ── Left: CTA info ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Availability indicator */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono font-medium border border-border-color bg-background-elevated/50 text-text-muted mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                            Open to opportunities
                        </div>

                        {/* Headline */}
                        <span className="section-label">04 / Contact</span>
                        <h2 className="font-display text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[0.88] text-text-primary mb-6">
                            Let's build<br />
                            <span className="text-accent">something.</span>
                        </h2>

                        <p className="text-base text-text-secondary leading-relaxed mb-10 max-w-[36ch]">
                            Open to interesting problems, collaborations, and conversations.
                            Drop a message — I respond to every one.
                        </p>

                        {/* Contact links */}
                        <div className="flex flex-col gap-3">
                            {contactLinks.map(({ icon: Icon, label, sublabel, href }) => (
                                <motion.a
                                    key={href}
                                    href={href}
                                    target={href.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-4 p-3.5 rounded-xl border border-border-color bg-background-elevated/20 hover:border-accent/25 hover:bg-accent/[0.04] transition-all duration-300"
                                    whileHover={{ x: 4 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                >
                                    <div className="w-10 h-10 rounded-xl bg-background-elevated border border-border-color flex items-center justify-center text-text-muted group-hover:text-accent group-hover:border-accent/30 transition-all duration-300 flex-shrink-0">
                                        <Icon size={15} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] text-text-muted font-mono uppercase tracking-widest mb-0.5">{sublabel}</p>
                                        <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-300 truncate font-medium">
                                            {label}
                                        </p>
                                    </div>
                                    <FaArrowRight
                                        size={12}
                                        className="text-text-muted group-hover:text-accent opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0"
                                    />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Right: Form ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <TiltCard intensity={4} className="rounded-2xl">
                            <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl p-8">
                                <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-6">Send a message</p>
                                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                {...register('name', { required: 'Name is required' })}
                                                type="text"
                                                placeholder="Your Name"
                                                className={inputClass}
                                            />
                                            {errors.name && (
                                                <span className="text-red-400 text-xs mt-1.5 block font-mono">{errors.name.message}</span>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                {...register('email', {
                                                    required: 'Email is required',
                                                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
                                                })}
                                                type="email"
                                                placeholder="Your Email"
                                                className={inputClass}
                                            />
                                            {errors.email && (
                                                <span className="text-red-400 text-xs mt-1.5 block font-mono">{errors.email.message}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <input
                                            {...register('subject', { required: 'Subject is required' })}
                                            type="text"
                                            placeholder="Subject"
                                            className={inputClass}
                                        />
                                        {errors.subject && (
                                            <span className="text-red-400 text-xs mt-1.5 block font-mono">{errors.subject.message}</span>
                                        )}
                                    </div>

                                    <div>
                                        <textarea
                                            {...register('message', { required: 'Message is required' })}
                                            placeholder="Your Message"
                                            rows={5}
                                            className={inputClass + ' resize-none'}
                                        />
                                        {errors.message && (
                                            <span className="text-red-400 text-xs mt-1.5 block font-mono">{errors.message.message}</span>
                                        )}
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-accent text-[#09090B] font-bold py-4 rounded-xl text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                                        whileHover={{ y: -2, boxShadow: '0 20px 40px rgba(34,211,238,0.28)' }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                    >
                                        {isSubmitting ? 'Sending...' : (
                                            <>
                                                Send Message
                                                <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </TiltCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
