import { useState, useEffect } from 'react';
import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import { Journey } from './components/Journey';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Header } from './components/Header';
import { SocialSidebar } from './components/SocialSidebar';
import { useTheme } from './hooks/useTheme';
import Particles from './components/Particles';
import { ScrollToTopButton } from './components/ScrollToTopButton';

// Define the color palettes outside the component
const lightModeParticleColors = ['#000000', '#4b5563', '#6b7280'];
const darkModeParticleColors = ['#ffffff', '#e5e7eb', '#d1d5db'];

function App() {
  const { theme } = useTheme();
  
 
 
  const [currentParticleColors, setCurrentParticleColors] = useState(darkModeParticleColors);

 
  useEffect(() => {
   
   
    if (theme === 'dark') {
      setCurrentParticleColors(darkModeParticleColors);
    } else {
      setCurrentParticleColors(lightModeParticleColors);
    }
  }, [theme]);

  return (
    <div>
      <Particles
        className="fixed inset-0 z-0"
        particleCount={2500}
        speed={0.04}
        particleBaseSize={70}
        particleColors={currentParticleColors}
        disableRotation={true}
        moveParticlesOnHover={true}
        particleHoverFactor={0.15}
        alphaParticles={true}
      />

      <Header />
      <SocialSidebar />
      <ScrollToTopButton /> 
      
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Journey />
        <Projects />
        <Contact />
        <footer className="border-t border-border-color py-8 px-6 sm:px-10 lg:px-20 xl:px-28">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
            <span className="text-text-muted text-xs font-mono">© 2026 Joseph D</span>
            <span className="text-text-muted text-xs font-mono">Built with React · Framer Motion · TypeScript</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;