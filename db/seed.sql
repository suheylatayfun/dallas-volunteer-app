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
);


-- ADDING INFO INTO VOLUNTEERS TABLE
--add password

INSERT INTO volunteers
(v_email,v_name,v_location,v_image,v_why_interested_in_volunteering, v_been_a_volunteer_before,v_interests)
VALUES
('henry@gmail.com','Henry Bloomberg','Dallas','https://images.unsplash.com/photo-1574950333594-f3e9a9446d0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','to try sth new','YES','Geography'),
('kim@gmail.com','Kim Clausen','Dallas','https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','to do sth different','YES','Music, Art'),
('brian@gmail.com','Brian Star','Dfw','https://images.unsplash.com/photo-1574950333594-f3e9a9446d0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','to see different way of life','YES','Education'),
('daniel@gmail.com','Daniel Bergen','Houston','https://images.unsplash.com/photo-1574950333594-f3e9a9446d0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','to do sth I am good at','NO','IT'),
('sandra@gmail.com',' Sandra omberg','Richardson','https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','to try sth new','NO','Science'),
('paul@gmail.com','Paul Clausen','Frisco','https://images.unsplash.com/photo-1505503693641-1926193e8d57?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','to do sth different in my spare time','NO','Music,Cooking'),
('simon@gmail.com','Simon Star','Plano','https://images.unsplash.com/photo-1574950333594-f3e9a9446d0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','to make it better around where I live','YES','Education'),
('ally@gmail.com','Ally Bergen','Dallas','https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','to help people around','NO','Marketing');



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
 
-- ADDING INFO INTO ORGANIZATIONS TABLE
--add password
 
INSERT INTO organizations
(o_name,o_email,password,o_location,organizer_name)
VALUES('Dev Mountain','katie@gmail.com','abc','Dallas','Katie Schooling'),
      ('WWC','jordan@gmail.com','abc','Dallas','Jordan Beanie'),
      ('Capital Factory','laura@gmail.com','abc','Dallas','Laura Tolbert');

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

-- ADDING INFO INTO EVENTS TABLE

INSERT INTO events
(e_title,e_address,e_date,e_start_time,e_end_time,e_image,e_details,e_volunteer_count,o_id)
VALUES
  ('Meet and Hire','1221 Ervay St. Dallas','2020-02-24','09:00','15:00','https://images.unsplash.com/photo-1520605368542-cd6d76953f3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','It is a meet and hire event.Volunteers will be responsible for welcoming employers.',4,2),
  ('WhiteBoard', '7672 Young St. Dallas','2020-02-01','13:00','18:00','https://images.unsplash.com/photo-1520605368542-cd6d76953f3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Volunteers will be responsible for serving drinks and cleaning',10,1),
  ('How to get A job in a Startup','1010 Parker St. Dallas','2020-02-27','18:00','20:00','https://images.unsplash.com/photo-1520605368542-cd6d76953f3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Volunteers will be helping in organizers in registration',2,3),
  ('Hire Me','1221 Ervay St. Dallas','2020-02-24','09:00','15:00','https://images.unsplash.com/photo-1520605368542-cd6d76953f3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','It is a meet and hire event.Volunteers will be responsible for welcoming employers.',2,2),
  ('Save Time', '7672 Young St. Dallas','2020-02-01','13:00','18:00','https://images.unsplash.com/photo-1520605368542-cd6d76953f3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Volunteers will be responsible for serving drinks and cleaning',2,1),
  ('Start your Startup','1010 Parker St. Dallas','2020-02-27','18:00','20:00','https://images.unsplash.com/photo-1520605368542-cd6d76953f3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Volunteers will be helping in organizers in registration',2,1),
  ('Web Accessibility','1221 Ervay St. Dallas','2020-02-24','09:00','15:00','https://images.unsplash.com/photo-1520605368542-cd6d76953f3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','It is a meet and hire event.Volunteers will be responsible for welcoming employers.',2,2),
  ('Burnout', '7672 Young St. Dallas','2020-02-01','13:00','18:00','https://images.unsplash.com/photo-1520605368542-cd6d76953f3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Volunteers will be responsible for serving drinks and cleaning',2,1),
  ('Recycling','1010 Parker St. Dallas','2020-02-27','18:00','20:00','https://images.unsplash.com/photo-1520605368542-cd6d76953f3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Volunteers will be helping in organizers in registration',2,3),
  ('Pair Programing','1221 Ervay St. Dallas','2020-02-10','09:00','15:00','https://images.unsplash.com/photo-1520605368542-cd6d76953f3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','It is a meet and hire event.Volunteers will be responsible for welcoming employers.',2,2),
  ('Sports', '7672 Young St. Dallas','2020-02-19','13:00','18:00','https://images.unsplash.com/photo-1520605368542-cd6d76953f3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Volunteers will be responsible for serving drinks and cleaning',2,1),
  ('Movie','1010 Parker St. Dallas','2020-02-20','18:00','20:00','https://images.unsplash.com/photo-1520605368542-cd6d76953f3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Volunteers will be helping in organizers in registration',2,1);


-- JOINING EVENTS AND ORGANIZATIONS TABLE

SELECT e.e_title, e.e_address, e.e_date,o.o_name,o.organizer_name FROM events e
JOIN organizations o ON e.o_id = o.o_id;


e_title	                            e_address	                               e_date	                                        o_name	                organizer_name
WhiteBoard	              7672 Young St. Dallas	     2020-02-01T00:00:00.000Z	  Dev Mountain	   Katie Schooling
Meet and Hire	              1221 Ervay St. Dallas	                 2020-02-24T00:00:00.000Z	  WWC	                            Jordan Beanie
How to get A job in a StartuP   1010 Parker St. Dallas  2020-02-27T00:00:00.000Z	  Capital Factory	   Laura Tolbert

===============================================
-- CREATING VOLUNTEER EVENT DETAILS

CREATE TABLE volunteer_approval
(va_id SERIAL PRIMARY KEY,
 v_id INT REFERENCES volunteers(v_id),
 e_id INT REFERENCES events(e_id),
 approved BOOLEAN);

-- ADDING INFO INTO volunteer_event_details

INSERT INTO volunteer_approval
(v_id,e_id,approved)
VALUES
(1,13,'YES');


INSERT INTO volunteer_approval
-- (v_id,e_id,status)
-- VALUES
-- (1,1,'PENDING'),
-- (1,2,'PENDING'),
-- (2,2,'PENDING'),
-- (3,1,'YES'),
-- (4,3,'PENDING'),
-- (4,4,'YES'),
-- (7,7,'YES'),
-- (8,10,'YES'),
-- (5,12,'PENDING');


INSERT INTO volunteer_event_details
(v_id,e_id,status)
VALUES
(2,7,'YES');

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
JOIN EXAMPLE

-- SELECT v.v_name, o.o_name,o.organizer_email,e.e_title,ved.status FROM events e
-- JOIN organizations o ON o.o_id = e.o_id
-- JOIN volunteer_event_details ved ON ved.o_id = o.o_id
-- JOIN volunteers V ON v.v_id = ved.v_id;


-- v_name  	o_name	organizer_email	e_title	              status
-- Ally Bergen	Dev Mountain	katie@gmail.com	WhiteBoard	 PENDING
-- Simon Star	WWC	             jordan@gmail.com	Meet and Hire	 YES

-- SELECT v.v_name,e.e_title,ved.status FROM events e
-- JOIN volunteer_event_details ved ON e.o_id = ved.o_id
-- JOIN volunteers V ON v.v_id = ved.v_id
-- WHERE ved.status= 'PENDING';


-- v_name	e_title	status
-- Ally Bergen	WhiteBoard	PENDING


SELECT o.o_name,e.e_title FROM events e
JOIN organizations o ON o.o_id = e.o_id
WHERE o.o_id=2;


o_name	e_title
WWC	Meet and Hire
WWC	Get the Job

-- SELECTING PENDING VOLUNTEERS FOR SPECIfic event
SELECT v.v_name,e.e_title,ved.status FROM volunteer_event_details ved
JOIN events e ON e.e_id =ved.e_id
JOIN volunteers v ON v.v_id= ved.v_id
WHERE status='PENDING' AND e.e_id= 1;
=================================================
-- Get volunteer info

SELECT COUNT(e.e_title),v.* FROM volunteer_event_details ved
JOIN events e ON e.e_id =ved.e_id
JOIN volunteers v ON v.v_id= ved.v_id
WHERE v.v_id= 1 AND ved.status='YES'
GROUP BY v.v_id;




-- {
-- "v_email":"aa@gmail.com",
-- "v_password":"asd",
-- "v_name":"sally",
-- "v_location":"Dallas",
-- "v_image":"https://images.unsplash.com/photo-1509715513011-e394f0cb20c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
-- "v_why_interested_in_volunteering":"I love it",
-- "v_been_a_volunteer_before":"YES",
-- "v_interests":"Web Development"
-- }