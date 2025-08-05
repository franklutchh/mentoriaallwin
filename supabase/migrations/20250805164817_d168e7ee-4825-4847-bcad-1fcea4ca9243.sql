-- Create offers table for scaled offers system
CREATE TABLE public.offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  advertiser_name TEXT NOT NULL,
  advertiser_avatar TEXT,
  
  -- Links
  facebook_link TEXT,
  creative_link TEXT,
  library_link TEXT,
  website_link TEXT,
  
  -- Categories and filters
  status TEXT NOT NULL DEFAULT 'ativo',
  format TEXT NOT NULL DEFAULT 'videos',
  niche TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'portugues',
  
  -- Metrics
  active_ads INTEGER DEFAULT 0,
  roas DECIMAL,
  average_ticket DECIMAL,
  
  -- Media
  thumbnail_url TEXT,
  media_urls TEXT[],
  
  -- Publication control
  is_published BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Create policies for admins to manage offers
CREATE POLICY "Admins can manage offers" 
ON public.offers 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role IN ('admin', 'mentor')
));

-- Create policy for public to view published offers
CREATE POLICY "Public can view published offers" 
ON public.offers 
FOR SELECT 
USING (is_published = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_offers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_offers_updated_at
  BEFORE UPDATE ON public.offers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_offers_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_offers_published ON public.offers(is_published);
CREATE INDEX idx_offers_status ON public.offers(status);
CREATE INDEX idx_offers_niche ON public.offers(niche);
CREATE INDEX idx_offers_format ON public.offers(format);
CREATE INDEX idx_offers_created_at ON public.offers(created_at DESC);