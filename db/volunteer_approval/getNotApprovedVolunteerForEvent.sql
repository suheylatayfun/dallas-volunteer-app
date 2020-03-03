SELECT v.v_name,e.e_title,va.approved FROM volunteer_approval va
JOIN events e ON e.e_id = va.e_id
JOIN volunteers v ON v.v_id= va.v_id
WHERE va.approved='NO' AND e.e_id= $1;