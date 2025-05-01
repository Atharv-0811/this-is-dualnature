// app/page.js

import Navbar from './components/Navbar';
import About from './components/About';
import Footer from './components/Footer';
import Discography from './components/Discography';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Hero from './components/Hero';
import AOSInit from './components/AOSInit';
import LatestVideo from './components/LatestVideo';
import Demos from './components/Demos';

export default function Home() {
  return (
    <div className="pt-16">
      <AOSInit />
      <Navbar />
      <Hero />
      <LatestVideo />
      <section id="about">
        <About />
      </section>
      <section id="discography">
        <Discography />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Demos />
      <Footer />
    </div>
  );
}
