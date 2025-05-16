CREATE OR REPLACE FUNCTION find_similar_emails(search_email TEXT)
RETURNS TABLE (
  id UUID,
  email TEXT,
  status TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    r.email,
    r.status,
    similarity(r.email, search_email) as similarity
  FROM 
    registrations r
  WHERE 
    similarity(r.email, search_email) > 0.4
  ORDER BY 
    similarity DESC
  LIMIT 5;
END;
$$;
