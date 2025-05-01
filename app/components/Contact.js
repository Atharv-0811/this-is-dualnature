'use client'

import { useForm } from '@formspree/react';

export default function Contact() {
  const [state, handleSubmit, reset] = useForm("mqaqegrq");

  const handleSuccess = () => {
    reset();  // Reset the form after successful submission
  };

  return (
    <section className="bg-dark-gray text-white py-16 px-6" id="contact">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div>
          <h2 className="text-4xl font-bold mb-4 text-coral">Get in touch</h2>
          <p className="text-lg">
            We&apos;d love to hear from you! Whether it&apos;s for a collaboration or just to say hi.
          </p>
        </div>

        {/* Right Side - Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 rounded bg-charcoal text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-coral"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 rounded bg-charcoal text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-coral"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 rounded bg-charcoal text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-coral"
            required
          />
          <button
            type="submit"
            className="bg-coral hover:bg-opacity-80 text-white font-semibold px-6 py-3 rounded transition"
            disabled={state.submitting}
          >
            {state.submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Success Message */}
        {state.succeeded && (
          <div className="mt-6 text-center text-coral">
            <p>Thanks for your message! We&apos;ll get back to you soon.</p>
          </div>
        )}

        {/* Error Handling */}
        {state.errors && state.errors.length > 0 && (
          <div className="mt-6 text-center text-red-500">
            <p>Sorry, something went wrong. Please try again later.</p>
          </div>
        )}
      </div>
    </section>
  );
}
