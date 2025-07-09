-- Create deals table for caching fetched deals
CREATE TABLE public.deals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  discount_percentage INTEGER,
  image_url TEXT,
  store_name TEXT NOT NULL,
  category TEXT NOT NULL,
  affiliate_url TEXT NOT NULL,
  external_id TEXT NOT NULL,
  rating NUMERIC DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to view deals
CREATE POLICY "Anyone can view deals" 
ON public.deals 
FOR SELECT 
USING (true);

-- Create policy for system to manage deals
CREATE POLICY "System can manage deals" 
ON public.deals 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_deals_store_category ON public.deals(store_name, category);
CREATE INDEX idx_deals_featured ON public.deals(is_featured, created_at);
CREATE INDEX idx_deals_expires_at ON public.deals(expires_at);

-- Create trigger for updated_at
CREATE TRIGGER update_deals_updated_at
BEFORE UPDATE ON public.deals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();