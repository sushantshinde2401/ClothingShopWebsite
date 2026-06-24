import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { formatPrice } from '../data/products.js';
import { fadeUp, springPop } from '../utils/animations.js';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wished = isWishlisted(product.id);

  return (
    <motion.article
      className="product-card group relative"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.035 }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-stone">
        <Link to={`/product/${product.id}`} aria-label={product.name}>
          <img className="product-img-main h-full w-full object-cover transition duration-700" src={product.images[0]} alt={product.name} loading="lazy" />
          <img className="product-img-alt absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700" src={product.images[1] || product.images[0]} alt="" loading="lazy" />
        </Link>
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-offwhite px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-ink shadow-soft">
            {product.badge}
          </span>
        )}
        <motion.button
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-ink backdrop-blur"
          whileTap={{ scale: 0.86 }}
          animate={wished ? { scale: [1, 1.18, 1] } : {}}
          transition={springPop}
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
        >
          <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
        </motion.button>
        <button
          className="quick-add absolute inset-x-3 bottom-3 flex translate-y-5 items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-xs font-extrabold uppercase tracking-[0.18em] text-offwhite opacity-0 transition duration-300"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag size={16} /> Quick add
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Link to={`/product/${product.id}`} className="font-extrabold uppercase tracking-tight">{product.name}</Link>
          <p className="mt-1 text-sm text-black/55">{product.category}</p>
        </div>
        <div className="text-right">
          <p className="font-extrabold">{formatPrice(product.price)}</p>
          {product.oldPrice && <p className="text-xs text-black/40 line-through">{formatPrice(product.oldPrice)}</p>}
        </div>
      </div>
    </motion.article>
  );
}
