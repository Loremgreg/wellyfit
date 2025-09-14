-- Fix security vulnerability: Add RLS policies to protect customer personal information
-- Only allow authenticated admin users to view sensitive personal training requests

-- Create policy to allow only authenticated users with admin role to view personal training requests
-- Note: This prepares for future admin authentication - currently no one can view the data (secure by default)
CREATE POLICY "Only authenticated admins can view personal training requests"
ON public.personal_training_requests
FOR SELECT
TO authenticated
USING (false); -- Currently set to false for maximum security until admin system is implemented

-- Add similar protection for wellness massage requests
CREATE POLICY "Only authenticated admins can view wellness massage requests"
ON public.wellness_massage_requests
FOR SELECT
TO authenticated  
USING (false); -- Currently set to false for maximum security until admin system is implemented

-- Add comments explaining the security measures
COMMENT ON POLICY "Only authenticated admins can view personal training requests" ON public.personal_training_requests 
IS 'Restricts SELECT access to protect customer PII. Update USING clause to allow admin access when authentication is implemented.';

COMMENT ON POLICY "Only authenticated admins can view wellness massage requests" ON public.wellness_massage_requests
IS 'Restricts SELECT access to protect customer PII. Update USING clause to allow admin access when authentication is implemented.';