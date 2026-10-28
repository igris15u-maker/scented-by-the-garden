export interface BotanicalIngredient {
  id: string;
  name: string;
  latinName: string;
  region: string;
  scentProfile: string;
  character: string;
  extractionMethod: string;
  foundIn: string[];
  image: string;
  description: string;
}

export const BOTANICAL_INGREDIENTS: BotanicalIngredient[] = [
  {
    id: 'sambac-jasmine',
    name: 'Sambac Jasmine',
    latinName: 'Jasminum sambac',
    region: 'Madurai, Tamil Nadu, India',
    scentProfile: 'Indolic, sweet, radiant, narcotic white floral',
    character: 'Heart Note · Sensual & Opulent',
    extractionMethod: 'Gentle enfleurage and organic alcohol solvent extraction',
    foundIn: ['Jasmine Whisper', 'Citrus Garden'],
    image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=800&auto=format&fit=crop',
    description: 'Harvested strictly during the darkest hours of night to capture the flower at peak volatile aromatic concentration before sunlight dissipates its fragile floral oils.',
  },
  {
    id: 'mysore-sandalwood',
    name: 'Aged Mysore Sandalwood',
    latinName: 'Santalum album',
    region: 'Karnataka & Southern Highlands',
    scentProfile: 'Creamy, warm, velvety, buttery wood with powdery undertones',
    character: 'Base Note · Grounding & Meditative',
    extractionMethod: 'Slow steam distillation of matured heartwood',
    foundIn: ['Sandalwood Serenity', 'Jasmine Whisper', 'Forest Bloom'],
    image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop',
    description: 'Renowned globally for its unparalleled depth. Our sandalwood is ethically managed and aged to mature its santalol content, providing a lingering foundation.',
  },
  {
    id: 'damask-rose',
    name: 'Crimson Damask Rose',
    latinName: 'Rosa damascena',
    region: 'Valley of Roses & Kannauj',
    scentProfile: 'Deep, honeyed, velvety petal with spicy undertones',
    character: 'Heart Note · Noble & Magnetic',
    extractionMethod: 'Traditional hydro-distillation in copper alembics',
    foundIn: ['Rosewood Essence'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    description: 'Each drop of rose absolute requires tens of thousands of freshly handpicked petals, capturing the velvety petal texture and noble elegance of classic perfumery.',
  },
  {
    id: 'provence-lavender',
    name: 'Wild High-Plateau Lavender',
    latinName: 'Lavandula angustifolia',
    region: 'Plateau de Valensole, France',
    scentProfile: 'Crisp, herbaceous, soothing, slightly camphorous, honeyed dry-down',
    character: 'Top to Heart · Serene & Atmospheric',
    extractionMethod: 'Gentle low-pressure steam distillation',
    foundIn: ['Lavender Dusk'],
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=800&auto=format&fit=crop',
    description: 'Grown above 900 meters elevation where harsh winters and dry alpine sunlight produce essential oils with remarkably refined floral finesse and lower camphor sharpness.',
  },
  {
    id: 'sicilian-blood-orange',
    name: 'Sicilian Blood Orange & Bergamot',
    latinName: 'Citrus sinensis & Citrus bergamia',
    region: 'Calabria & Mount Etna slopes, Italy',
    scentProfile: 'Zesty, sparkling, juicy red flesh with bittersweet botanical peel',
    character: 'Top Note · Luminous & Exhilarating',
    extractionMethod: 'Cold-pressed artisan rind extraction',
    foundIn: ['Citrus Garden', 'Forest Bloom'],
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=800&auto=format&fit=crop',
    description: 'Volcanic soils yield citrus fruits with unmatched vitality and complexity, balancing sparkling brightness with subtle red-fruit sweetness that awakens the senses.',
  },
  {
    id: 'himalayan-cedar',
    name: 'Himalayan Cedar & Mountain Fern',
    latinName: 'Cedrus deodara & Dryopteris filix-mas',
    region: 'Western Himalayas',
    scentProfile: 'Dry balsamic, damp moss, green botanical foliage, resinous pine',
    character: 'Base & Atmosphere · Wild & Fresh',
    extractionMethod: 'Steam fraction distillation and co-extracts',
    foundIn: ['Forest Bloom', 'Rosewood Essence'],
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop',
    description: 'Evoking the serene silence of alpine forests. Cedarwood provides a stately architectural spine to fragrances, softened by the dewy coolness of wild mountain ferns.',
  },
];
