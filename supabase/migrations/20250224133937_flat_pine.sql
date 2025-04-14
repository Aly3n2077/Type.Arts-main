/*
  # Initial Schema for Bolt.Art Marketplace

  1. New Tables
    - `profiles`
      - Extended user profile information
      - Linked to auth.users
      - Stores user type (artist/collector) and profile details
    
    - `artworks`
      - Artwork listings
      - Stores artwork details, pricing, and status
      - Links to artist profile
    
    - `orders`
      - Purchase orders for artworks
      - Tracks transaction status and shipping details
    
    - `shipping_addresses`
      - User shipping addresses
      - Supports multiple addresses per user

  2. Security
    - Enable RLS on all tables
    - Policies for proper data access control
    - Public profiles are readable by all
    - Private data only accessible by owners
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE,
  full_name text,
  avatar_url text,
  user_type text CHECK (user_type IN ('artist', 'collector')) NOT NULL DEFAULT 'collector',
  bio text,
  website text,
  instagram_handle text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create artworks table
CREATE TABLE IF NOT EXISTS artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  artist_id uuid REFERENCES profiles(id) NOT NULL,
  price decimal(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  dimensions jsonb,
  weight decimal(8,2),
  weight_unit text DEFAULT 'kg',
  category text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sold')),
  images jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create shipping_addresses table
CREATE TABLE IF NOT EXISTS shipping_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  full_name text NOT NULL,
  street_address text NOT NULL,
  apartment text,
  city text NOT NULL,
  state text,
  postal_code text NOT NULL,
  country text NOT NULL,
  phone text,
  is_default boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id uuid REFERENCES profiles(id) NOT NULL,
  artwork_id uuid REFERENCES artworks(id) NOT NULL,
  shipping_address_id uuid REFERENCES shipping_addresses(id) NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  amount decimal(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  shipping_cost decimal(10,2),
  tracking_number text,
  shipping_carrier text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Artworks policies
CREATE POLICY "Published artworks are viewable by everyone"
  ON artworks FOR SELECT
  USING (status = 'published' OR auth.uid() = artist_id);

CREATE POLICY "Artists can create artworks"
  ON artworks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = artist_id);

CREATE POLICY "Artists can update own artworks"
  ON artworks FOR UPDATE
  USING (auth.uid() = artist_id)
  WITH CHECK (auth.uid() = artist_id);

-- Shipping addresses policies
CREATE POLICY "Users can view own addresses"
  ON shipping_addresses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own addresses"
  ON shipping_addresses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
  ON shipping_addresses FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
  ON shipping_addresses FOR DELETE
  USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view orders they're involved in"
  ON orders FOR SELECT
  USING (
    auth.uid() = buyer_id OR
    auth.uid() IN (
      SELECT artist_id FROM artworks WHERE id = artwork_id
    )
  );

CREATE POLICY "Buyers can create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();