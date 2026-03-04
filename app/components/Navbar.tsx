'use client';
import { motion } from 'framer-motion';
import React from 'react';

export default function Navbar() {
    const handleScroll = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, targetId: string) => {
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
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="fixed top-6 left-0 right-0 mx-auto w-fit bg-charcoal bg-opacity-70 hover:bg-opacity-100 text-white px-8 py-3 border border-gray-500 border-opacity-300 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 z-50"
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
                    <button onClick={(e) => handleScroll(e, 'contact')} className="hover:text-coral transition">Contact</button>
                </motion.li>
            </motion.ul>
        </motion.nav >
    );
}
