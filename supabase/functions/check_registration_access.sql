-- Function to check if a user can access a registration
CREATE OR REPLACE FUNCTION check_registration_access(email_to_check TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT 
    jsonb_build_object(
      'exists', (CASE WHEN COUNT(*) > 0 THEN true ELSE false END),
      'status', MAX(status),
      'id', MAX(id)
    )
  INTO result
  FROM registrations
  WHERE email = email_to_check;
  
  RETURN result;
END;
$$;
