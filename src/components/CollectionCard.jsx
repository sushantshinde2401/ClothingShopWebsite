import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clipReveal } from '../utils/animations.js';

export default function CollectionCard({ collection, index }) {
  return (
    <motion.div
      variants={clipReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -8, rotate: index % 2 ? -0.8 : 0.8 }}
      className="group relative min-h-[430px] overflow-hidden bg-charcoal text-white"
    >
      <img className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" src={collection.image} alt={collection.title} loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/12 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-white/60">Collection 0{index + 1}</p>
        <h3 className="text-4xl font-black uppercase tracking-tight">{collection.title}</h3>
        <p className="mt-2 max-w-xs text-sm text-white/70">{collection.subtitle}</p>
        <Link to="/shop" className="mt-5 inline-flex translate-y-3 items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Explore <ArrowUpRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
