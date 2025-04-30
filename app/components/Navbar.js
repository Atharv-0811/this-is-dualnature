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
        <nav className="bg-charcoal text-white p-4 fixed w-full top-0 z-50">
            <ul className="flex space-x-6 justify-center">
                <li><a onClick={(e) => handleScroll(e, 'home')} href="#home" className="hover:text-coral transition cursor-pointer">Home</a></li>
                <li><a onClick={(e) => handleScroll(e, 'about')} href="#about" className="hover:text-coral transition cursor-pointer">About</a></li>
                <li><a onClick={(e) => handleScroll(e, 'discography')} href="#discography" className="hover:text-coral transition cursor-pointer">Discography</a></li>
                <li><a onClick={(e) => handleScroll(e, 'gallery')} href="#gallery" className="hover:text-coral transition cursor-pointer">Gallery</a></li>
                <li><a onClick={(e) => handleScroll(e, 'contact')} href="#contact" className="hover:text-coral transition cursor-pointer">Contact</a></li>
            </ul>
        </nav>
    );
}
