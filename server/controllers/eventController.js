module.exports = {
    getEvents: (req,res)=>{
        const db = req.app.get('db');
        db.event.getGeneralEventInfo().then(response=>{
            res.status(200).json(response);
        })
    },
    getDetailedEvent:(req,res)=>{
        const db= req.app.get('db');
        const id = +req.params.id
        db.event.getDetailedEventInfo(id).then(response=>{
            res.status(200).json(response);
        })
    },
    addEvent:(req,res)=>{
        const db = req.app.get('db');
        const{e_title,e_address,e_date,e_start_time,e_end_time,e_image,e_details,e_volunteer_count}= req.body;
        const {o_id} = req.session.organization
        db.event.addEvent(e_title,e_address,e_date,e_start_time,e_end_time,e_image,e_details,e_volunteer_count,o_id)
        .then(response=>{
            // console.log(response)
            res.status(200).json(response)
            
        })
        .catch(err=>{
            res.status(500).json('can not add an event')
        })
    },
    getPendingVolunteers: async (req,res)=>{
        const db = req.app.get('db');
        const id = +req.params.id
        // console.log(id)
        const eventPendingVolunteers = await db.event.getEventPendingVolunteers(id);
        if(!eventPendingVolunteers){
            res.status(401).json("You don't have any pending volunteers for this event.")
        }else{
            res.status(200).json(eventPendingVolunteers);
        }
        // console.log(eventPendingVolunteers)
    },
    getEventVolunteers: async (req,res)=>{
        const db = req.app.get('db');
        const id = +req.params.id;
        const eventVolunteers = await db.event.getEventVolunteers(id);
        if(!eventVolunteers){
            res.status(401).json("You don't have any pending volunteers for this event.")
        }else{
            res.status(200).json(eventVolunteers);
        }
    },
    deleteEvent : async(req,res)=>{
        const db = req.app.get('db');
        const e_id = +req.params.id;
        await db.event.deleteEvent(e_id);
    },
    getDeletedEventVolunteerEmail: async (req,res)=>{
        const db = req.app.get('db');
        const id = +req.params.id;
        const volunteerEmailList = await db.volunteer.getVolunteerEmailForDeletedEvent(id);
        res.status(200).json(volunteerEmailList.map(val => val.v_email));
        console.log(volunteerEmailList)
    }
}