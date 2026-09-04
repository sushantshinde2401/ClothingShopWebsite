const productModules = import.meta.glob('../../content/products/*.json', { eager: true, import: 'default' });
const categoryModules = import.meta.glob('../../content/categories/*.json', { eager: true, import: 'default' });
const collectionModules = import.meta.glob('../../content/collections/*.json', { eager: true, import: 'default' });
const homepageModules = import.meta.glob('../../content/settings/homepage.json', { eager: true, import: 'default' });
const moodModules = import.meta.glob('../../content/moods/*.json', { eager: true, import: 'default' });
const editorialImageModules = import.meta.glob('../../content/editorial-images/*.json', { eager: true, import: 'default' });
const aboutModules = import.meta.glob('../../content/settings/about.json', { eager: true, import: 'default' });
const contactModules = import.meta.glob('../../content/settings/contact.json', { eager: true, import: 'default' });
const navigationModules = import.meta.glob('../../content/settings/navigation.json', { eager: true, import: 'default' });
const footerModules = import.meta.glob('../../content/settings/footer.json', { eager: true, import: 'default' });

const byDisplayOrder = (a, b) => Number(a.displayOrder || 999) - Number(b.displayOrder || 999);

const normalizeProduct = (product) => ({
  ...product,
  id: product.slug,
  price: Number(product.price || 0),
  oldPrice: product.oldPrice ? Number(product.oldPrice) : undefined,
  stock: Number(product.stock || 0),
  images: product.images?.length ? product.images : [],
  sizes: product.sizes?.length ? product.sizes : [],
  colors: product.colors?.length ? product.colors : [],
  tags: product.tags || [],
});

export const products = Object.values(productModules)
  .map(normalizeProduct)
  .sort(byDisplayOrder);

export const categoryRecords = Object.values(categoryModules).sort(byDisplayOrder);

export const categories = ['All', ...categoryRecords.map((category) => category.title)];

export const collections = Object.values(collectionModules)
  .filter((collection) => collection.featured !== false)
  .sort(byDisplayOrder);

export const homepage = Object.values(homepageModules)[0] || {
  hero: {
    image: '',
    alt: 'Mad\'ora men\'s streetwear editorial',
    lines: ['MEN\'S', 'STREETWEAR', 'FOR THE NEW', 'GENERATION'],
    subtitle: 'Oversized fits, baggy denim, and everyday essentials made for bold self-expression.',
    primaryButtonLabel: 'Shop New Drop',
    primaryButtonUrl: '/new-arrivals',
    secondaryButtonLabel: 'Explore Fits',
    secondaryButtonUrl: '/lookbook',
  },
  featuredCollectionsEyebrow: 'Featured Collections',
  featuredCollectionsTitle: 'Men\'s Drop Categories',
};

export const moods = Object.values(moodModules)
  .filter((mood) => mood.featured !== false)
  .sort(byDisplayOrder);

export const editorialImages = Object.values(editorialImageModules)
  .filter((img) => img.featured !== false)
  .sort(byDisplayOrder);

export const about = Object.values(aboutModules)[0] || {
  heroImage: '',
  heroImageAlt: 'Mad\'ora men\'s streetwear about',
  introHeadline: 'Built For India\'s New Generation',
  introSubtext: 'About Mad\'ora',
  brandStoryImage: '',
  brandStoryImageAlt: 'Mad\'ora men\'s streetwear brand story',
  brandStoryText: 'Mad\'ora is built for the new generation of men \u2014 streetwear that blends comfort, trend, affordability, and individuality.',
  values: [
    { title: 'Brand Intro', copy: 'Mad\'ora is a modern men\'s streetwear clothing brand focused on delivering oversized fits, baggy denim, stylish basics, and everyday essentials for the new generation.' },
    { title: 'Mission', copy: 'Deliver high-quality men\'s streetwear and stylish everyday fashion at accessible prices.' },
    { title: 'Vision', copy: 'To build a trusted and recognizable men\'s fashion brand in India.' },
    { title: 'USP', copy: 'Premium men\'s streetwear plus stylish everyday fashion for Gen Z.' },
    { title: 'Future Goals', copy: 'Build stronger drops, smarter fits, and a recognizable men\'s streetwear identity.' },
  ],
};

export const contact = Object.values(contactModules)[0] || {
  headline: 'Talk To The Drop Team',
  subtext: 'Contact',
  email: 'hello@madora.in',
  phone: '+91 90000 00000',
  address: 'Store information coming soon',
  instagram: '@MADORAOFFICIAL',
  faqs: [
    { question: 'What is the shipping time?', answer: 'Our team will update this section as operations go live.' },
    { question: 'Do you offer exchanges?', answer: 'Our team will update this section as operations go live.' },
    { question: 'How do I choose my size?', answer: 'Our team will update this section as operations go live.' },
    { question: 'When is the next drop?', answer: 'Our team will update this section as operations go live.' },
  ],
};

export const navigation = Object.values(navigationModules)[0] || {
  links: [
    { label: 'New Arrivals', url: '/new-arrivals' },
    { label: 'Shop', url: '/shop' },
    { label: 'Oversized Tees', url: '/shop?category=Oversized%20T-shirts' },
    { label: 'Baggy Jeans', url: '/shop?category=Baggy%20Jeans' },
    { label: 'Cargo Pants', url: '/shop?category=Cargo%20Pants' },
    { label: 'Hoodies', url: '/shop?category=Hoodies' },
    { label: 'Lookbook', url: '/lookbook' },
  ],
};

export const footer = Object.values(footerModules)[0] || {
  brandTagline: 'New Gen Streetwear',
  brandDescription: 'Premium men\'s streetwear, stylish basics, and affordable everyday fits for India\'s new generation.',
  copyright: '\u00a9 2026 Mad\'ora. All rights reserved.',
  instagram: '@MADORAOFFICIAL',
  email: 'hello@madora.in',
  columns: [
    { title: 'Shop', items: ['Oversized Tees', 'Baggy Denim', 'Cargo Pants', 'Hoodies'] },
    { title: 'Brand', items: ['About', 'Lookbook', 'New Drops', 'Careers'] },
    { title: 'Help', items: ['Contact', 'Shipping', 'Returns', 'Size Guide'] },
    { title: 'Social', items: ['Instagram', 'YouTube', 'Threads', 'Pinterest'] },
  ],
};

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);