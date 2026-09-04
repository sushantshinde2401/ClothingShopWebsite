import { Mail, MoveUpRight } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { footer } from '../data/products.js';

export default function Footer() {
  return (
    <footer className="bg-ink px-4 py-14 text-offwhite sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-8 border-b border-white/12 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-white/45">{footer.brandTagline}</p>
            <h2 className="max-w-3xl text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl">
              Mad'ora moves with the city.
            </h2>
          </div>
          <Link to="/shop" className="group inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.2em]">
            Shop the drop <MoveUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={18} />
          </Link>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="mb-4 text-2xl font-black uppercase tracking-[0.12em]">Mad'ora</div>
            <p className="text-sm leading-6 text-white/55">{footer.brandDescription}</p>
          </div>
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-white/45">{column.title}</h3>
              <div className="flex flex-col gap-3 text-sm font-semibold text-white/75">
                {column.items.map((item) => (
                  <a className="nav-link w-max" href="#" key={item}>{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/12 pt-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>{footer.copyright}</span>
          <span className="flex items-center gap-5"><SiInstagram size={15} /> {footer.instagram} <Mail size={15} /> {footer.email}</span>
        </div>
      </div>
    </footer>
  );
}