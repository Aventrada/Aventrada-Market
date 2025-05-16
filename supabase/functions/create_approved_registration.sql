-- Create a function to add an approved registration
-- This function bypasses RLS policies
CREATE OR REPLACE FUNCTION create_approved_registration(p_email TEXT, p_full_name TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER -- This runs with the privileges of the function creator
AS $$
DECLARE
  v_id UUID;
BEGIN
  -- Check if registration already exists
  SELECT id INTO v_id FROM registrations WHERE email = p_email;
  
  -- If registration exists, update it
  IF v_id IS NOT NULL THEN
    UPDATE registrations
    SET status = 'approved', full_name = p_full_name, updated_at = NOW()
    WHERE id = v_id;
    
    RETURN v_id;
  END IF;
  
  -- If registration doesn't exist, create it
  INSERT INTO registrations (email, full_name, status, created_at, updated_at)
  VALUES (p_email, p_full_name, 'approved', NOW(), NOW())
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION create_approved_registration TO authenticated;
GRANT EXECUTE ON FUNCTION create_approved_registration TO anon;
