SELECT COUNT(v_name) from volunteers
UNION
SELECT COUNT(o_name) from organizations
UNION
SELECT COUNT(e_title) from events;