SELECT * FROM volunteer_approval va
JOIN events e ON e.e_id = va.e_id
JOIN volunteers v ON v.v_id= va.v_id
where va.v_id=$1 and e.e_id = $2;
