-- SELECT e.e_id,e.e_title, e.e_address,e_date,e_start_time,e_end_time,va.approved FROM volunteer_approval va
-- JOIN events e ON e.e_id = va.e_id
-- JOIN volunteers v ON v.v_id= va.v_id
-- WHERE va.approved='YES' AND v.v_id=$1 AND e.e_date > now();


SELECT e.e_id,e.e_title, e.e_address,e_date,TO_CHAR(e.e_start_time, 'HH:MI AM')AS e_start_time,TO_CHAR (e.e_end_time, 'HH:MI AM')AS e_end_time,va.approved FROM volunteer_approval va
JOIN events e ON e.e_id = va.e_id
JOIN volunteers v ON v.v_id= va.v_id
WHERE va.approved='YES' AND v.v_id=$1 AND e.e_date > now()
ORDER BY e.e_date ASC;;


