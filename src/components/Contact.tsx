import { motion } from 'framer-motion';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface IFormInput {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<IFormInput>();

    const API_URL = 'https://auth-service-1002278726079.us-central1.run.app/api/rs/contact';

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const successText = await response.text();
                alert(successText || 'Thank you! Your message has been sent successfully.');
                reset();
            } else {
                const errorText = await response.text();
                console.error("Server responded with an error:", errorText);
                alert(`Oops! Something went wrong: ${errorText}`);
            }
        } catch (error) {
            console.error("Error submitting form: ", error);
            alert('Could not connect to the server. Please check your internet connection and try again.');
        }
    };

    return (
        <section  id="contact"  className="py-20 px-4">
            <div className="container mx-auto max-w-3xl text-center">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-6 text-text-primary"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Get In Touch
                </motion.h2>
                <motion.p
                    className="text-lg text-text-secondary mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Have a question or want to work together? Leave your details below, and I'll get back to you as soon as possible.
                </motion.p>

                <form
                    className="w-full"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <div className="flex flex-col gap-6">
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            placeholder="Your Name"
                            className="w-full bg-background-secondary border border-border-color rounded-lg p-4 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        {errors.name && <span className="text-red-500 -mt-4 text-left">{errors.name.message}</span>}

                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                            })}
                            type="email"
                            placeholder="Your Email"
                            className="w-full bg-background-secondary border border-border-color rounded-lg p-4 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        {errors.email && <span className="text-red-500 -mt-4 text-left">{errors.email.message}</span>}

                        <input
                            {...register("subject", { required: "Subject is required" })}
                            type="text"
                            placeholder="Subject"
                            className="w-full bg-background-secondary border border-border-color rounded-lg p-4 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        {errors.subject && <span className="text-red-500 -mt-4 text-left">{errors.subject.message}</span>}

                        <textarea
                            {...register("message", { required: "Message is required" })}
                            placeholder="Your Message"
                            rows={5}
                            className="w-full bg-background-secondary border border-border-color rounded-lg p-4 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                        ></textarea>
                        {errors.message && <span className="text-red-500 -mt-4 text-left">{errors.message.message}</span>}
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-8 w-full bg-accent text-white dark:text-black font-bold py-4 px-6 rounded-lg transition-colors hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                </form>
            </div>
        </section>
    );
};