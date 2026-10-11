export type PropertyType = 'Apartment' | 'House' | 'Villa' | 'Townhouse' | 'Studio' | 'Commercial' | 'Penthouse';
export type ListingPurpose = 'Rent' | 'Sale';
export type ListingStatus = 'Active' | 'Pending Review' | 'Rented' | 'Sold';

export interface Property {
  id: string;
  title: string;
  purpose: ListingPurpose;
  propertyType: PropertyType;
  price: number;
  period?: 'month' | 'year'; // for rentals
  locality: string;
  address: string;
  city: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  yearBuilt: number;
  featured: boolean;
  verified: boolean;
  status: ListingStatus;
  description: string;
  amenities: string[];
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  landlord: {
    id: string;
    name: string;
    phone: string;
    email: string;
    verified: boolean;
    role: 'Owner' | 'Verified Agent' | 'Licensed Agent' | 'Property Manager';
    avatar: string;
    responseTime: string;
  };
  localityData: {
    walkScore: number;
    transitScore: number;
    safetyScore: number;
    nearbySchools: string;
    nearestTransit: string;
  };
  dateListed: string;
}

export interface LocalityInfo {
  id: string;
  name: string;
  city: string;
  overview: string;
  avgRentMonthly: number;
  avgSaleSqFt: number;
  walkScore: number;
  transitScore: number;
  safetyScore: number;
  listingsCount: number;
  highlights: string[];
  image: string;
}

export interface TourBooking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  propertyPrice: number;
  propertyImage: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  date: string;
  timeSlot: string;
  tourType: 'In-person' | 'Virtual Video Walk';
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  notes?: string;
  createdAt: string;
}

export interface InquiryMessage {
  id: string;
  propertyId: string;
  propertyTitle: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  message: string;
  moveInDate?: string;
  isRead: boolean;
  createdAt: string;
  reply?: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Tenant / Buyer' | 'Landlord / Host' | 'Licensed Agent' | 'Platform Admin';
  avatar: string;
  verified: boolean;
  memberSince: string;
}

export interface FilterState {
  searchQuery: string;
  purpose: 'All' | 'Rent' | 'Sale';
  propertyType: string;
  locality: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string; // 'All' | '1' | '2' | '3' | '4+'
  bathrooms: string;
  amenities: string[];
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'area-desc';
}
