-- Add member_id column to profiles table for digital user IDs like TRC0051
ALTER TABLE public.profiles 
ADD COLUMN member_id TEXT UNIQUE;

-- Create a sequence for generating member numbers starting from 51
CREATE SEQUENCE IF NOT EXISTS member_id_sequence START WITH 51;

-- Create function to generate member ID
CREATE OR REPLACE FUNCTION generate_member_id()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_num INTEGER;
  new_member_id TEXT;
BEGIN
  -- Get next number from sequence
  next_num := nextval('member_id_sequence');
  
  -- Format as TRC + 4 digit number (padded with zeros)
  new_member_id := 'TRC' || LPAD(next_num::TEXT, 4, '0');
  
  RETURN new_member_id;
END;
$$;

-- Update existing handle_new_user function to include member_id generation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, email, mobile, member_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'rider_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Rider'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'mobile', ''),
    generate_member_id()
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Backfill member_id for existing users without one
DO $$
DECLARE
  profile_record RECORD;
BEGIN
  FOR profile_record IN 
    SELECT id FROM public.profiles WHERE member_id IS NULL
  LOOP
    UPDATE public.profiles 
    SET member_id = generate_member_id()
    WHERE id = profile_record.id;
  END LOOP;
END $$;

-- Make member_id NOT NULL after backfilling
ALTER TABLE public.profiles 
ALTER COLUMN member_id SET NOT NULL;