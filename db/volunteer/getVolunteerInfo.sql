SELECT * FROM volunteers
WHERE v_id= $1;

--only getting info not count of past events



-- SELECT v.v_name,v.v_location,v.v_image,v.v_why_interested_in_volunteering,v_been_a_volunteer_before,v_interests FROM volunteer_approval va
-- JOIN events e ON e.e_id =va.e_id
-- JOIN volunteers v ON v.v_id= va.v_id
-- WHERE v.v_id= 3 AND va.approved='YES' AND e.e_date < now()
-- GROUP BY v.v_id;

--It just brings info if volunteer has approved events.