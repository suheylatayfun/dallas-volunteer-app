SELECT e.e_id, e.e_title, e.e_address,TO_CHAR(e.e_date :: DATE, 'Mon dd, yyyy') AS e_date,TO_CHAR(e.e_start_time, 'HH:MI AM')AS e_start_time,TO_CHAR (e.e_end_time, 'HH:MI AM')AS e_end_time,e.e_image,e_details,e.e_volunteer_count,o.* FROM events e
JOIN organizations o ON e.o_id = o.o_id
WHERE e.e_id=$1;


-- SELECT e.e_id, e.e_title, e.e_address,TO_CHAR(e.e_date :: DATE, 'Mon dd, yyyy') AS e_date,e.e_start_time,e_end_time,e.e_image,e.e_volunteer_count,o.* FROM events e
-- JOIN organizations o ON e.o_id = o.o_id
-- WHERE e.e_id=$1;

-- SELECT e.*,o.* FROM events e
-- JOIN organizations o ON e.o_id = o.o_id
-- WHERE e.e_id=$1;

