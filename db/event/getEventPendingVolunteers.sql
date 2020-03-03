SELECT v.v_name,v.v_email,v.v_id,v.v_location,v.v_image,v.v_why_interested_in_volunteering,v.v_been_a_volunteer_before,v.v_interests,va.va_id, e.e_title FROM volunteer_approval va
JOIN events e ON e.e_id = va.e_id
JOIN volunteers v ON v.v_id= va.v_id
WHERE va.approved = false AND va.e_id=$1;
