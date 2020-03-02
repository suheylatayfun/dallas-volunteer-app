SELECT v.v_name, v.v_id,v.v_location,v.v_image,v.v_why_interested_in_volunteering,v.v_been_a_volunteer_before,v.v_interests,va.va_id FROM volunteer_approval va
JOIN volunteers v ON v.v_id= va.v_id
WHERE va.approved = false AND va.e_id=$1;
