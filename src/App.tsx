import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import { Journey } from './components/Journey';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Header } from './components/Header';
import { SocialSidebar } from './components/SocialSidebar';
import { ScrollToTopButton } from './components/ScrollToTopButton';

function App() {
  return (
    <div>
      {/* Atmospheric gradient orb background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Primary cyan orb — top left */}
        <div
          className="absolute -top-60 -left-60 w-[900px] h-[900px] rounded-full animate-float-a"
          style={{ background: 'radial-gradient(circle, var(--orb-a) 0%, transparent 65%)' }}
        />
        {/* Secondary violet orb — bottom right */}
        <div
          className="absolute -bottom-60 -right-60 w-[1000px] h-[1000px] rounded-full animate-float-b"
          style={{ background: 'radial-gradient(circle, var(--orb-b) 0%, transparent 65%)' }}
        />
        {/* Tertiary mid-page accent */}
        <div
          className="absolute top-[45%] left-[55%] w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full animate-float-c"
          style={{ background: 'radial-gradient(circle, var(--orb-a) 0%, transparent 70%)', opacity: 0.4 }}
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(var(--text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
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
