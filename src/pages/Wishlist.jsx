import ProductCard from '../components/ProductCard.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function Wishlist() {
  const { items } = useWishlist();

  return (
    <div className="px-4 pb-24 pt-40 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl">Wishlist</h1>
        {items.length ? <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">{items.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}</div> : <div className="grid min-h-[420px] place-items-center border border-black/10 bg-white/35 text-center"><div><h2 className="text-4xl font-black uppercase">Nothing saved yet</h2><p className="mt-2 text-black/55">Tap the heart on a product to build your list.</p></div></div>}
      </div>
    </div>
  );
}
