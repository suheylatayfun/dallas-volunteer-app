INSERT INTO volunteers
(v_email,v_password,v_name,v_location,v_image,v_why_interested_in_volunteering,v_been_a_volunteer_before,v_interests,v_role)
VALUES
($1,$2,$3,$4,$5,$6,$7,$8,'volunteer')
RETURNING *;
-- ($1,$2,$3,$4,$5,$6,$7,$8,$9)