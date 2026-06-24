import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data/products.js';

const categories = ['All', 'Oversized T-shirts', 'Baggy Jeans', 'Cargo Pants', 'Hoodies', 'Shirts', 'Joggers', 'Denim Jackets', 'Streetwear Co-ords', 'Casual Men’s Wear', 'Everyday Men’s Essentials'];
const sizes = ['S', 'M', 'L', 'XL', '28', '30', '32', '34'];
const colors = ['Black', 'White', 'Beige', 'Charcoal', 'Olive', 'Grey', 'Blue'];

function Filters({ category, setCategory, size, setSize, color, setColor, maxPrice, setMaxPrice }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-black/45">Category</p>
        <div className="grid gap-2">
          {categories.map((item) => (
            <button className={`rounded-full border px-4 py-2 text-left text-xs font-extrabold uppercase tracking-[0.14em] ${category === item ? 'border-ink bg-ink text-offwhite' : 'border-black/10'}`} onClick={() => setCategory(item)} key={item}>{item}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-black/45">Size</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((item) => <button className={`grid h-10 min-w-10 place-items-center rounded-full border text-sm font-bold ${size === item ? 'border-ink bg-ink text-offwhite' : 'border-black/10'}`} onClick={() => setSize(size === item ? 'All' : item)} key={item}>{item}</button>)}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-black/45">Color</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((item) => <button className={`rounded-full border px-3 py-2 text-xs font-bold ${color === item ? 'border-ink bg-ink text-offwhite' : 'border-black/10'}`} onClick={() => setColor(color === item ? 'All' : item)} key={item}>{item}</button>)}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-black/45">Max Price: ₹{maxPrice}</p>
        <input className="w-full accent-black" type="range" min="599" max="2000" step="100" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
      </div>
    </div>
  );
}

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : 'All');
  const [size, setSize] = useState('All');
  const [color, setColor] = useState('All');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const nextCategory = searchParams.get('category') || 'All';
    if (categories.includes(nextCategory)) setCategory(nextCategory);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const list = products
      .filter((p) => category === 'All' || p.category === category)
      .filter((p) => size === 'All' || p.sizes.includes(size))
      .filter((p) => color === 'All' || p.colors.includes(color))
      .filter((p) => p.price <= maxPrice)
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    return [...list].sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      if (sort === 'new') return (b.badge === 'NEW') - (a.badge === 'NEW');
      return 0;
    });
  }, [category, size, color, maxPrice, sort, search]);

  return (
    <div className="px-4 pb-24 pt-40 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-black/45">Shop Mad’ora</p>
            <h1 className="text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl">The Drop</h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input className="min-h-12 border border-black/10 bg-white/50 px-4 outline-none focus:border-ink" placeholder="Search product" value={search} onChange={(event) => setSearch(event.target.value)} />
            <select className="min-h-12 border border-black/10 bg-white/50 px-4 outline-none" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="new">New first</option>
              <option value="low">Price low to high</option>
              <option value="high">Price high to low</option>
            </select>
            <button className="flex min-h-12 items-center justify-center gap-2 bg-ink px-4 text-xs font-black uppercase tracking-[0.18em] text-offwhite lg:hidden" onClick={() => setDrawer(true)}><SlidersHorizontal size={16} /> Filters</button>
          </div>
        </div>
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <motion.aside className="hidden border-r border-black/10 pr-6 lg:block" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Filters category={category} setCategory={setCategory} size={size} setSize={setSize} color={color} setColor={setColor} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
          </motion.aside>
          <AnimatePresence mode="popLayout">
            {filtered.length ? (
              <motion.div layout className="grid gap-x-4 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}
              </motion.div>
            ) : (
              <motion.div className="grid min-h-[420px] place-items-center border border-black/10 bg-white/35 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div><h2 className="text-4xl font-black uppercase">No fits found</h2><p className="mt-2 text-black/55">Try changing filters or search.</p></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {drawer && (
          <motion.div className="fixed inset-0 z-[90] bg-black/40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-x-0 bottom-0 max-h-[86vh] overflow-auto rounded-t-3xl bg-offwhite p-5" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}>
              <div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-black uppercase">Filters</h2><button onClick={() => setDrawer(false)}><X /></button></div>
              <Filters category={category} setCategory={setCategory} size={size} setSize={setSize} color={color} setColor={setColor} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
