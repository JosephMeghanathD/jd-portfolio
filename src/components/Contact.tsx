import { motion, AnimatePresence } from 'framer-motion';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FaEnvelope, FaLinkedin, FaGithub, FaArrowRight } from 'react-icons/fa';
import { TiltCard } from './TiltCard';
import { useState } from 'react';

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

const inputBase =
    'w-full rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted ' +
    'bg-input-bg border border-border-color ' +
    'focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 ' +
    'hover:border-text-secondary transition-all duration-200';

/* ── Floating particle dot ── */
function Particle({ x, delay }: { x: string; delay: number }) {
    return (
        <motion.span
            className="absolute bottom-0 rounded-full bg-accent/70 pointer-events-none"
            style={{ left: x, width: 4, height: 4 }}
            initial={{ y: 0, opacity: 0, scale: 0 }}
            animate={{ y: -80, opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
            transition={{ duration: 1.6, delay, ease: 'easeOut' }}
        />
    );
}

/* ── Success state ── */
function SuccessState({ name, onReset }: { name: string; onReset: () => void }) {
    const particles = [12, 28, 40, 56, 68, 80, 92, 106];
    return (
        <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -12 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center py-10 text-center relative overflow-hidden"
        >
            {/* Particle burst */}
            <div className="relative h-0 w-full">
                {particles.map((x, i) => (
                    <Particle key={i} x={`${x}%`} delay={0.4 + i * 0.07} />
                ))}
            </div>

            {/* Checkmark ring */}
            <div className="relative mb-8 flex items-center justify-center" style={{ width: 88, height: 88 }}>
                {/* Expanding rings */}
                {[0, 1, 2].map(i => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-accent"
                        style={{ width: 72, height: 72 }}
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 2.2 + i * 0.6, opacity: 0 }}
                        transition={{ duration: 1.8, delay: 0.3 + i * 0.28, repeat: Infinity, ease: 'easeOut' }}
                    />
                ))}

                {/* SVG: circle + check */}
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                    {/* Glowing bg disc */}
                    <motion.circle
                        cx="36" cy="36" r="34"
                        fill="rgba(34,211,238,0.07)"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, ease: 'backOut' }}
                    />
                    {/* Circle stroke draws */}
                    <motion.circle
                        cx="36" cy="36" r="28"
                        stroke="rgba(34,211,238,0.9)" strokeWidth="2"
                        strokeLinecap="round"
                        pathLength="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.5))' }}
                    />
                    {/* Checkmark draws */}
                    <motion.path
                        d="M 23 36 L 32 45 L 49 27"
                        stroke="rgba(34,211,238,1)" strokeWidth="2.8"
                        strokeLinecap="round" strokeLinejoin="round"
                        pathLength="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.45, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
                        style={{ filter: 'drop-shadow(0 0 4px rgba(34,211,238,0.7))' }}
                    />
                </svg>
            </div>

            {/* Headline */}
            <motion.p
                className="text-[10px] font-mono text-accent/70 uppercase tracking-[0.22em] mb-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.72, duration: 0.35 }}
            >
                Message received
            </motion.p>
            <motion.h3
                className="font-display text-3xl font-bold text-text-primary mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.84, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
                Thanks,{' '}
                <span className="text-accent" style={{ filter: 'drop-shadow(0 0 12px rgba(34,211,238,0.4))' }}>
                    {name}!
                </span>
            </motion.h3>
            <motion.p
                className="text-sm text-text-muted mb-10"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.96, duration: 0.35 }}
            >
                I read every message and usually reply within a day.
            </motion.p>

            {/* Reset button */}
            <motion.button
                onClick={onReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono border border-border-color text-text-secondary hover:text-text-primary hover:border-text-secondary transition-all duration-200"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.35 }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
            >
                ← Send another
            </motion.button>
        </motion.div>
    );
}

export const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [senderName, setSenderName] = useState('');
    const [msgLen, setMsgLen] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_KEY,
                    ...data,
                }),
            });
            const result = await response.json();
            if (result.success) {
                setSenderName(data.name.split(' ')[0]);
                setSubmitted(true);
                reset();
                setMsgLen(0);
            } else {
                alert(`Something went wrong: ${result.message}`);
            }
        } catch {
            alert('Could not connect. Please try again.');
        }
    };

    return (
        <section id="contact" className="py-28 px-6 sm:px-10 lg:px-20 xl:px-28">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-16 lg:gap-20 items-start">

                    {/* ── Left ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono font-medium border border-border-color bg-background-secondary text-text-muted mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                            Open to opportunities
                        </div>
                        <span className="section-label">04 / Contact</span>
                        <h2 className="font-display text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[0.88] text-text-primary mb-6">
                            Let's build<br />
                            <span className="text-accent">something.</span>
                        </h2>
                        <p className="text-base text-text-secondary leading-relaxed mb-10 max-w-[36ch]">
                            Open to interesting problems, collaborations, and conversations.
                            Drop a message — I respond to every one.
                        </p>
                        <div className="flex flex-col gap-3">
                            {contactLinks.map(({ icon: Icon, label, sublabel, href }) => (
                                <motion.a
                                    key={href}
                                    href={href}
                                    target={href.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-4 p-3.5 rounded-xl border border-border-color bg-glass-bg hover:border-accent/25 hover:bg-accent/[0.04] transition-all duration-300"
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
                                    <FaArrowRight size={12} className="text-text-muted group-hover:text-accent opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Right: Form / Success ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <TiltCard intensity={4} className="rounded-2xl">
                            <div className="backdrop-blur-[20px] border border-border-color rounded-2xl p-8 overflow-hidden" style={{ background: 'var(--contact-card-bg)' }}>
                                <AnimatePresence mode="wait">

                                    {submitted ? (
                                        <SuccessState name={senderName} onReset={() => setSubmitted(false)} />
                                    ) : (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -16, scale: 0.97 }}
                                            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-6">Send a message</p>
                                            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <input
                                                            {...register('name', { required: 'Name is required' })}
                                                            type="text"
                                                            placeholder="Your Name"
                                                            className={inputBase + (errors.name ? ' border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20' : '')}
                                                        />
                                                        {errors.name && (
                                                            <motion.span
                                                                initial={{ opacity: 0, y: -4 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="text-red-400/90 text-xs mt-1.5 block font-mono"
                                                            >
                                                                {errors.name.message}
                                                            </motion.span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <input
                                                            {...register('email', {
                                                                required: 'Email is required',
                                                                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                                                            })}
                                                            type="email"
                                                            placeholder="Your Email"
                                                            className={inputBase + (errors.email ? ' border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20' : '')}
                                                        />
                                                        {errors.email && (
                                                            <motion.span
                                                                initial={{ opacity: 0, y: -4 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="text-red-400/90 text-xs mt-1.5 block font-mono"
                                                            >
                                                                {errors.email.message}
                                                            </motion.span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <input
                                                        {...register('subject', { required: 'Subject is required' })}
                                                        type="text"
                                                        placeholder="Subject"
                                                        className={inputBase + (errors.subject ? ' border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20' : '')}
                                                    />
                                                    {errors.subject && (
                                                        <motion.span
                                                            initial={{ opacity: 0, y: -4 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="text-red-400/90 text-xs mt-1.5 block font-mono"
                                                        >
                                                            {errors.subject.message}
                                                        </motion.span>
                                                    )}
                                                </div>

                                                <div>
                                                    <div className="relative">
                                                        <textarea
                                                            {...register('message', { required: 'Message is required' })}
                                                            placeholder="Your Message"
                                                            rows={5}
                                                            maxLength={1000}
                                                            className={inputBase + ' resize-none' + (errors.message ? ' border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20' : '')}
                                                            onInput={(e) => setMsgLen((e.target as HTMLTextAreaElement).value.length)}
                                                        />
                                                        <span className="absolute bottom-3 right-3 text-[10px] font-mono text-text-muted pointer-events-none">
                                                            {msgLen}/1000
                                                        </span>
                                                    </div>
                                                    {errors.message && (
                                                        <motion.span
                                                            initial={{ opacity: 0, y: -4 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="text-red-400/90 text-xs mt-1.5 block font-mono"
                                                        >
                                                            {errors.message.message}
                                                        </motion.span>
                                                    )}
                                                </div>

                                                <motion.button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full bg-accent text-zinc-950 font-bold py-4 rounded-xl text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 group"
                                                    whileHover={!isSubmitting ? { y: -2, boxShadow: '0 20px 40px rgba(34,211,238,0.25)' } : undefined}
                                                    whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2"/>
                                                                <path d="M 8 2 A 6 6 0 0 1 14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                            </svg>
                                                            Sending…
                                                        </>
                                                    ) : (
                                                        <>
                                                            Send Message
                                                            <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                                                        </>
                                                    )}
                                                </motion.button>
                                            </form>
                                        </motion.div>
                                    )}

                                </AnimatePresence>
                            </div>
                        </TiltCard>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
