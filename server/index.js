const dotenv= require('dotenv');
dotenv.config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const {SERVER_PORT,CONNECTION_STRING,SESSION_SECRET,SENDGRID_API_KEY} = process.env;

//auth controller
const {registerVolunteer,registerOrganization,loginVolunteer,loginOrganization,logout,getSession,editVolunteerInfo,editOrganizationInfo,getVolunteerInfo} = require('./controllers/authController');

//auth middleware
// const {usersOnly} = require('./middleware/authMiddleware');

//event controller
const{getEvents,getDetailedEvent,getDetailedEventForEdit,addEvent,getPendingVolunteers,getEventVolunteers,deleteEvent,getDeletedEventVolunteerEmail,editEventInfo}= require('./controllers/eventController');

//volunteer controller
const {volunteerEvent,getPendingEvents,getApprovedEvents,getPastEvents,getVolunteerCount} = require('./controllers/volunteerController');

//organization Controller
const {getOrganizationUpcomingEvents,getOrganizationPastEvents,acceptVolunteer,declineVolunteer}= require('./controllers/organizationController');


//DB connection
massive(CONNECTION_STRING).then(db =>{
    app.set('db', db);
    console.log('DB connected')
})

const app = express();
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7 
    }
}))

//auth endpoints
app.post('/auth/login/volunteer',loginVolunteer);
app.post('/auth/login/organization',loginOrganization);
app.post('/auth/volunteer',registerVolunteer);
app.post('/auth/organization',registerOrganization);
app.get('/auth/session',getSession);
app.post('/auth/logout',logout);

//event endpoints
app.get('/api/event/:id/delete/volunteer',getDeletedEventVolunteerEmail);
app.get('/api/event/:id/pending',getPendingVolunteers);
app.get('/api/event/:id/volunteer',getEventVolunteers);
app.delete('/api/event/:id',deleteEvent);
app.put('/api/event/:id',editEventInfo);
app.get('/api/event/:id',getDetailedEvent);
app.get('/api/event/edit/:id',getDetailedEventForEdit);

app.post('/api/events',addEvent);
app.get('/api/events',getEvents);

//volunteer-event endpoints
app.post('/api/volunteer/event',volunteerEvent);
app.get('/api/volunteer/pending',getPendingEvents);
app.get('/api/volunteer/approved',getApprovedEvents);
app.get('/api/volunteer/past',getPastEvents);
app.get('/api/volunteer',getVolunteerCount);


//volunteer endpoints
app.get('/api/volunteer/:id',getVolunteerInfo)
app.put('/api/volunteer/edit',editVolunteerInfo);

//organization-event-endpoints
app.get('/api/organization/upcoming',getOrganizationUpcomingEvents)
app.get('/api/organization/past',getOrganizationPastEvents);
app.put('/api/event/volunteer/accept',acceptVolunteer);
app.delete('/api/event/volunteer/:id',declineVolunteer);

//organization endpoints
app.put('/api/organization/edit',editOrganizationInfo);

//SENDGRID

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

app.post('/send-email',(req,res)=>{
    const { recipient, sender, topic, text } = req.query; 
    const msg = {
        to: recipient, 
        from: sender,
        subject: topic,
        text:`Congratulations, you have been approved for event ${text}. Check your DallasVol app for detailed event information. See you there!`
    }
    sgMail.send(msg).then(()=>res.send('Success')).catch(err=>{
        console.log(err);
        res.status(500).send('An error happened.')
    })
});
app.post('/send-emails',(req,res)=>{
    const { recipient, sender, topic, text } = req.query; 
    const msg = {
        to: recipient, 
        from: sender,
        subject: topic,
        text:`I am so sorry to tell this. ${text} has been cancelled.`
    }
    console.log(msg)
    sgMail.send(msg).then(()=>res.send('Success')).catch(err=>{
        console.log(err);
        res.status(500).send('An error happened.')
    })

});

app.post("/send-cancellation/:id",async (req, res) => {
    const {sender, topic, text} = req.query;
    const db = req.app.get('db');

    const id = +req.params.id;
    console.log(req.query, req.params);
    let volunteerEmailList = await db.volunteer.getVolunteerEmailForDeletedEvent(id);
    const msg = {
        to: volunteerEmailList.map(v => v.v_email), 
        from: sender,
        subject: topic,
        text:`I am so sorry to tell this. ${text} has been cancelled.`
    }
    console.log(msg)
    sgMail.send(msg).then(()=>res.send('Success')).catch(err=>{
        console.log(err, err.response.body.errors);
        res.status(500).send('An error happened.')
    })
})

app.listen(SERVER_PORT,()=>{console.log(`Server is on ${SERVER_PORT}`)})

