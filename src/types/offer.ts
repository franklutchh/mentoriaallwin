export interface Offer {
  id: string;
  title: string;
  description?: string;
  advertiser_name: string;
  advertiser_avatar?: string;
  
  // Links
  facebook_link?: string;
  creative_link?: string;
  library_link?: string;
  website_link?: string;
  
  // Categories and filters
  status: string;
  format: string;
  niche: string;
  language: string;
  
  // Metrics
  active_ads: number;
  roas?: number;
  average_ticket?: number;
  
  // Media
  thumbnail_url?: string;
  media_urls?: string[];
  
  // Publication control
  is_published: boolean;
  likes_count: number;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface CreateOfferRequest {
  title: string;
  description?: string;
  advertiser_name: string;
  advertiser_avatar?: string;
  facebook_link?: string;
  creative_link?: string;
  library_link?: string;
  website_link?: string;
  status: string;
  format: string;
  niche: string;
  language: string;
  active_ads?: number;
  roas?: number;
  average_ticket?: number;
  thumbnail_url?: string;
  media_urls?: string[];
  is_published?: boolean;
}

export interface OfferFilters {
  status?: string;
  format?: string;
  niche?: string;
  language?: string;
  search?: string;
  sortBy?: 'recent' | 'oldest' | 'likes' | 'roas' | 'ads';
}