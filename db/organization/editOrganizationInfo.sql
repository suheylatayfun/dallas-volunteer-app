UPDATE organizations
SET o_name=$1,
    o_email=$2,
    o_location=$3,
    organizer_name=$4,
    o_image=$5
WHERE 
o_id=$6
RETURNING*;

