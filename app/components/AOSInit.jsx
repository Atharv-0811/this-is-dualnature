'use client';

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
    useEffect(() => {
        AOS.init({
          duration: 800,
          once: true,
          easing: 'ease-in-out',
        });
        console.log('AOS initialized');
      }, []);
      

  return null; // No UI, just runs AOS
}
