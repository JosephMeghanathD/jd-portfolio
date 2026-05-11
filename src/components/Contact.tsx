import { motion } from 'framer-motion';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
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
        href: 'mailto:josephmeghanath@gmail.com',
    },
    {
        icon: FaLinkedin,
        label: 'linkedin.com/in/joseph-meghanath',
        href: 'https://www.linkedin.com/in/joseph-meghanath-9880ba149/',
    },
    {
        icon: FaGithub,
        label: 'github.com/JosephMeghanathD',
        href: 'https://github.com/JosephMeghanathD',
    },
];

const inputClass =
    'w-full bg-background-secondary border border-border-color rounded-xl p-4 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent/40 transition-all';

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
        <section id="contact" className="py-24 px-6 sm:px-10 lg:px-20 xl:px-28">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-2">04 / Contact</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-5">
                            Get In Touch
                        </h2>
                        <p className="text-base text-text-secondary leading-relaxed mb-10 max-w-[40ch]">
                            Open to interesting problems, collaborations, and conversations.
                            Drop a message and I'll get back to you.
                        </p>

                        <div className="flex flex-col gap-4">
                            {contactLinks.map(({ icon: Icon, label, href }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target={href.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-4"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-glass-bg backdrop-blur-[20px] border border-glass-border flex items-center justify-center text-text-muted group-hover:text-accent group-hover:border-accent/30 group-hover:shadow-md group-hover:shadow-accent/10 transition-all duration-300">
                                        <Icon size={16} />
                                    </div>
                                    <span className="text-sm text-text-secondary group-hover:text-accent transition-colors duration-300 font-medium">
                                        {label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Form in glass TiltCard */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <TiltCard intensity={5} className="rounded-2xl">
                            <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl p-8">
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
                                                <span className="text-red-400 text-xs mt-1.5 block">{errors.name.message}</span>
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
                                                <span className="text-red-400 text-xs mt-1.5 block">{errors.email.message}</span>
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
                                            <span className="text-red-400 text-xs mt-1.5 block">{errors.subject.message}</span>
                                        )}
                                    </div>

                                    <div>
                                        <textarea
                                            {...register('message', { required: 'Message is required' })}
                                            placeholder="Your Message"
                                            rows={6}
                                            className={inputClass + ' resize-none'}
                                        />
                                        {errors.message && (
                                            <span className="text-red-400 text-xs mt-1.5 block">{errors.message.message}</span>
                                        )}
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-accent text-[#09090B] font-bold py-4 rounded-xl text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
                                        whileHover={{ y: -2, boxShadow: '0 20px 40px rgba(34,211,238,0.3)' }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
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
