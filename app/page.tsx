import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Services from './components/Services';
import Awards from './components/Awards';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Awards/>
      <Projects />
      <Contact/>
    </>
  );
}
