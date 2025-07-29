-- Create table for Personal Training form submissions
CREATE TABLE public.personal_training_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT,
  phone TEXT,
  background TEXT,
  goals TEXT NOT NULL,
  activity_routine TEXT NOT NULL,
  pain_injuries TEXT NOT NULL,
  reference_source TEXT NOT NULL,
  reference_name TEXT,
  consent_given BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for Wellness Massage form submissions
CREATE TABLE public.wellness_massage_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT,
  phone TEXT,
  pain_injuries TEXT,
  availability_notes TEXT,
  reference_source TEXT NOT NULL,
  reference_name TEXT,
  consent_given BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (optionnel si pas d'authentification)
ALTER TABLE public.personal_training_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_massage_requests ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access for form submissions
CREATE POLICY "Anyone can submit personal training requests" 
ON public.personal_training_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit massage requests" 
ON public.wellness_massage_requests 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_personal_training_requests_updated_at
BEFORE UPDATE ON public.personal_training_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_wellness_massage_requests_updated_at
BEFORE UPDATE ON public.wellness_massage_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();