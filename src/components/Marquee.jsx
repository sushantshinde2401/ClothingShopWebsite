export default function Marquee() {
  const text = 'NEW DROP • FREE SHIPPING ABOVE ₹999 • MEN’S STREET ESSENTIALS • OVERSIZED FITS • BAGGY DENIM • CARGO PANTS • MAD’ORA •';
  return (
    <div className="marquee overflow-hidden bg-ink py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-offwhite">
      <div className="marquee-track flex w-max whitespace-nowrap">
        {Array.from({ length: 6 }).map((_, index) => (
          <span className="px-5" key={index}>{text}</span>
        ))}
      </div>
    </div>
  );
}
