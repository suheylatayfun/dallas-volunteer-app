
SELECT e_id,e_title, e_volunteer_count,e_address,e_date,TO_CHAR(e_start_time, 'HH:MI AM')AS e_start_time,TO_CHAR (e_end_time, 'HH:MI AM')AS e_end_time FROM events
WHERE e_date > now() AND o_id=$1
ORDER BY e_date ASC;


-- SELECT e_id,e_title, e_volunteer_count, e_address,e_date,e_start_time,e_end_time FROM events
-- WHERE e_date > now() AND o_id=$1;
