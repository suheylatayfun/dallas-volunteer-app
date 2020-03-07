SELECT e_id, e_title, e_address,e_date,e_image,e_volunteer_count FROM events
WHERE e_date > now()
ORDER BY e_date ASC;

-- SELECT e_id, e_title, e_address,e_date,e_image,e_volunteer_count FROM events
-- WHERE e_date > now();


-- SELECT e_title, e_address,TO_CHAR(e_date :: DATE, 'Mon dd, yyyy'),e_image,e_volunteer_count FROM events;

-- SELECT e_title, e_address, e_date,e_image,e_volunteer_count FROM events;


-- SELECT e.e_title, e.e_address, e.e_date,e.e_image,e.e_volunteer_count FROM events e
-- JOIN organizations o ON e.o_id = o.o_id;
