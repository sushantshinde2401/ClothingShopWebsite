import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import MagneticButton from '../components/MagneticButton.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../data/products.js';

export default function Cart() {
  const { items, subtotal, updateQty, removeFromCart } = useCart();
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 99;

  return (
    <div className="px-4 pb-24 pt-40 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl">Cart</h1>
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-3">
            <AnimatePresence>
              {items.length ? items.map((item) => (
                <motion.div layout initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="grid gap-4 border border-black/10 bg-white/40 p-3 sm:grid-cols-[110px_1fr_auto]" key={item.key}>
                  <img className="aspect-square h-28 w-28 object-cover" src={item.images[0]} alt={item.name} />
                  <div><h2 className="font-black uppercase">{item.name}</h2><p className="mt-1 text-sm text-black/55">{item.size} / {item.color}</p><p className="mt-3 font-black">{formatPrice(item.price)}</p></div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-between">
                    <button onClick={() => removeFromCart(item.key)} aria-label="Remove"><Trash2 size={18} /></button>
                    <div className="inline-flex items-center rounded-full border border-black/10"><button className="grid h-9 w-9 place-items-center" onClick={() => updateQty(item.key, item.quantity - 1)}><Minus size={14} /></button><motion.span key={item.quantity} className="w-8 text-center font-black">{item.quantity}</motion.span><button className="grid h-9 w-9 place-items-center" onClick={() => updateQty(item.key, item.quantity + 1)}><Plus size={14} /></button></div>
                  </div>
                </motion.div>
              )) : <motion.div className="grid min-h-[360px] place-items-center border border-black/10 bg-white/35 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div><h2 className="text-4xl font-black uppercase">Cart is empty</h2><p className="mt-2 text-black/55">Add a fit from the shop.</p></div></motion.div>}
            </AnimatePresence>
          </div>
          <aside className="h-max bg-ink p-6 text-offwhite lg:sticky lg:top-32">
            <h2 className="mb-6 text-3xl font-black uppercase">Order Summary</h2>
            <div className="space-y-3 border-b border-white/12 pb-5 text-sm"><p className="flex justify-between"><span>Subtotal</span><b>{formatPrice(subtotal)}</b></p><p className="flex justify-between"><span>Shipping</span><b>{shipping ? formatPrice(shipping) : 'Free'}</b></p></div>
            <p className="mt-5 flex justify-between text-xl font-black"><span>Total</span><span>{formatPrice(subtotal + shipping)}</span></p>
            <MagneticButton variant="light" className="mt-7 w-full">Checkout</MagneticButton>
          </aside>
        </div>
      </div>
    </div>
  );
}
