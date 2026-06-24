import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, ShieldCheck, Truck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { formatPrice, products } from '../data/products.js';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id) || products[0];
  const [[imageIndex, direction], setImageIndex] = useState([0, 0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const related = useMemo(() => products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4), [product]);
  const activeImage = product.images[imageIndex] || product.images[0];
  const canSwipe = product.images.length > 1;

  useEffect(() => {
    setImageIndex([0, 0]);
    setSize(product.sizes[0]);
    setColor(product.colors[0]);
    setQty(1);
  }, [product]);

  const showImage = (nextIndex) => {
    const wrappedIndex = (nextIndex + product.images.length) % product.images.length;
    setImageIndex([wrappedIndex, nextIndex > imageIndex ? 1 : -1]);
  };

  const handleSwipe = (_, info) => {
    if (!canSwipe) return;
    if (info.offset.x < -80) showImage(imageIndex + 1);
    if (info.offset.x > 80) showImage(imageIndex - 1);
  };

  return (
    <div className="px-4 pb-24 pt-40 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden bg-stone">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={activeImage}
                className="absolute inset-0 h-full w-full cursor-grab object-cover active:cursor-grabbing"
                src={activeImage}
                alt={`${product.name} angle ${imageIndex + 1}`}
                custom={direction}
                initial={{ x: direction >= 0 ? '100%' : '-100%', opacity: 0.65 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction >= 0 ? '-100%' : '100%', opacity: 0.65 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                drag={canSwipe ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={handleSwipe}
              />
            </AnimatePresence>
            {canSwipe && (
              <>
                <button className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink shadow-soft backdrop-blur" onClick={() => showImage(imageIndex - 1)} aria-label="Previous image">
                  <ChevronLeft size={20} />
                </button>
                <button className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink shadow-soft backdrop-blur" onClick={() => showImage(imageIndex + 1)} aria-label="Next image">
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          {canSwipe && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {product.images.map((src, index) => (
                <button className={`aspect-square overflow-hidden border ${imageIndex === index ? 'border-ink' : 'border-black/10'}`} onClick={() => setImageIndex([index, index > imageIndex ? 1 : -1])} key={src} aria-label={`Show image ${index + 1}`}>
                  <img className="h-full w-full object-cover" src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-black/45">{product.category}</p>
          <h1 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">{product.name}</h1>
          <p className="mt-5 text-2xl font-black">{formatPrice(product.price)}</p>
          <p className="mt-5 max-w-xl leading-7 text-black/60">{product.description}</p>
          <div className="mt-8 space-y-6">
            <div><p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-black/45">Size</p><div className="flex flex-wrap gap-2">{product.sizes.map((item) => <button className={`grid h-11 min-w-11 place-items-center rounded-full border px-3 font-bold ${size === item ? 'border-ink bg-ink text-offwhite' : 'border-black/10'}`} onClick={() => setSize(item)} key={item}>{item}</button>)}</div></div>
            <div><p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-black/45">Color</p><div className="flex flex-wrap gap-2">{product.colors.map((item) => <button className={`rounded-full border px-4 py-2 text-sm font-bold ${color === item ? 'border-ink bg-ink text-offwhite' : 'border-black/10'}`} onClick={() => setColor(item)} key={item}>{item}</button>)}</div></div>
            <div><p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-black/45">Quantity</p><div className="inline-flex items-center rounded-full border border-black/10"><button className="grid h-11 w-11 place-items-center" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button><motion.span key={qty} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-10 text-center font-black">{qty}</motion.span><button className="grid h-11 w-11 place-items-center" onClick={() => setQty(qty + 1)}><Plus size={16} /></button></div></div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton onClick={() => Array.from({ length: qty }).forEach(() => addToCart(product, { size, color }))}>Add to cart</MagneticButton>
            <MagneticButton variant="ghost" onClick={() => toggleWishlist(product)} icon={false}><Heart size={17} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} /> Wishlist</MagneticButton>
          </div>
          <div className="mt-8 grid gap-3 border-t border-black/10 pt-6 text-sm text-black/60">
            <p className="flex items-center gap-2"><Truck size={17} /> Free shipping above ₹999</p>
            <p className="flex items-center gap-2"><ShieldCheck size={17} /> Easy exchange on eligible items</p>
          </div>
        </div>
      </div>
      {related.length > 0 && <div className="mx-auto mt-24 max-w-7xl"><h2 className="mb-8 text-4xl font-black uppercase">Related Fits</h2><div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">{related.map((item, index) => <ProductCard product={item} index={index} key={item.id} />)}</div></div>}
    </div>
  );
}
