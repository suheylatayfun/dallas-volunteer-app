SELECT e.*,o.* FROM events e
JOIN organizations o ON e.o_id = o.o_id
WHERE e.e_id=$1;

