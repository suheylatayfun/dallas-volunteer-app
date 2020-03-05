UPDATE events
SET e_title=$1,
    e_address=$2,
    e_date=$3,
    e_start_time=$4,
    e_end_time=$5,
    e_image=$6,
    e_details=$7,
    e_volunteer_count=$8
WHERE e_id = $9
RETURNING *;
    