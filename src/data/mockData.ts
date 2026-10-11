import { Property, LocalityInfo, TourBooking, InquiryMessage, AppUser } from '../types';

// Helper to generate crisp architectural SVG artwork for reliable, fast rendering
export function createArchitecturalSvg(title: string, style: 'villa' | 'penthouse' | 'townhouse' | 'loft' | 'garden' | 'coastal'): string {
  const palettes = {
    villa: { bg: '#0f172a', sky: '#1e293b', bldg: '#f8fafc', glass: '#38bdf8', accent: '#f59e0b', ground: '#1e3a1e' },
    penthouse: { bg: '#18181b', sky: '#27272a', bldg: '#e4e4e7', glass: '#60a5fa', accent: '#fbbf24', ground: '#141416' },
    townhouse: { bg: '#292524', sky: '#44403c', bldg: '#d97706', glass: '#fef08a', accent: '#f87171', ground: '#1c1917' },
    loft: { bg: '#1c1917', sky: '#292524', bldg: '#78716c', glass: '#93c5fd', accent: '#fb923c', ground: '#0c0a09' },
    garden: { bg: '#064e3b', sky: '#065f46', bldg: '#f1f5f9', glass: '#6ee7b7', accent: '#fbbf24', ground: '#022c22' },
    coastal: { bg: '#0c4a6e', sky: '#0369a1', bldg: '#ffffff', glass: '#7dd3fc', accent: '#fde047', ground: '#075985' }
  };
  const p = palettes[style];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
    <defs>
      <linearGradient id="skyGrad-${style}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${p.sky}" />
        <stop offset="100%" stop-color="${p.bg}" />
      </linearGradient>
      <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="${p.accent}" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#skyGrad-${style})" />
    <circle cx="680" cy="110" r="60" fill="url(#sunGrad)" />
    <!-- Landscape Horizon -->
    <path d="M0,360 Q200,320 450,350 T800,340 L800,500 L0,500 Z" fill="${p.ground}" />
    <!-- Architecture Structure -->
    <g transform="translate(140, 160)">
      <!-- Main Building Block -->
      <rect x="50" y="70" width="380" height="190" fill="${p.bldg}" rx="2" />
      <rect x="240" y="20" width="220" height="130" fill="${p.bldg}" opacity="0.95" rx="2" />
      <rect x="0" y="110" width="170" height="150" fill="${p.bldg}" opacity="0.9" rx="2" />
      <!-- Roof overhang / architectural canopy -->
      <line x1="30" y1="70" x2="450" y2="70" stroke="#0f172a" stroke-width="5" />
      <line x1="220" y1="20" x2="480" y2="20" stroke="#0f172a" stroke-width="5" />
      <!-- Window Grids & Glass Facades -->
      <rect x="70" y="90" width="70" height="70" fill="${p.glass}" opacity="0.8" rx="2"/>
      <rect x="160" y="90" width="60" height="130" fill="${p.glass}" opacity="0.7" rx="2"/>
      <rect x="260" y="40" width="80" height="60" fill="${p.glass}" opacity="0.85" rx="2"/>
      <rect x="360" y="40" width="75" height="90" fill="${p.glass}" opacity="0.8" rx="2"/>
      <!-- Ambient room glow -->
      <circle cx="100" cy="120" r="15" fill="${p.accent}" opacity="0.6"/>
      <circle cx="300" cy="65" r="12" fill="${p.accent}" opacity="0.6"/>
      <circle cx="190" cy="140" r="18" fill="${p.accent}" opacity="0.5"/>
      <!-- Modern entry door -->
      <rect x="250" y="180" width="40" height="80" fill="#1e293b" rx="1"/>
      <rect x="282" y="220" width="4" height="4" fill="${p.accent}" />
      <!-- Terrace Deck / Balcony railing -->
      <line x1="240" y1="120" x2="460" y2="120" stroke="#64748b" stroke-width="2" />
      <line x1="260" y1="120" x2="260" y2="140" stroke="#64748b" stroke-width="1.5" />
      <line x1="320" y1="120" x2="320" y2="140" stroke="#64748b" stroke-width="1.5" />
      <line x1="380" y1="120" x2="380" y2="140" stroke="#64748b" stroke-width="1.5" />
      <line x1="440" y1="120" x2="440" y2="140" stroke="#64748b" stroke-width="1.5" />
      <!-- Foreground trees & vegetation -->
      <path d="M-30,260 Q-20,180 -10,260 Z" fill="#047857" opacity="0.8" />
      <path d="M470,260 Q485,170 500,260 Z" fill="#047857" opacity="0.8" />
      <path d="M510,260 Q525,190 540,260 Z" fill="#065f46" opacity="0.9" />
    </g>
    <!-- Pool / Reflection or Paved Driveway -->
    <polygon points="120,440 680,440 620,480 180,480" fill="${p.glass}" opacity="0.25" />
    <!-- Architectural Title Stamp -->
    <rect x="24" y="446" width="340" height="34" rx="4" fill="rgba(15, 23, 42, 0.75)" />
    <text x="36" y="468" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="600" fill="#ffffff" letter-spacing="0.5">${title}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-101',
    title: 'The Highland Horizon Villa',
    purpose: 'Sale',
    propertyType: 'Villa',
    price: 1850000,
    locality: 'West Hills Heights',
    address: '428 Highland Crest Parkway',
    city: 'Metro City',
    zipCode: '90210',
    bedrooms: 5,
    bathrooms: 4,
    areaSqFt: 4650,
    yearBuilt: 2023,
    featured: true,
    verified: true,
    status: 'Active',
    description: 'An architectural statement perched above West Hills with unobstructed mountain vistas. Designed with high ceilings, imported Italian oak flooring, full smart-home automated lighting, and an infinity-edge heated pool overlooking the valley.',
    amenities: ['Infinity Pool', 'Smart Home System', 'Floor-to-Ceiling Glass', 'Double Garage', 'Wine Cellar', 'Solar Panels', 'Private Garden', 'EV Charging'],
    images: [
      createArchitecturalSvg('The Highland Horizon Villa - Main View', 'villa'),
      createArchitecturalSvg('Panoramic Valley Terrace & Pool', 'coastal'),
      createArchitecturalSvg('Master Bedroom Suite & Dressing Room', 'penthouse')
    ],
    coordinates: { lat: 34.0522, lng: -118.2437 },
    landlord: {
      id: 'usr-agent-01',
      name: 'Elena Rostova',
      phone: '+1 (555) 234-8901',
      email: 'elena.rostova@prestigerealty.com',
      verified: true,
      role: 'Licensed Agent',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      responseTime: 'Under 15 minutes'
    },
    localityData: {
      walkScore: 78,
      transitScore: 82,
      safetyScore: 94,
      nearbySchools: 'Oakwood Preparatory (0.4 mi), St. Jude Academy (1.2 mi)',
      nearestTransit: 'Highland Red Line Station (0.6 mi)'
    },
    dateListed: '2026-09-28'
  },
  {
    id: 'prop-102',
    title: 'Cobblestone Mews Townhouse',
    purpose: 'Rent',
    propertyType: 'Townhouse',
    price: 3600,
    period: 'month',
    locality: 'Old Town Heritage',
    address: '17 St. Andrew Passage',
    city: 'Metro City',
    zipCode: '90214',
    bedrooms: 3,
    bathrooms: 2,
    areaSqFt: 1820,
    yearBuilt: 2021,
    featured: true,
    verified: true,
    status: 'Active',
    description: 'A bespoke modern restoration of classic brick masonry with high-performance soundproofing, private rear patio garden, chef kitchen with custom brass fittings, and private basement storage.',
    amenities: ['Private Patio Garden', 'Hardwood Flooring', 'Air Conditioning', 'Pet Friendly', 'In-Unit Washer & Dryer', 'Storage Locker', 'High-Speed Fiber'],
    images: [
      createArchitecturalSvg('Cobblestone Mews Townhouse - Facade', 'townhouse'),
      createArchitecturalSvg('Private Rear Courtyard Garden', 'garden'),
      createArchitecturalSvg('Bespoke Chef Kitchen & Dining', 'loft')
    ],
    coordinates: { lat: 34.0588, lng: -118.2512 },
    landlord: {
      id: 'usr-owner-02',
      name: 'Marcus Vance',
      phone: '+1 (555) 345-6712',
      email: 'marcus.vance@properties.io',
      verified: true,
      role: 'Owner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      responseTime: 'Within 1 hour'
    },
    localityData: {
      walkScore: 92,
      transitScore: 95,
      safetyScore: 90,
      nearbySchools: 'Heritage Magnet High (0.3 mi), Elm Street Elementary (0.5 mi)',
      nearestTransit: 'Market Square Metro Hub (0.2 mi)'
    },
    dateListed: '2026-10-02'
  },
  {
    id: 'prop-103',
    title: 'Skyline Lumina Penthouse',
    purpose: 'Sale',
    propertyType: 'Penthouse',
    price: 2450000,
    locality: 'Financial District',
    address: '880 Grand Central Tower, 38th Fl',
    city: 'Metro City',
    zipCode: '90211',
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 3800,
    yearBuilt: 2024,
    featured: true,
    verified: true,
    status: 'Active',
    description: 'Crown jewel of Grand Central Tower. Features 360-degree glass curtain walls, wrap-around private terrace, dual private elevator access, 24/7 concierge, spa facilities, and secure valet parking.',
    amenities: ['Wrap-Around Terrace', '24/7 Concierge', 'Private Elevator', 'Valet Parking', 'Indoor Lap Pool', 'Fitness Club', 'Fireplace', 'Sub-Zero Appliances'],
    images: [
      createArchitecturalSvg('Skyline Lumina Penthouse - Salon', 'penthouse'),
      createArchitecturalSvg('38th Floor Wraparound Sunset Terrace', 'coastal'),
      createArchitecturalSvg('Marble Primary Bath & Sauna', 'villa')
    ],
    coordinates: { lat: 34.0495, lng: -118.2560 },
    landlord: {
      id: 'usr-agent-01',
      name: 'Elena Rostova',
      phone: '+1 (555) 234-8901',
      email: 'elena.rostova@prestigerealty.com',
      verified: true,
      role: 'Licensed Agent',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      responseTime: 'Under 15 minutes'
    },
    localityData: {
      walkScore: 96,
      transitScore: 98,
      safetyScore: 88,
      nearbySchools: 'Downtown Collegiate Academy (0.8 mi)',
      nearestTransit: 'Grand Central Central Terminal (0.1 mi)'
    },
    dateListed: '2026-09-15'
  },
  {
    id: 'prop-104',
    title: 'Nordic Light Urban Studio',
    purpose: 'Rent',
    propertyType: 'Studio',
    price: 1850,
    period: 'month',
    locality: 'Arts District',
    address: '210 Factory Row, Loft 4B',
    city: 'Metro City',
    zipCode: '90213',
    bedrooms: 1,
    bathrooms: 1,
    areaSqFt: 680,
    yearBuilt: 2022,
    featured: false,
    verified: true,
    status: 'Active',
    description: 'Bright open-concept living with 11-foot concrete ceilings, polished terrazzo floors, custom birch millwork, integrated foldaway workspace, and energy-efficient climate control.',
    amenities: ['High Ceilings', 'Bike Storage Room', 'Furnished Option', 'Pet Friendly', 'Keyless Electronic Entry', 'Rooftop Lounge'],
    images: [
      createArchitecturalSvg('Nordic Light Urban Studio', 'loft'),
      createArchitecturalSvg('Minimalist Work Nook & Kitchenette', 'townhouse')
    ],
    coordinates: { lat: 34.0438, lng: -118.2325 },
    landlord: {
      id: 'usr-owner-03',
      name: 'David K. Chen',
      phone: '+1 (555) 890-1234',
      email: 'david.chen@urbanstudios.com',
      verified: true,
      role: 'Property Manager',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      responseTime: 'Under 30 minutes'
    },
    localityData: {
      walkScore: 94,
      transitScore: 89,
      safetyScore: 85,
      nearbySchools: 'Arts District Institute (0.2 mi)',
      nearestTransit: 'Traction Ave Tram Stop (0.1 mi)'
    },
    dateListed: '2026-10-05'
  },
  {
    id: 'prop-105',
    title: 'Coastal Marina View Apartment',
    purpose: 'Rent',
    propertyType: 'Apartment',
    price: 2950,
    period: 'month',
    locality: 'Harbor Point',
    address: '55 Ocean Breeze Quay, Apt 804',
    city: 'Metro City',
    zipCode: '90215',
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1250,
    yearBuilt: 2023,
    featured: true,
    verified: true,
    status: 'Active',
    description: 'Direct harbor views with floor-to-ceiling glass doors opening onto an oversized sun balcony. Includes assigned underground parking space, residents gymnasium, and direct boardwalk access.',
    amenities: ['Ocean & Harbor View', 'Balcony', 'Covered Parking', 'Gymnasium', 'Air Conditioning', 'Dishwasher', 'Concierge Service'],
    images: [
      createArchitecturalSvg('Coastal Marina View - Waterfront', 'coastal'),
      createArchitecturalSvg('Sunset Balcony Dining', 'villa')
    ],
    coordinates: { lat: 34.0250, lng: -118.2800 },
    landlord: {
      id: 'usr-agent-01',
      name: 'Elena Rostova',
      phone: '+1 (555) 234-8901',
      email: 'elena.rostova@prestigerealty.com',
      verified: true,
      role: 'Licensed Agent',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      responseTime: 'Under 15 minutes'
    },
    localityData: {
      walkScore: 85,
      transitScore: 80,
      safetyScore: 92,
      nearbySchools: 'Harbor Gateway Charter (1.0 mi)',
      nearestTransit: 'Marina Pier Ferry & Bus (0.3 mi)'
    },
    dateListed: '2026-10-07'
  },
  {
    id: 'prop-106',
    title: 'Serenity Grove Family Estate',
    purpose: 'Sale',
    propertyType: 'House',
    price: 1290000,
    locality: 'West Hills Heights',
    address: '912 Whispering Pines Road',
    city: 'Metro City',
    zipCode: '90210',
    bedrooms: 4,
    bathrooms: 3,
    areaSqFt: 3400,
    yearBuilt: 2020,
    featured: false,
    verified: true,
    status: 'Active',
    description: 'Set on a quarter-acre manicured lot with mature cedar trees, outdoor kitchen pergola, 2-car garage with workshop, and an open layout ideal for multigenerational families.',
    amenities: ['Private Garden', 'Outdoor BBQ Kitchen', 'Double Garage', 'Fireplace', 'Walk-in Closets', 'Sprinkler System', 'Home Office'],
    images: [
      createArchitecturalSvg('Serenity Grove Family Estate', 'garden'),
      createArchitecturalSvg('Landscaped Backyard & Pergola', 'villa')
    ],
    coordinates: { lat: 34.0610, lng: -118.2410 },
    landlord: {
      id: 'usr-owner-02',
      name: 'Marcus Vance',
      phone: '+1 (555) 345-6712',
      email: 'marcus.vance@properties.io',
      verified: true,
      role: 'Owner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      responseTime: 'Within 1 hour'
    },
    localityData: {
      walkScore: 72,
      transitScore: 75,
      safetyScore: 96,
      nearbySchools: 'West Hills Elementary (0.3 mi), Valley High (0.9 mi)',
      nearestTransit: 'Pine Crest Bus Express (0.4 mi)'
    },
    dateListed: '2026-09-18'
  },
  {
    id: 'prop-107',
    title: 'The Ironworks Industrial Loft',
    purpose: 'Rent',
    propertyType: 'Apartment',
    price: 2400,
    period: 'month',
    locality: 'Arts District',
    address: '744 Cast Foundry Lane, Apt 2C',
    city: 'Metro City',
    zipCode: '90213',
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1450,
    yearBuilt: 2019,
    featured: false,
    verified: true,
    status: 'Active',
    description: 'Authentic timber beams, exposed brickwork, and blackened steel finishes in a converted historic steel works. Includes expansive kitchen island and dedicated freight elevator access.',
    amenities: ['Exposed Brick', 'High Ceilings', 'Freight Elevator Access', 'In-Unit Washer & Dryer', 'Central HVAC', 'Covered Parking'],
    images: [
      createArchitecturalSvg('The Ironworks Industrial Loft', 'loft'),
      createArchitecturalSvg('Kitchen Island & Brick Dining Area', 'townhouse')
    ],
    coordinates: { lat: 34.0412, lng: -118.2380 },
    landlord: {
      id: 'usr-owner-03',
      name: 'David K. Chen',
      phone: '+1 (555) 890-1234',
      email: 'david.chen@urbanstudios.com',
      verified: true,
      role: 'Property Manager',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      responseTime: 'Under 30 minutes'
    },
    localityData: {
      walkScore: 91,
      transitScore: 88,
      safetyScore: 84,
      nearbySchools: 'Creative Arts Academy (0.4 mi)',
      nearestTransit: 'East Yard Rail Stop (0.2 mi)'
    },
    dateListed: '2026-10-09'
  },
  {
    id: 'prop-108',
    title: 'Parkside Modern Duplex',
    purpose: 'Sale',
    propertyType: 'House',
    price: 890000,
    locality: 'Old Town Heritage',
    address: '315 Green Meadows Boulevard',
    city: 'Metro City',
    zipCode: '90214',
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2150,
    yearBuilt: 2022,
    featured: true,
    verified: true,
    status: 'Active',
    description: 'Directly bordering Green Meadows Public Park, this modern duplex features passive solar insulation, private rooftop deck, ground-floor home office suite, and gated driveway.',
    amenities: ['Rooftop Terrace', 'Park Views', 'Gated Driveway', 'Solar Energy', 'Modern Kitchen', 'Energy Star Rated'],
    images: [
      createArchitecturalSvg('Parkside Modern Duplex', 'garden'),
      createArchitecturalSvg('Rooftop Deck Overlooking Park', 'penthouse')
    ],
    coordinates: { lat: 34.0620, lng: -118.2480 },
    landlord: {
      id: 'usr-agent-01',
      name: 'Elena Rostova',
      phone: '+1 (555) 234-8901',
      email: 'elena.rostova@prestigerealty.com',
      verified: true,
      role: 'Licensed Agent',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      responseTime: 'Under 15 minutes'
    },
    localityData: {
      walkScore: 89,
      transitScore: 91,
      safetyScore: 93,
      nearbySchools: 'Heritage Primary School (0.2 mi)',
      nearestTransit: 'Meadows Park Station (0.3 mi)'
    },
    dateListed: '2026-10-04'
  }
];

export const INITIAL_LOCALITIES: LocalityInfo[] = [
  {
    id: 'loc-west-hills',
    name: 'West Hills Heights',
    city: 'Metro City',
    overview: 'Serene elevated hillside neighborhood recognized for scenic views, luxury villas, premier private academies, and low traffic volume.',
    avgRentMonthly: 4200,
    avgSaleSqFt: 580,
    walkScore: 78,
    transitScore: 82,
    safetyScore: 95,
    listingsCount: 24,
    highlights: ['Panoramic Vistas', 'Top Rated Schools', 'High Privacy', 'Cul-de-sac Enclaves'],
    image: createArchitecturalSvg('West Hills Heights Overview', 'villa')
  },
  {
    id: 'loc-old-town',
    name: 'Old Town Heritage',
    city: 'Metro City',
    overview: 'Historic district with cobblestone lanes, brick architecture, artisan coffee shops, boutique groceries, and leafy pedestrian promenades.',
    avgRentMonthly: 3300,
    avgSaleSqFt: 510,
    walkScore: 92,
    transitScore: 94,
    safetyScore: 91,
    listingsCount: 38,
    highlights: ['Historic Charm', 'Walkable Bakeries', 'Farmers Market', 'Metro Hub Access'],
    image: createArchitecturalSvg('Old Town Heritage Overview', 'townhouse')
  },
  {
    id: 'loc-financial',
    name: 'Financial District',
    city: 'Metro City',
    overview: 'High-energy urban core packed with glass towers, corporate headquarters, world-class dining, rooftop lounges, and seamless transit links.',
    avgRentMonthly: 3900,
    avgSaleSqFt: 690,
    walkScore: 98,
    transitScore: 99,
    safetyScore: 88,
    listingsCount: 52,
    highlights: ['Luxury Penthouses', '24/7 Dining', 'Direct Subway Hub', 'Skyline Terraces'],
    image: createArchitecturalSvg('Financial District Overview', 'penthouse')
  },
  {
    id: 'loc-arts-district',
    name: 'Arts District',
    city: 'Metro City',
    overview: 'Dynamic creative hub known for converted industrial lofts, indie design studios, contemporary galleries, and craft breweries.',
    avgRentMonthly: 2450,
    avgSaleSqFt: 460,
    walkScore: 93,
    transitScore: 90,
    safetyScore: 86,
    listingsCount: 31,
    highlights: ['Industrial Lofts', 'Art Galleries', 'Creative Workspaces', 'Vibrant Nightlife'],
    image: createArchitecturalSvg('Arts District Overview', 'loft')
  },
  {
    id: 'loc-harbor-point',
    name: 'Harbor Point',
    city: 'Metro City',
    overview: 'Scenic coastal enclave featuring waterfront promenade, marina berths, seafood bistros, and breezy oceanfront apartments.',
    avgRentMonthly: 3100,
    avgSaleSqFt: 540,
    walkScore: 86,
    transitScore: 82,
    safetyScore: 93,
    listingsCount: 19,
    highlights: ['Harbor Boardwalk', 'Yacht Marina', 'Ocean Breezes', 'Seafood Bistros'],
    image: createArchitecturalSvg('Harbor Point Overview', 'coastal')
  }
];

export const INITIAL_BOOKINGS: TourBooking[] = [
  {
    id: 'bk-201',
    propertyId: 'prop-102',
    propertyTitle: 'Cobblestone Mews Townhouse',
    propertyAddress: '17 St. Andrew Passage',
    propertyPrice: 3600,
    propertyImage: createArchitecturalSvg('Cobblestone Mews', 'townhouse'),
    userName: 'Peter Kharpran',
    userEmail: 'peterkharpran@gmail.com',
    userPhone: '+1 (555) 789-0123',
    date: '2026-10-15',
    timeSlot: '14:00 - 14:45',
    tourType: 'In-person',
    status: 'Confirmed',
    notes: 'Interested in a November 1st lease start. Has 1 friendly golden retriever.',
    createdAt: '2026-10-10'
  },
  {
    id: 'bk-202',
    propertyId: 'prop-101',
    propertyTitle: 'The Highland Horizon Villa',
    propertyAddress: '428 Highland Crest Parkway',
    propertyPrice: 1850000,
    propertyImage: createArchitecturalSvg('Highland Horizon', 'villa'),
    userName: 'Peter Kharpran',
    userEmail: 'peterkharpran@gmail.com',
    userPhone: '+1 (555) 789-0123',
    date: '2026-10-18',
    timeSlot: '10:30 - 11:15',
    tourType: 'Virtual Video Walk',
    status: 'Pending',
    notes: 'Pre-approved buyer requesting full solar battery warranty review.',
    createdAt: '2026-10-11'
  }
];

export const INITIAL_INQUIRIES: InquiryMessage[] = [
  {
    id: 'inq-301',
    propertyId: 'prop-102',
    propertyTitle: 'Cobblestone Mews Townhouse',
    senderName: 'Peter Kharpran',
    senderEmail: 'peterkharpran@gmail.com',
    senderPhone: '+1 (555) 789-0123',
    message: 'Hello! Is the rear patio fully enclosed, and are two medium pets allowed with standard pet deposit?',
    moveInDate: '2026-11-01',
    isRead: true,
    createdAt: '2026-10-10 14:22',
    reply: 'Hi Peter! Yes, the rear patio is fully enclosed with 6ft cedar fencing. We welcome well-behaved pets with a refundable $300 deposit.'
  },
  {
    id: 'inq-302',
    propertyId: 'prop-105',
    propertyTitle: 'Coastal Marina View Apartment',
    senderName: 'Sarah Jenkins',
    senderEmail: 's.jenkins@designer.net',
    senderPhone: '+1 (555) 654-9812',
    message: 'Does the monthly rent cover high-speed internet and the garage space?',
    moveInDate: '2026-10-25',
    isRead: false,
    createdAt: '2026-10-11 08:45'
  }
];

export const CURRENT_USER: AppUser = {
  id: 'usr-client-01',
  name: 'Peter Kharpran',
  email: 'peterkharpran@gmail.com',
  phone: '+1 (555) 789-0123',
  role: 'Tenant / Buyer',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  verified: true,
  memberSince: 'March 2025'
};
