import { motion } from 'framer-motion';
import { editorialImages } from '../data/products.js';
import { clipReveal, fadeUp } from '../utils/animations.js';

export default function Lookbook() {
  const images = editorialImages;

  return (
    <div className="bg-ink text-offwhite">
      <section className="min-h-screen px-4 pt-44 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-white/45">Editorial</motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" className="max-w-6xl text-7xl font-black uppercase leading-[0.82] tracking-tight sm:text-[11rem]">Mens Everyday Movement</motion.h1>
          <motion.img variants={clipReveal} initial="hidden" animate="visible" className="mt-10 h-[56vh] w-full object-cover" src={images[0]?.image || ''} alt="Mad'ora men's lookbook" />
        </div>
      </section>
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-5">
          {images.slice(1).map((image, index) => (
            <motion.div className={`${index % 3 === 0 ? 'md:col-span-3' : 'md:col-span-2'} overflow-hidden bg-charcoal`} variants={clipReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} key={image.slug || index}>
              <img className="h-[560px] w-full object-cover transition duration-700 hover:scale-105" src={image.image} alt={image.alt || image.title} loading="lazy" />
            </motion.div>
          ))}
        </div>
      </section>
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-7xl border-t border-white/12 pt-10">
          <h2 className="text-5xl font-black uppercase leading-none sm:text-8xl">Street confidence. Baggy volume. Sharp men\u2019s basics.</h2>
        </div>
      </section>
    </div>
  );
}