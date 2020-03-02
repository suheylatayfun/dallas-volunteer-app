INSERT INTO organizations
(o_name,o_email,o_password,o_location,organizer_name,o_role,o_image)
VALUES($1,$2,$3,$4,$5,'organization',$6)
RETURNING *;