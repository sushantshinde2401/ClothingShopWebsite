import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';
import MagneticButton from '../components/MagneticButton.jsx';
import { fadeUp } from '../utils/animations.js';

const faqs = ['What is the shipping time?', 'Do you offer exchanges?', 'How do I choose my size?', 'When is the next drop?'];

export default function Contact() {
  return (
    <div className="px-4 pb-24 pt-40 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-black/45">Contact</p>
          <h1 className="text-6xl font-black uppercase leading-[0.9] tracking-tight sm:text-8xl">Talk To The Drop Team</h1>
          <div className="mt-10 space-y-4 text-black/65">
            <p className="flex items-center gap-3"><Mail size={18} /> hello@madora.in</p>
            <p className="flex items-center gap-3"><Phone size={18} /> +91 90000 00000</p>
            <p className="flex items-center gap-3"><MapPin size={18} /> Store information coming soon</p>
            <p className="flex items-center gap-3"><SiInstagram size={18} /> @MADORAOFFICIAL</p>
          </div>
        </div>
        <motion.form className="grid gap-4 bg-ink p-5 text-offwhite sm:p-8" variants={fadeUp} initial="hidden" animate="visible">
          {['Name', 'Email', 'Subject'].map((field) => <input className="min-h-12 border border-white/15 bg-white/5 px-4 outline-none transition focus:border-white" placeholder={field} key={field} />)}
          <textarea className="min-h-36 border border-white/15 bg-white/5 px-4 py-3 outline-none transition focus:border-white" placeholder="Message" />
          <MagneticButton variant="light" type="submit">Send message</MagneticButton>
        </motion.form>
      </div>
      <div className="mx-auto mt-20 max-w-7xl">
        <h2 className="mb-6 text-4xl font-black uppercase">FAQ</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {faqs.map((faq, index) => <motion.div className="border border-black/10 bg-white/35 p-5" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={faq}><p className="text-xs font-black uppercase tracking-[0.22em] text-black/35">0{index + 1}</p><h3 className="mt-3 text-xl font-black uppercase">{faq}</h3><p className="mt-2 text-sm text-black/55">Our team will update this section as operations go live.</p></motion.div>)}
        </div>
      </div>
    </div>
  );
}
