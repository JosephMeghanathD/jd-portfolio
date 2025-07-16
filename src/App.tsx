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
        particleCount={5000}
        speed={0.05}
        particleBaseSize={80}
        particleColors={currentParticleColors}
        disableRotation={true}
        moveParticlesOnHover={true}
        particleHoverFactor={0.2} 
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
      </main>
    </div>
  );
}

export default App;