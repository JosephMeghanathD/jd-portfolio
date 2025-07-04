import { motion } from 'framer-motion';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface IFormInput {
    name: string;
    email: string;
    message: string;
}

export const Contact = () => {
    // useForm hook for state management, validation, and submission
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<IFormInput>();

    // This function will be called on form submission
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        // This is the modern way to submit a form to Netlify with AJAX
        // to prevent a page reload.
        const formData = new URLSearchParams();
        formData.append('form-name', 'contact');
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key as keyof IFormInput]);
          });

        try {
            await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString(),
            });
            alert('Thank you! Your message has been sent successfully.');
            reset(); // Clear the form after successful submission
        } catch (error) {
            alert('Oops! Something went wrong. Please try again later.');
        }
    };

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-3xl text-center">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-6 text-white"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Get In Touch
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-400 mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Have a question or want to work together? Leave your details below, and I'll get back to you as soon as possible.
                </motion.p>

                {/* 
          The form is set up for Netlify.
          - `name="contact"`: Identifies the form.
          - `data-netlify="true"`: Enables Netlify's form handling.
          - `data-netlify-honeypot="bot-field"`: A trap for spam bots.
        */}
                <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    className="w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* This input is required by Netlify to identify the form */}
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                        <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                    </p>

                    <div className="flex flex-col gap-6">
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            placeholder="Your Name"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                        {errors.name && <span className="text-red-500 -mt-4 text-left">{errors.name.message}</span>}

                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                            })}
                            type="email"
                            placeholder="Your Email"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                        {errors.email && <span className="text-red-500 -mt-4 text-left">{errors.email.message}</span>}

                        <textarea
                            {...register("message", { required: "Message is required" })}
                            placeholder="Your Message"
                            rows={5}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        ></textarea>
                        {errors.message && <span className="text-red-500 -mt-4 text-left">{errors.message.message}</span>}
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-8 w-full bg-cyan-500 text-gray-900 font-bold py-4 px-6 rounded-lg transition-colors hover:bg-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
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