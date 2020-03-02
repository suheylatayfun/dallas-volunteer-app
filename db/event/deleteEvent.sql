DELETE FROM volunteer_approval
WHERE e_id = $1;
DELETE FROM events 
WHERE e_id = $1;
