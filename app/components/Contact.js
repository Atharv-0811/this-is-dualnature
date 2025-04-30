export default function Contact() {
    return (
      <section className="bg-dark-gray text-white py-16 px-6" id="contact">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div>
            <h2 className="text-4xl font-bold mb-4 text-coral">Get in touch</h2>
            <p className="text-lg">
              We'd love to hear from you! Whether it's for a collaboration or just to say hi.
            </p>
          </div>
  
          {/* Right Side - Contact Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded bg-charcoal text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded bg-charcoal text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 rounded bg-charcoal text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral"
            />
            <button
              type="submit"
              className="bg-coral hover:bg-opacity-80 text-white font-semibold px-6 py-3 rounded transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    );
  }
  