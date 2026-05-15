import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import { Journey } from './components/Journey';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Header } from './components/Header';
import { SocialSidebar } from './components/SocialSidebar';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { BackgroundMoon } from './components/BackgroundMoon';

function App() {
  return (
    <div>
      {/* Background system */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

        {/* Noise grain texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--border-color) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Top radial beam — primary atmosphere */}
        <div
          className="absolute -top-48 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, var(--orb-a) 0%, transparent 68%)' }}
        />

        {/* Bottom-right secondary orb */}
        <div
          className="absolute -bottom-80 -right-60 w-[900px] h-[900px] rounded-full animate-float-b"
          style={{ background: 'radial-gradient(circle, var(--orb-b) 0%, transparent 65%)' }}
        />

        {/* Faint horizontal lines for depth */}
        <div className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/[0.04] to-transparent" />
        <div className="absolute top-[65%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/[0.03] to-transparent" />

        {/* Moon + stars — scroll-driven phase animation */}
        <BackgroundMoon />
      </div>

      <Header />
      <SocialSidebar />
      <ScrollToTopButton />

      <main className="relative z-10">
        <Hero />
        <Skills />
        <Journey />
        <Projects />
        <Contact />
        <footer className="relative border-t border-border-color py-8 px-6 sm:px-10 lg:px-20 xl:px-28">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
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
