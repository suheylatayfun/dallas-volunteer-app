SELECT e_id,e_title, e_address,TO_CHAR(e_date :: DATE, 'Mon dd, yyyy') AS e_date,TO_CHAR(e_start_time, 'HH:MI AM')AS e_start_time,TO_CHAR (e_end_time, 'HH:MI AM')AS e_end_time FROM events
WHERE e_date < now() AND o_id=$1;
