// components/Navbar.js
'use client';

export default function Navbar() {
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 64, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-charcoal bg-opacity-70 hover:bg-opacity-100 text-white px-8 py-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 z-50">
            <ul className="flex space-x-6">
                <li><a onClick={(e) => handleScroll(e, 'home')} href="#home" className="hover:text-coral transition">Home</a></li>
                <li><a onClick={(e) => handleScroll(e, 'about')} href="#about" className="hover:text-coral transition">About</a></li>
                <li><a onClick={(e) => handleScroll(e, 'discography')} href="#discography" className="hover:text-coral transition">Discography</a></li>
                <li><a onClick={(e) => handleScroll(e, 'gallery')} href="#gallery" className="hover:text-coral transition">Gallery</a></li>
                <li><a onClick={(e) => handleScroll(e, 'contact')} href="#contact" className="hover:text-coral transition">Contact</a></li>
            </ul>
        </nav>


    );
}
