// components/Hero.js
export default function Hero() {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center bg-charcoal text-white px-4">
            <div className="text-center space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold">Dualnature</h1>
                <p className="text-lg md:text-2xl text-gray-300">Versatile. Multi-genre. Limitless Music.</p>
                <a href="#discography" className="bg-coral text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-white hover:text-charcoal transition">
                    Explore Our Music
                </a>
            </div>
        </section>
    );
}
