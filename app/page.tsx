import Header from './components/Header';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Services from './components/Services';
import Awards from './components/Awards';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <div className="relative z-30">
        <Mission />
        <Services />
        <Awards />
        <Projects />
        <Contact />
      </div>
    </>
  );
}
