module.exports = {
  getOrganizationUpcomingEvents: async (req, res) => {
    const db = req.app.get("db");
    const upcomingEvents = await db.organization.getOrganizationUpcomingEvents( req.session.organization.o_id);
    console.log(req.session.organization.o_id);
    if (!upcomingEvents) {
      res.status(400).json("You don't have any upcoming events.");
    } else {
      res.status(200).json(upcomingEvents);
    }
  },
  getOrganizationPastEvents:async (req,res)=>{
    const db = req.app.get('db');
    const pastEvents = await db.organization.getOrganizationPastEvents(req.session.organization.o_id);
    if(!pastEvents){
      res.status(400).json("You don't have any past events.")
    }else{
      res.status(200).json(pastEvents)
    }
  },
  acceptVolunteer: async (req,res)=>{
    const db = req.app.get('db');
    const {v_id,e_id}= req.body
    const editedVolunteer = await db.event.acceptVolunteer(v_id,e_id);
    res.status(200).json(editedVolunteer);
  },
  declineVolunteer: async (req,res)=>{
    const db = req.app.get('db');
    const va_id = +req.params.id;
    const deletedVolunteer = await db.event.declineVolunteer(va_id);
    res.status(200).json(deletedVolunteer);
  }
};
