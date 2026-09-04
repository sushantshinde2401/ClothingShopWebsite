import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp, Sparkles } from 'lucide-react';
import { Component, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import useLenis from './hooks/useLenis.js';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import Lookbook from './pages/Lookbook.jsx';
import NewArrivals from './pages/NewArrivals.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Shop from './pages/Shop.jsx';
import { pageTransition } from './utils/animations.js';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="grid min-h-screen place-items-center bg-ink px-6 text-center text-offwhite">
          <div>
            <h1 className="text-4xl font-black uppercase">Mad’ora couldn’t load</h1>
            <p className="mt-3 max-w-xl text-white/60">{this.state.error.message}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    const move = (event) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-24 w-24 rounded-full bg-white/10 blur-2xl mix-blend-difference lg:block"
      animate={{ x: pos.x - 48, y: pos.y - 48 }}
      transition={{ type: 'spring', stiffness: 120, damping: 26, mass: 0.3 }}
    />
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<motion.div {...pageTransition}><Home /></motion.div>}
        />
        <Route
          path="/shop"
          element={<motion.div {...pageTransition}><Shop /></motion.div>}
        />
        <Route
          path="/new-arrivals"
          element={<motion.div {...pageTransition}><NewArrivals /></motion.div>}
        />
        <Route
          path="/product/:id"
          element={<motion.div {...pageTransition}><ProductDetail /></motion.div>}
        />
        <Route
          path="/lookbook"
          element={<motion.div {...pageTransition}><Lookbook /></motion.div>}
        />
        <Route
          path="/about"
          element={<motion.div {...pageTransition}><About /></motion.div>}
        />
        <Route
          path="/contact"
          element={<motion.div {...pageTransition}><Contact /></motion.div>}
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useLenis();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ErrorBoundary>
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      <motion.div className="fixed left-0 top-0 z-[90] h-[2px] origin-left bg-offwhite" style={{ scaleX }} />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
      <CursorGlow />
      <motion.button
        className="fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/70 text-white shadow-soft backdrop-blur"
        initial={false}
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 20, pointerEvents: showTop ? 'auto' : 'none' }}
        whileHover={{ scale: 1.06 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </motion.button>
      <div className="fixed bottom-5 left-5 z-40 hidden items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-white/70 backdrop-blur md:flex">
        <Sparkles size={13} /> New drop live
      </div>
    </ErrorBoundary>
  );
}
