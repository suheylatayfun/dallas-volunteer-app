UPDATE volunteers
SET v_email =$1,
    v_name=$2,
    v_location=$3,
    v_image=$4,
    v_why_interested_in_volunteering=$5,
    v_been_a_volunteer_before=$6,
    v_interests=$7
WHERE 
    v_id=$8
RETURNING*;

