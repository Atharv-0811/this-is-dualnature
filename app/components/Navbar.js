// // components/Navbar.js
// 'use client';
// import { motion } from 'framer-motion';

// export default function Navbar() {
//     const handleScroll = (e, targetId) => {
//         e.preventDefault();
//         const targetSection = document.getElementById(targetId);
//         if (targetSection) {
//             targetSection.scrollIntoView({ behavior: 'smooth' });
//         }
//     };

//     return (
//         <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-charcoal bg-opacity-70 hover:bg-opacity-100 text-white px-8 py-3 border border-gray-500 border-opacity-300 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 z-50">
//             <ul className="flex space-x-6">
//                 <li><a onClick={(e) => handleScroll(e, 'home')} href="#home" className="hover:text-coral transition">Home</a></li>
//                 <li><a onClick={(e) => handleScroll(e, 'about')} href="#about" className="hover:text-coral transition">About</a></li>
//                 <li><a onClick={(e) => handleScroll(e, 'discography')} href="#discography" className="hover:text-coral transition">Music</a></li>
//                 <li><a onClick={(e) => handleScroll(e, 'gallery')} href="#gallery" className="hover:text-coral transition">Gallery</a></li>
//                 <li><a onClick={(e) => handleScroll(e, 'contact')} href="#contact" className="hover:text-coral transition">Contact</a></li>
//             </ul>
//         </nav>
//     );
// }

'use client';
import { motion } from 'framer-motion';

export default function Navbar() {
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="fixed top-4 left-0 right-0 mx-auto w-fit bg-charcoal bg-opacity-70 hover:bg-opacity-100 text-white px-8 py-3 border border-gray-500 border-opacity-300 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 z-50"
        >
            <motion.ul
                className="flex space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <button onClick={(e) => handleScroll(e, 'home')} className="hover:text-coral transition">Home</button>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <button onClick={(e) => handleScroll(e, 'about')} className="hover:text-coral transition">About</button>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <button onClick={(e) => handleScroll(e, 'discography')} className="hover:text-coral transition">Music</button>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <button onClick={(e) => handleScroll(e, 'gallery')} className="hover:text-coral transition">Gallery</button>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <button onClick={(e) => handleScroll(e, 'contact')} className="hover:text-coral transition">Contact</button>
                </motion.li>
            </motion.ul>
        </motion.nav >
    );
}