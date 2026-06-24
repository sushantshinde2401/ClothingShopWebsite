import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import Marquee from './Marquee.jsx';

const links = [
  ['New Arrivals', '/new-arrivals'],
  ['Shop', '/shop'],
  ['Oversized Tees', '/shop?category=Oversized%20T-shirts'],
  ['Baggy Jeans', '/shop?category=Baggy%20Jeans'],
  ['Cargo Pants', '/shop?category=Cargo%20Pants'],
  ['Hoodies', '/shop?category=Hoodies'],
  ['Lookbook', '/lookbook'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const textTone = isHome && !scrolled ? 'text-white' : 'text-ink';

  return (
    <header className="fixed left-0 right-0 top-0 z-[60]">
      <Marquee />
      <nav
        className={`transition-all duration-500 ${
          scrolled ? 'mx-3 mt-3 rounded-full border border-black/10 bg-offwhite/82 py-3 shadow-soft backdrop-blur-xl' : 'py-5'
        } ${textTone}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="text-xl font-black uppercase tracking-[0.12em]">
            Mad’ora
          </Link>
          <div className="hidden items-center gap-7 text-xs font-extrabold uppercase tracking-[0.16em] lg:flex">
            {links.map(([label, to]) => (
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to={to} key={to}>
                {label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden h-10 w-10 place-items-center rounded-full border border-current/15 sm:grid" aria-label="Search">
              <Search size={18} />
            </button>
            <Link className="relative grid h-10 w-10 place-items-center rounded-full border border-current/15" to="/wishlist" aria-label="Wishlist">
              <Heart size={18} />
              {wishCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[10px] text-offwhite">{wishCount}</span>}
            </Link>
            <Link className="relative grid h-10 w-10 place-items-center rounded-full border border-current/15" to="/cart" aria-label="Cart">
              <ShoppingBag size={18} />
              {count > 0 && <motion.span key={count} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[10px] text-offwhite">{count}</motion.span>}
            </Link>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-current/15 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={19} />
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.aside
            className="fixed inset-y-0 right-0 z-[80] w-[min(420px,88vw)] bg-ink p-6 text-offwhite shadow-soft"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-12 flex items-center justify-between">
              <span className="text-xl font-black uppercase tracking-[0.12em]">Mad’ora</span>
              <button className="grid h-10 w-10 place-items-center rounded-full border border-white/20" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={19} />
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {links.map(([label, to], index) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <NavLink className="text-3xl font-black uppercase tracking-tight" to={to}>
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
