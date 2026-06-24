import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data/products.js';

export default function NewArrivals() {
  const arrivals = products.filter((product) => product.badge === 'NEW' || product.badge === 'LIMITED');

  return (
    <div className="px-4 pb-24 pt-40 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-black/45">Fresh silhouettes</p>
          <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.9] tracking-tight sm:text-8xl">New Arrivals For The Next Move</h1>
        </div>
        <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {arrivals.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}
        </div>
      </div>
    </div>
  );
}
