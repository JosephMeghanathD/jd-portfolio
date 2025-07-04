

import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import Hyperspeed from './components/Hyperspeed';
import { Journey } from './components/Journey'; 
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';

function App() {
  return (
    <main className="justify-center items-center h-screen w-screen">
      
      <Hyperspeed />

      
      <div className="relative z-10">
        <Hero />
        <Skills />
        <Journey />
        <Projects />
        <Contact />
      </div>
    </main>

  );
}

export default App;