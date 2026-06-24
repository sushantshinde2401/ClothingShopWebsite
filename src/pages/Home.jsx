import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import AnimatedSection from '../components/AnimatedSection.jsx';
import CollectionCard from '../components/CollectionCard.jsx';
import MagneticButton from '../components/MagneticButton.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { collections, editorialImages, moods, products } from '../data/products.js';
import { clipReveal, fadeUp, staggerParent } from '../utils/animations.js';

gsap.registerPlugin(ScrollTrigger);

const heroImage = editorialImages.hero;
const lookImages = [
  editorialImages.studioSet,
  editorialImages.denimJacket,
  editorialImages.cargo,
];

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.35]);
  const lines = ['MEN’S', 'STREETWEAR', 'FOR THE NEW', 'GENERATION'];

  return (
    <section ref={ref} className="grain relative min-h-screen overflow-hidden bg-ink text-white">
      <motion.img className="absolute inset-0 h-full w-full object-cover" style={{ scale }} src={heroImage} alt="Mad'ora men's streetwear editorial" />
      <div className="absolute inset-0 bg-black/55" />
      <motion.div className="absolute inset-x-0 bottom-0 top-0 mx-auto flex max-w-7xl items-center px-4 pt-32 sm:px-6" style={{ opacity }}>
        <div className="relative z-10 max-w-5xl">
          <motion.div variants={staggerParent} initial="hidden" animate="visible">
            {lines.map((line) => (
              <div className="overflow-hidden" key={line}>
                <motion.h1
                  className="text-[14vw] font-black uppercase leading-[0.78] tracking-tight sm:text-[11vw] lg:text-[8rem]"
                  variants={{ hidden: { y: '110%' }, visible: { y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } } }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </motion.div>
          <motion.p className="mt-6 max-w-xl text-lg font-medium text-white/78 sm:text-2xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}>
            Oversized fits, baggy denim, and everyday essentials made for bold self-expression.
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap gap-3" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
            <MagneticButton to="/new-arrivals" variant="light">Shop New Drop</MagneticButton>
            <MagneticButton to="/lookbook" variant="ghost" className="text-white">Explore Fits</MagneticButton>
          </motion.div>
        </div>
      </motion.div>
      <motion.div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-white/70" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
}

function OutfitBuilder() {
  const [top, setTop] = useState('Oversized Tee');
  const [bottom, setBottom] = useState('Baggy Jeans');
  const tops = ['Oversized Tee', 'Graphic Tee', 'Hoodie'];
  const bottoms = ['Baggy Jeans', 'Cargo Pants', 'Joggers'];

  return (
    <AnimatedSection className="bg-ink px-4 py-20 text-offwhite sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.15fr_1fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-white/45">Interactive</p>
          <h2 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">Build Your Fit</h2>
          <p className="mt-5 max-w-sm text-white/60">Pick a top, lock a bottom, and complete the everyday men’s streetwear uniform.</p>
        </div>
        <motion.div key={`${top}-${bottom}`} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden bg-offwhite text-ink shadow-soft">
          <img className="h-full w-full object-cover" src={products.find((p) => p.name.includes(top.split(' ')[0]))?.images[0] || products[0].images[0]} alt="" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/60">Preview</p>
            <h3 className="mt-1 text-3xl font-black uppercase">{top} + {bottom}</h3>
          </div>
        </motion.div>
        <div className="space-y-7">
          {[['Top', tops, top, setTop], ['Bottom', bottoms, bottom, setBottom]].map(([label, options, value, setValue]) => (
            <div key={label}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-white/45">{label}</p>
              <div className="grid gap-2">
                {options.map((option) => (
                  <button
                    className={`rounded-full border px-4 py-3 text-left text-sm font-extrabold uppercase tracking-[0.14em] transition ${value === option ? 'border-offwhite bg-offwhite text-ink shadow-soft' : 'border-white/15 text-white/70 hover:border-white/50'}`}
                    onClick={() => setValue(option)}
                    key={option}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <MagneticButton to="/shop" variant="light">Complete the fit</MagneticButton>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Home() {
  const heroGsap = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gsap-fade').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 36 }, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        });
      });
      gsap.to('.brand-bg', {
        backgroundColor: '#ded7c9',
        scrollTrigger: { trigger: '.brand-bg', start: 'top 60%', end: 'bottom 35%', scrub: true },
      });
    }, heroGsap);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroGsap}>
      <Hero />
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-black/45">Featured Collections</p>
              <h2 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">Men’s Drop Categories</h2>
            </div>
            <MagneticButton to="/shop">Shop all</MagneticButton>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {collections.map((collection, index) => <CollectionCard collection={collection} index={index} key={collection.title} />)}
          </div>
        </div>
      </section>
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-black/45">Trending Now</p>
              <h2 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">Made To Move</h2>
            </div>
          </div>
          <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}
          </div>
        </div>
      </section>
      <AnimatedSection className="overflow-hidden px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">Shop By Mood</h2>
            <Play size={28} />
          </div>
          <div className="soft-scrollbar flex gap-4 overflow-x-auto pb-4">
            {moods.map((mood) => (
              <motion.div whileHover={{ y: -8 }} className={`min-h-72 min-w-[280px] p-6 transition lg:min-w-[360px] ${mood.tone}`} key={mood.title}>
                <div className="mb-20 inline-grid h-12 w-12 place-items-center rounded-full border border-current/20 text-sm font-black">{mood.icon}</div>
                <h3 className="text-4xl font-black uppercase">{mood.title}</h3>
                <p className="mt-3 text-sm opacity-65">{mood.copy}</p>
                <MagneticButton to="/shop" variant="ghost" className="mt-6">Enter mood</MagneticButton>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      <OutfitBuilder />
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="gsap-fade">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-black/45">Lookbook</p>
            <h2 className="text-6xl font-black uppercase leading-[0.88] tracking-tight sm:text-8xl">Drop 01 Street Confidence</h2>
            <p className="mt-6 max-w-md text-black/60">Everyday movement, oversized tees, cargo volume, and denim that feels editorial without trying too hard.</p>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {lookImages.map((image, index) => (
              <motion.div className={`${index === 1 ? 'col-span-3 mt-16' : 'col-span-2'} overflow-hidden bg-stone`} variants={clipReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} key={image}>
                <img className="h-full min-h-[360px] w-full object-cover transition duration-700 hover:scale-105" src={image} alt="" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="brand-bg px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <motion.p className="text-4xl font-black uppercase leading-tight tracking-tight sm:text-6xl" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Mad’ora is built for the new generation of men — streetwear that blends comfort, trend, affordability, and individuality.
          </motion.p>
          <motion.img className="min-h-[520px] w-full object-cover" variants={clipReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} src={editorialImages.blackDenim} alt="Mad'ora men's brand story" loading="lazy" />
        </div>
      </section>
      <section className="bg-charcoal px-4 py-24 text-offwhite sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-white/45">@MADORAOFFICIAL</p>
            <h2 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">Follow The Drop</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {products.slice(0, 8).map((product, index) => (
              <motion.div className="group relative aspect-square overflow-hidden bg-ink" variants={clipReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} key={product.id}>
                <img className="h-full w-full object-cover transition duration-500 group-hover:scale-110" src={product.images[index % 2]} alt="" loading="lazy" />
                <div className="absolute inset-0 grid place-items-center bg-black/50 text-xs font-black uppercase tracking-[0.2em] opacity-0 transition group-hover:opacity-100">View fit</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <AnimatedSection className="bg-offwhite px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-4xl border border-black/10 bg-white/45 p-7 shadow-soft backdrop-blur md:p-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-black/45">Join The Drop</p>
          <h2 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">Early Access Only</h2>
          <p className="mt-4 max-w-xl text-black/60">Get early access to new arrivals, limited drops, and exclusive Mad’ora offers.</p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input className="min-h-12 flex-1 border border-black/10 bg-offwhite px-4 outline-none transition focus:border-ink focus:shadow-soft" placeholder="Email address" type="email" />
            <MagneticButton type="submit">Join the drop</MagneticButton>
          </form>
        </div>
      </AnimatedSection>
    </div>
  );
}
