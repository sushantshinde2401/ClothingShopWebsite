import { motion } from 'framer-motion';
import { about } from '../data/products.js';
import { clipReveal, fadeUp } from '../utils/animations.js';

export default function About() {
  return (
    <div className="px-4 pb-24 pt-40 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-black/45">{about.introSubtext}</p>
            <h1 className="text-6xl font-black uppercase leading-[0.9] tracking-tight sm:text-8xl">{about.introHeadline}</h1>
          </div>
          <motion.img variants={clipReveal} initial="hidden" animate="visible" className="h-[560px] w-full object-cover" src={about.heroImage} alt={about.heroImageAlt} />
        </div>
        <div className="mt-20 border-l border-black/15">
          {about.values.map((item, index) => (
            <motion.div className="relative grid gap-4 border-b border-black/10 py-10 pl-8 md:grid-cols-[220px_1fr]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={item.title}>
              <span className="absolute -left-[7px] top-11 h-3 w-3 rounded-full bg-ink" />
              <h2 className="text-2xl font-black uppercase">{item.title}</h2>
              <p className="max-w-3xl text-lg leading-8 text-black/60">{item.copy}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-20 grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.p className="text-4xl font-black uppercase leading-tight tracking-tight sm:text-6xl" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {about.brandStoryText}
          </motion.p>
          <motion.img variants={clipReveal} initial="hidden" animate="visible" className="h-[560px] w-full object-cover" src={about.brandStoryImage} alt={about.brandStoryImageAlt} />
        </div>
      </div>
    </div>
  );
}