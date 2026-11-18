/**
 * Brew & Bloom — Centralized Sample Data
 * ---------------------------------------
 * Single source of truth for every product, category, promotion and store
 * shown on the website. All values are fictional demonstration data created
 * for a university rebrand case study (original brand analysed: Kopi Kenangan).
 *
 * NOTE: Nothing in this file represents a real product, price, discount or
 * store. Prices are in Indonesian Rupiah (IDR) for realistic localisation.
 */

'use strict';

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  {
    id: 'all',
    label: 'All',
    description: 'Everything on the Brew & Bloom menu',
    icon: 'grid'
  },
  {
    id: 'coffee',
    label: 'Coffee',
    description: 'Espresso-based drinks built on our house blend',
    icon: 'cup'
  },
  {
    id: 'non-coffee',
    label: 'Non-Coffee',
    description: 'Chocolate, tea and matcha for every kind of drinker',
    icon: 'leaf'
  },
  {
    id: 'signature',
    label: 'Signature',
    description: 'The recipes we are known for',
    icon: 'star'
  }
];

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

const PRODUCTS = [
  {
    id: 'bloom-espresso',
    name: 'Bloom Espresso',
    tagline: 'Double shot · caramel finish',
    category: 'signature',
    price: 28000,
    image: 'assets/images/drink-espresso.jpg',
    badge: 'Signature',
    featured: true,
    popular: true,
    rating: 4.8,
    reviews: 214,
    origin: 'Aceh & Toraja, Indonesia',
    roast: 'Medium-dark',
    brew: 'Espresso',
    caffeine: 'Medium-high',
    description:
      'Our house espresso pulled twice for depth, finished with a caramelised sugar syrup we make in-store every morning.',
    longDescription:
      'Bloom Espresso is the drink everything else is built on. We roast a seasonal blend of Gayo and Toraja beans in small batches, then pull a double shot that is deliberately a touch darker than typical so it can stand up to milk. The caramel syrup is cooked on-site each morning from raw sugar and pandan, which gives the cup a soft, rounded sweetness instead of the sharp burn of syrup bought in bulk. Drink it alone for the full flavour, or let us pour it over ice with a splash of milk for the version our regulars order most.',
    notes: ['Caramel', 'Dark chocolate', 'Pandan'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 28000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 32000 }
    ]
  },
  {
    id: 'brown-sugar-latte',
    name: 'Brown Sugar Signature Latte',
    tagline: 'Strawberry milk · house brûlé',
    category: 'signature',
    price: 34000,
    image: 'assets/images/drink-iced-coffee.jpg',
    badge: 'Best Seller',
    featured: true,
    popular: true,
    rating: 4.9,
    reviews: 486,
    origin: 'Aceh, Indonesia',
    roast: 'Medium',
    brew: 'Espresso + steamed milk',
    caffeine: 'Medium',
    description:
      'Creamy milk folded with slow-cooked brown sugar and a burnt-sugar crust you can hear when it hits the cup.',
    longDescription:
      'This is the drink that made Brew & Bloom. We cook brown sugar with a little butter until it turns into a dark, almost caramelised paste, then whip it into fresh milk until the texture turns glossy. The result is closer to a dessert than a coffee — deep, warm and not too sweet. On top we add our house espresso and a thin layer of brûléed sugar that cracks under the spoon. It is sweet, so ask for it half-sweet and the barista will halve the syrup without taking the character out of it.',
    notes: ['Brown sugar', 'Toffee', 'Cream'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 34000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 39000 }
    ]
  },
  {
    id: 'bloom-cold-brew-tonic',
    name: 'Bloom Cold Brew Tonic',
    tagline: '18-hour steep · tonic water',
    category: 'signature',
    price: 38000,
    image: 'assets/images/drink-cold-brew-tall.jpg',
    badge: 'New',
    featured: true,
    popular: true,
    rating: 4.7,
    reviews: 158,
    origin: 'Toraja, Indonesia',
    roast: 'Medium',
    brew: 'Cold brew',
    caffeine: 'High',
    description:
      'Slow-steeped cold brew cut with tonic water and a twist of orange for a sparkling, gently bitter finish.',
    longDescription:
      'We steep our cold brew for eighteen hours in cold-filtered water, which pulls out the chocolatey, low-acid notes of the Toraja beans without pulling bitterness out of the grounds. We serve it over a long clear ice cube, cut it with good tonic water, and finish with a wide strip of orange peel so the aroma lifts as you drink. It is the least sweet drink we make and the one most likely to convert a tea person.',
    notes: ['Citrus', 'Cocoa nib', 'Sparkling'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 38000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 43000 }
    ]
  },
  {
    id: 'cardamom-bloom',
    name: 'Cardamom Bloom',
    tagline: 'Arabica · cardamom cream',
    category: 'signature',
    price: 36000,
    image: 'assets/images/drink-pour-over.jpg',
    badge: 'Signature',
    featured: false,
    popular: true,
    rating: 4.6,
    reviews: 121,
    origin: 'Ethiopia Yirgacheffe',
    roast: 'Light',
    brew: 'Pour over',
    caffeine: 'Medium',
    description:
      'Floral single origin poured over cardamom-scented cream, inspired by the cardamom coffee common across Indonesia.',
    longDescription:
      'Cardamom is a flavour that most people already love in food but rarely meet in coffee. We grind Ethiopian Yirgacheffe — floral, tea-like, faintly bergamot — and pour it over a cream we infuse with green cardamom pods steeped overnight. The result tastes like the kopi susu everyone grew up with, but cleaner and more aromatic. Ask for the kettle version if you want the pour-over brewed to order rather than batch-brewed.',
    notes: ['Cardamom', 'Jasmine', 'Bergamot'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 36000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 41000 }
    ]
  },
  {
    id: 'single-origin-pour-over',
    name: 'Single Origin Pour Over',
    tagline: 'Rotating seasonal · brewed to order',
    category: 'coffee',
    price: 42000,
    image: 'assets/images/pour-over-v60.jpg',
    badge: 'Slow Bar',
    featured: false,
    popular: true,
    rating: 4.8,
    reviews: 97,
    origin: 'Rotating seasonal origin',
    roast: 'Light',
    brew: 'Pour over (V60)',
    caffeine: 'Medium',
    description:
      'A rotating single origin brewed by hand with a V60, chosen to show the character of the farm it came from.',
    longDescription:
      'Every fortnight our roaster picks a different farm and we build a small pour-over brew menu around it. The grind is coarser than you might expect and the water is poured in three slow pulses over a cone filter, so the cup stays bright and clean. We brew to order, which means a two-minute wait during busy hours. Ask the barista what is on the board today — they will happily talk about it for a while.',
    notes: ['Seasonal', 'Floral', 'Tea-like'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 42000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 47000 }
    ]
  },
  {
    id: 'classic-cappuccino',
    name: 'Classic Cappuccino',
    tagline: 'Velvet microfoam · cocoa dust',
    category: 'coffee',
    price: 30000,
    image: 'assets/images/drink-latte.jpg',
    badge: '',
    featured: true,
    popular: false,
    rating: 4.6,
    reviews: 203,
    origin: 'House blend',
    roast: 'Medium',
    brew: 'Espresso',
    caffeine: 'Medium',
    description:
      'Equal parts espresso, steamed milk and a cloud of fine microfoam, dusted with cocoa on the way to the table.',
    longDescription:
      'A cappuccino has very little room for error — too much milk and the coffee disappears, too little foam and it is a flat white. We aim for a 6:4:6 ratio and finish the milk at around 60°C so it tastes sweet rather than scalded. The foam is cut finer than most cafés use, which is what gives the surface that velvety, almost painted look.',
    notes: ['Cocoa', 'Hazelnut', 'Milk'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 30000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 35000 }
    ]
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    tagline: 'Ristretto base · silky milk',
    category: 'coffee',
    price: 32000,
    image: 'assets/images/drink-cafe.jpg',
    badge: '',
    featured: false,
    popular: true,
    rating: 4.7,
    reviews: 331,
    origin: 'House blend',
    roast: 'Medium',
    brew: 'Espresso',
    caffeine: 'Medium',
    description:
      'A double ristretto under a thin layer of glossy microfoam — stronger and drier than a latte.',
    longDescription:
      'The difference between a flat white and a latte is really about ratio and foam. We use a double ristretto, which concentrates the shot and lowers the perceived acidity, then add a small amount of properly textured milk with almost no visible foam on top. It should feel like drinking silk. If you like your coffee strong but not bitter, this is the cup to order.',
    notes: ['Chocolate', 'Almond', 'Brown sugar'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 32000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 37000 }
    ]
  },
  {
    id: 'cafe-mocha',
    name: 'Café Mocha',
    tagline: 'Single-origin cocoa · espresso',
    category: 'coffee',
    price: 34000,
    image: 'assets/images/drink-mocha.jpg',
    badge: '',
    featured: true,
    popular: false,
    rating: 4.5,
    reviews: 142,
    origin: 'House blend + Valrhona cocoa',
    roast: 'Medium',
    brew: 'Espresso',
    caffeine: 'Medium',
    description:
      'Espresso, real cocoa and steamed milk, finished with a light curl of whipped cream.',
    longDescription:
      'Most café mochas are cocoa-flavoured syrup and a lot of whipped cream. We use melted single-origin chocolate instead, so the cocoa reads as flavour rather than sugar, and we finish with only a small amount of lightly whipped cream so the drink still leads with coffee. Ask for it with cold milk in summer and it becomes closer to a chocolate smoothie.',
    notes: ['Dark chocolate', 'Roasted hazelnut', 'Cream'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 34000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 39000 }
    ]
  },
  {
    id: 'americano',
    name: 'Americano',
    tagline: 'Filter brew · hot or iced',
    category: 'coffee',
    price: 24000,
    image: 'assets/images/coffee-beans.jpg',
    badge: '',
    featured: false,
    popular: false,
    rating: 4.4,
    reviews: 176,
    origin: 'House blend',
    roast: 'Medium',
    brew: 'Filter',
    caffeine: 'High',
    description:
      'Filter brew cut with hot water — the simplest way to taste the coffee without anything added.',
    longDescription:
      'We batch-brew our house blend every morning and serve it with hot water, which is a more forgiving method than espresso and gives a rounder, less intense cup. It is the right order if you want to actually taste the coffee rather than the milk. We serve it hot in a ceramic mug and iced over a single large cube so it dilutes slowly.',
    notes: ['Toffee', 'Malt', 'Clean finish'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 24000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 28000 }
    ]
  },
  {
    id: 'dirty-espresso',
    name: 'Dirty Espresso',
    tagline: 'Espresso over cold milk',
    category: 'coffee',
    price: 33000,
    image: 'assets/images/drink-coffee-dark.jpg',
    badge: '',
    featured: false,
    popular: false,
    rating: 4.6,
    reviews: 88,
    origin: 'House blend',
    roast: 'Medium',
    brew: 'Espresso',
    caffeine: 'High',
    description:
      'A shot of hot espresso floated over cold milk so the two temperatures meet in the middle of the cup.',
    longDescription:
      'The name comes from the way the two layers mix — the espresso falls into the cold milk and streaks through it like marble. Order it and you will get a cup that starts hot and sharp and finishes cold and sweet. We pull the shot a little long to keep it from separating too fast. Very good with a small splash of brown sugar syrup.',
    notes: ['Milk', 'Molasses', 'Espresso'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 33000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 38000 }
    ]
  },
  {
    id: 'classic-cold-brew',
    name: 'Classic Cold Brew',
    tagline: '18-hour steep · black or milk',
    category: 'coffee',
    price: 33000,
    image: 'assets/images/drink-cold-brew.jpg',
    badge: '',
    featured: true,
    popular: true,
    rating: 4.8,
    reviews: 389,
    origin: 'Toraja, Indonesia',
    roast: 'Medium',
    brew: 'Cold brew',
    caffeine: 'High',
    description:
      'Our signature cold brew, served black or over milk, with the same slow-steep recipe used in the tonic.',
    longDescription:
      'Eighteen hours in cold water pulls the sweetness out of the Toraja beans while leaving the acidity behind. It is strong enough to stand up to milk without becoming heavy, and smooth enough to drink over a long afternoon. If you take it with milk, try a splash of the brown sugar syrup rather than sweetened milk — it keeps the body of the drink without dulling it.',
    notes: ['Cocoa', 'Molasses', 'Silky'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 33000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 38000 }
    ]
  },
  {
    id: 'vanilla-latte',
    name: 'Vanilla Bean Latte',
    tagline: 'Madagascar vanilla · steamed milk',
    category: 'coffee',
    price: 32000,
    image: 'assets/images/drink-cappuccino.jpg',
    badge: '',
    featured: false,
    popular: false,
    rating: 4.5,
    reviews: 194,
    origin: 'House blend',
    roast: 'Medium',
    brew: 'Espresso + steamed milk',
    caffeine: 'Medium',
    description:
      'House espresso with real Madagascar vanilla bean syrup and a cap of warm, lightly foamed milk.',
    longDescription:
      'We make our vanilla syrup by steeping split Madagascar vanilla beans in sugar water for a week, which gives a rounder, softer vanilla than extract. The milk is steamed to a light foam so the drink stays drinkable, and the whole thing is served with a light dusting of cinnamon if you ask. A dependable, crowd-pleasing cup for anyone who wants coffee without intensity.',
    notes: ['Vanilla', 'Caramel', 'Soft spice'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 32000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 37000 }
    ]
  },
  {
    id: 'matcha-bloom-latte',
    name: 'Matcha Bloom Latte',
    tagline: 'Ceremonial grade · oat milk',
    category: 'non-coffee',
    price: 36000,
    image: 'assets/images/drink-latte.jpg',
    badge: 'Caffeine Free',
    featured: true,
    popular: true,
    rating: 4.8,
    reviews: 262,
    origin: 'Uji, Japan',
    roast: 'Not roasted',
    brew: 'Whisked matcha',
    caffeine: 'None',
    description:
      'Ceremonial-grade matcha whisked to a smooth froth with barista oat milk and a touch of maple.',
    longDescription:
      'We use a ceremonial-grade Uji matcha, which is shaded before harvest and therefore greener and less bitter than culinary grade. It is sifted, whisked in a bamboo chasen, and blended with our own lightly sweetened oat milk. There is no caffeine in this cup, which makes it the drink we recommend for late afternoons and evenings.',
    notes: ['Grass', 'Sweet pea', 'Cream'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 36000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 41000 }
    ]
  },
  {
    id: 'belgian-chocolate',
    name: 'Belgian Chocolate',
    tagline: '70% dark · whipped cream',
    category: 'non-coffee',
    price: 34000,
    image: 'assets/images/drink-mocha.jpg',
    badge: '',
    featured: false,
    popular: true,
    rating: 4.7,
    reviews: 167,
    origin: 'Belgium',
    roast: 'Not roasted',
    brew: 'Steamed milk',
    caffeine: 'None',
    description:
      'Melted 70% dark chocolate folded into steamed milk, finished with lightly whipped cream.',
    longDescription:
      'Real chocolate, melted directly into the milk so there are no powdery pockets at the bottom of the cup. The 70% cocoa bar is bitter enough to balance the sweetness and gives the drink a deep, almost espresso-like body. It is the most dessert-like item on our menu and the one our pastry pairs with best.',
    notes: ['Dark chocolate', 'Toffee', 'Cream'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 34000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 39000 }
    ]
  },
  {
    id: 'iced-peach-tea',
    name: 'Iced Peach Tea',
    tagline: 'Black tea · peach · citrus',
    category: 'non-coffee',
    price: 28000,
    image: 'assets/images/drink-citrus.jpg',
    badge: 'Caffeine Free',
    featured: true,
    popular: false,
    rating: 4.5,
    reviews: 104,
    origin: 'Ceylon black tea',
    roast: 'Not roasted',
    brew: 'Cold steep',
    caffeine: 'None',
    description:
      'Cold-brewed black tea with real peach purée and a squeeze of lemon over ice.',
    longDescription:
      'We cold-steep Ceylon black tea for six hours so it is smooth and never bitter, then blend it with a purée made from peaches rather than a syrup flavoured with peach. The lemon is squeezed to order, which keeps the finish sharp enough to cut through the fruit. Best on a hot afternoon; it does not sweeten itself, so add a little honey if you need it.',
    notes: ['Peach', 'Citrus', 'Tannin-light'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 28000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 32000 }
    ]
  },
  {
    id: 'masala-chai',
    name: 'Masala Chai Latte',
    tagline: 'Cardamom · ginger · clove',
    category: 'non-coffee',
    price: 30000,
    image: 'assets/images/coffee-spice.jpg',
    badge: 'Caffeine Free',
    featured: false,
    popular: false,
    rating: 4.6,
    reviews: 139,
    origin: 'Assam & spice blend',
    roast: 'Not roasted',
    brew: 'Simmered spice base',
    caffeine: 'None',
    description:
      'A slow-simmered chai base of Assam tea, cardamom, ginger and clove, blended with steamed milk.',
    longDescription:
      'We simmer the spices and black tea together in-house so the base is genuinely spiced rather than sweet tea with a hint of cardamom. It takes about four hours and we make a big batch every morning. The result is warming, properly spiced and gently caffeine-free, which makes it the drink our afternoon regulars order by default.',
    notes: ['Cardamom', 'Clove', 'Ginger'],
    sizes: [
      { id: 'regular', label: 'Regular', volume: '12 oz', price: 30000 },
      { id: 'large', label: 'Large', volume: '16 oz', price: 35000 }
    ]
  }
];
/* ------------------------------------------------------------------ */
/* Promotions — SAMPLE DATA ONLY                                      */
/* These are fictional offers invented for this UI/UX case study.       */
/* They are not real discounts from Kopi Kenangan or any other brand.  */
/* ------------------------------------------------------------------ */

const PROMOTIONS = [
  {
    id: 'promo-bloom-hour',
    title: 'Bloom Hour',
    tagline: '25% off every signature drink',
    description:
      'Every weekday between 15:00 and 17:00, our signature range is 25% off. The quietest hours of the day are the sweetest hours to sit in — claim this one and settle in with a book.',
    code: 'BLOOM25',
    discount: '25%',
    badge: 'Sample offer',
    expiry: '2026-12-31',
    expiryLabel: 'Valid until 31 December 2026',
    image: 'assets/images/drink-cold-brew-tall.jpg',
    appliesTo: ['signature'],
    productIds: ['brown-sugar-latte', 'bloom-cold-brew-tonic', 'bloom-espresso'],
    accent: 'caramel'
  },
  {
    id: 'promo-first-sip',
    title: 'First Sip',
    tagline: 'Buy one regular, get one for the price of a small',
    description:
      'A gentle introduction for new visitors: order any regular size and the small is on us. Pair it with the Cardamom Bloom if you have never had us before — it is the easiest place to start.',
    code: 'FIRSTSIP',
    discount: '1 for 1',
    badge: 'Sample offer',
    expiry: '2026-11-30',
    expiryLabel: 'Valid until 30 November 2026',
    image: 'assets/images/drink-latte.jpg',
    appliesTo: ['coffee', 'signature'],
    productIds: ['cardamom-bloom', 'classic-cappuccino', 'flat-white'],
    accent: 'sage'
  },
  {
    id: 'promo-caffeine-calm',
    title: 'Caffeine Calm',
    tagline: 'Free size upgrade on all caffeine-free drinks',
    description:
      'After 18:00, any caffeine-free drink is upgraded to our large size at no extra cost. Matcha Bloom, Belgian Chocolate, Iced Peach Tea and Masala Chai all qualify.',
    code: 'CALM',
    discount: 'Free upgrade',
    badge: 'Sample offer',
    expiry: '2026-10-15',
    expiryLabel: 'Valid until 15 October 2026',
    image: 'assets/images/drink-latte.jpg',
    appliesTo: ['non-coffee'],
    productIds: ['matcha-bloom-latte', 'belgian-chocolate', 'iced-peach-tea', 'masala-chai'],
    accent: 'sage'
  },
  {
    id: 'promo-bean-community',
    title: 'Bean Community',
    tagline: 'Bring a friend, both get Rp10.000 off',
    description:
      'Coffee is better shared. Bring someone new to Brew & Bloom and you will each receive Rp10.000 off any single drink — proof of a second cup is all we ask for.',
    code: 'TOGETHER',
    discount: 'Rp10.000 off',
    badge: 'Sample offer',
    expiry: '2026-12-15',
    expiryLabel: 'Valid until 15 December 2026',
    image: 'assets/images/drink-cafe.jpg',
    appliesTo: ['all'],
    productIds: ['classic-cold-brew', 'brown-sugar-latte', 'vanilla-latte'],
    accent: 'espresso'
  }
];
/* ------------------------------------------------------------------ */
/* Stores — SAMPLE DATA ONLY                                          */
/* Addresses and opening hours are fictional demonstration records.    */
/* They do not represent real Brew & Bloom or Kopi Kenangan outlets.   */
/* ------------------------------------------------------------------ */

const STORE_AREAS = ['All Areas', 'Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Utara', 'Bandung', 'Surabaya'];

const STORES = [
  {
    id: 'store-bloom-senayan',
    name: 'Brew & Bloom Senayan',
    area: 'Jakarta Selatan',
    address: 'Jl. Senopati No. 12, Kebayoran Baru, Jakarta Selatan',
    city: 'Jakarta Selatan',
    hours: [
      { day: 'Monday – Thursday', open: '07:00 – 21:00' },
      { day: 'Friday – Saturday', open: '07:00 – 23:00' },
      { day: 'Sunday', open: '08:00 – 21:00' }
    ],
    features: ['Slow bar', 'Work-friendly', 'Indoor seating'],
    phone: '+62 21 5000 0001',
    image: 'assets/images/cafe-window.jpg'
  },
  {
    id: 'store-bloom-sudirman',
    name: 'Brew & Bloom Sudirman',
    area: 'Jakarta Pusat',
    address: 'Jl. Jend. Sudirman Kav. 5, Jakarta Pusat',
    city: 'Jakarta Pusat',
    hours: [
      { day: 'Monday – Friday', open: '07:30 – 20:00' },
      { day: 'Saturday – Sunday', open: '08:00 – 20:00' }
    ],
    features: ['Pour-over bar', 'Indoor seating', 'Wheelchair access'],
    phone: '+62 21 5000 0002',
    image: 'assets/images/cafe-interior-empty.jpg'
  },
  {
    id: 'store-bloom-kemang',
    name: 'Brew & Bloom Kemang',
    area: 'Jakarta Selatan',
    address: 'Jl. Kemang Raya No. 8, Jakarta Selatan',
    city: 'Jakarta Selatan',
    hours: [
      { day: 'Monday – Thursday', open: '08:00 – 22:00' },
      { day: 'Friday – Sunday', open: '08:00 – 23:00' }
    ],
    features: ['Roastery view', 'Patio', 'Work-friendly'],
    phone: '+62 21 5000 0003',
    image: 'assets/images/cafe-chalkboard.jpg'
  },
  {
    id: 'store-bloom-pluit',
    name: 'Brew & Bloom Pluit',
    area: 'Jakarta Utara',
    address: 'Jl. Pluit Karang No. 21, Jakarta Utara',
    city: 'Jakarta Utara',
    hours: [
      { day: 'Monday – Friday', open: '07:00 – 21:00' },
      { day: 'Saturday – Sunday', open: '07:00 – 22:00' }
    ],
    features: ['Outdoor seating', 'Parking', 'Takeaway'],
    phone: '+62 21 5000 0004',
    image: 'assets/images/shopfront.jpg'
  },
  {
    id: 'store-bloom-bandung',
    name: 'Brew & Bloom Braga',
    area: 'Bandung',
    address: 'Jl. Braga No. 45, Bandung, Jawa Barat',
    city: 'Bandung',
    hours: [
      { day: 'Monday – Thursday', open: '09:00 – 21:00' },
      { day: 'Friday – Saturday', open: '09:00 – 23:00' },
      { day: 'Sunday', open: '10:00 – 21:00' }
    ],
    features: ['Slow bar', 'Study space', 'Outdoor seating'],
    phone: '+62 22 5000 0005',
    image: 'assets/images/cafe-interior-sign.jpg'
  },
  {
    id: 'store-bloom-surabaya',
    name: 'Brew & Bloom Tunjungan',
    area: 'Surabaya',
    address: 'Jl. Tunjungan No. 60, Surabaya, Jawa Timur',
    city: 'Surabaya',
    hours: [
      { day: 'Monday – Friday', open: '08:00 – 21:00' },
      { day: 'Saturday – Sunday', open: '08:00 – 22:00' }
    ],
    features: ['Indoor seating', 'Wheelchair access', 'Takeaway'],
    phone: '+62 31 5000 0006',
    image: 'assets/images/cafe-interior.jpg'
  }
];
/* ------------------------------------------------------------------ */
/* Brand / site content                                                */
/* ------------------------------------------------------------------ */

const BRAND = {
  name: 'Brew & Bloom',
  tagline: 'Coffee that grows on people',
  description:
    'Brew & Bloom is a proposed visual identity for a neighbourhood coffee concept — warm, modern and rooted in Indonesian coffee culture.',
  email: 'hello@brewandbloom.demo',
  phone: '+62 21 5000 0000',
  address: 'Jl. Senopati No. 12, Kebayoran Baru, Jakarta Selatan',
  hours: 'Every day, 07:00 – 23:00',
  social: [
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'TikTok', href: '#', icon: 'tiktok' },
    { label: 'Facebook', href: '#', icon: 'facebook' },
    { label: 'X', href: '#', icon: 'x' }
  ]
};

const BRAND_VALUES = [
  {
    id: 'value-craft',
    title: 'Craft over speed',
    text: 'We slow down where it counts. Syrups are cooked each morning, cold brew steeps for eighteen hours, and no cup leaves the bar until the foam is right.',
    icon: 'sparkle'
  },
  {
    id: 'value-origin',
    title: 'Origin in the cup',
    text: 'Every coffee we serve names the farm it came from. If we cannot tell you where a bean grew, we do not put it on the menu.',
    icon: 'leaf'
  },
  {
    id: 'value-welcome',
    title: 'Room for everyone',
    text: 'A caffeine-free matcha, a strong espresso, a slow afternoon — the counter is open to whatever mood you arrive in.',
    icon: 'heart'
  },
  {
    id: 'value-local',
    title: 'Grown here',
    text: 'We work with Indonesian growers first. Our brown sugar, pandan and palm sugar come from local suppliers who we know by name.',
    icon: 'seed'
  }
];

const CATEGORY_HIGHLIGHTS = [
  {
    id: 'coffee',
    title: 'Coffee',
    text: 'Espresso-based drinks built on a seasonal blend of Gayo and Toraja beans.',
    image: 'assets/images/drink-espresso.jpg'
  },
  {
    id: 'non-coffee',
    title: 'Non-Coffee',
    text: 'Matcha, chocolate, chai and cold-steeped tea for every kind of drinker.',
    image: 'assets/images/drink-latte.jpg'
  },
  {
    id: 'signature',
    title: 'Signature',
    text: 'The recipes we are known for, from the brown sugar latte to the cold brew tonic.',
    image: 'assets/images/drink-cold-brew-tall.jpg'
  }
];
