SELECT v.v_email FROM volunteer_approval va
JOIN events e ON e.e_id = va.e_id
JOIN volunteers v ON v.v_id= va.v_id
WHERE va.e_id=$1;


-- SELECT v.v_name,v.v_email FROM volunteer_approval va
-- JOIN events e ON e.e_id = va.e_id
-- JOIN volunteers v ON v.v_id= va.v_id
-- WHERE va.approved = true AND va.e_id=13;

