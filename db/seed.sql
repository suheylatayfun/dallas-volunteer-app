-- CREATING Volunteers Table

CREATE TABLE volunteers
(v_id SERIAL PRIMARY KEY,
 v_email VARCHAR(100) UNIQUE NOT NULL,
 v_password VARCHAR(100) NOT NULL,
 v_name VARCHAR(100) NOT NULL,
 v_location VARCHAR(200) NOT NULL,
 v_image TEXT,
 v_why_interested_in_volunteering VARCHAR(1000) NOT NULL,
 v_been_a_volunteer_before BOOLEAN NOT NULL,
 v_interests TEXT
 v_role BOOLEAN NOT NULL
);


============================================

-- CREATING ORGANIZATIONS TABLE

CREATE TABLE organizations
(o_id SERIAL PRIMARY KEY,
 o_name VARCHAR(100) NOT NULL,
 o_email VARCHAR(100) UNIQUE NOT NULL,
 password VARCHAR(100) NOT NULL,
 o_location VARCHAR(200) NOT NULL,
 organizer_name VARCHAR(100) NOT NULL,
 o_image TEXT NOT NULL);
 

=============================================

-- CREATING EVENTS TABLE

CREATE TABLE events
(e_id SERIAL PRIMARY KEY,
 e_title VARCHAR(100) NOT NULL,
 e_address VARCHAR(500) NOT NULL,
 e_date DATE NOT NULL,
 e_start_time TIME NOT NULL,
 e_end_time TIME NOT NULL,
 e_image TEXT,
 e_details  VARCHAR(1000) NOT NULL,
 e_volunteer_count INT NOT NULL,
 o_id INT REFERENCES organizations(o_id));


===============================================
-- CREATING VOLUNTEER EVENT DETAILS

CREATE TABLE volunteer_approval
(va_id SERIAL PRIMARY KEY,
 v_id INT REFERENCES volunteers(v_id),
 e_id INT REFERENCES events(e_id),
 approved BOOLEAN);


===============================================
-- Choosing all one organizer events
SELECT * FROM events
WHERE o_id=1;

===============================================
-- Getting past events
SELECT * FROM events 
WHERE e_date < now();

-- Getting upcoming events
SELECT * FROM events 
WHERE e_date > now();

===============================================
