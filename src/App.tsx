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
import { ScrollToTopButton } from './components/ScrollToTopButton'; // Assuming you added this

// Define the color palettes outside the component
const lightModeParticleColors = ['#000000', '#4b5563', '#6b7280'];
const darkModeParticleColors = ['#ffffff', '#e5e7eb', '#d1d5db'];

function App() {
  const { theme } = useTheme();
  
  // THIS IS THE FIX: Initialize the state with one of the palettes.
  // The useEffect below will handle keeping it in sync.
  const [currentParticleColors, setCurrentParticleColors] = useState(darkModeParticleColors);

  // This useEffect hook will now correctly run whenever the 'theme' changes.
  useEffect(() => {
    // When the theme changes, update the particle color state.
    // This will cause a re-render and pass the new array to the Particles component.
    if (theme === 'dark') {
      setCurrentParticleColors(darkModeParticleColors);
    } else {
      setCurrentParticleColors(lightModeParticleColors);
    }
  }, [theme]); // The dependency array ensures this runs ONLY when 'theme' changes.

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