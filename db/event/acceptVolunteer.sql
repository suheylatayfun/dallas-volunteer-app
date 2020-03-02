UPDATE volunteer_approval
SET approved='YES'
WHERE v_id = $1 and e_id=$2;
