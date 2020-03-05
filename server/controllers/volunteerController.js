module.exports = {
  volunteerEvent: async (req, res) => {
    const db = req.app.get("db");
    const {v_id,e_id } = req.body;
    const existingVolunteer = await db.volunteer_approval.checkVolunteerForEvent(v_id,e_id);
    if(existingVolunteer[0]){
      res.status(302).json('Volunteer already applied for this event.')
    }else{
      await db.volunteer_approval.addIntoEventApproval(v_id, e_id);
    }
    // const v_id = req.session.volunteer.v_id;
  },
  getPendingEvents: async (req, res) => {
    const db = req.app.get("db");
    const pendingEvents = await db.volunteer_approval.getVolunteerPendingEvents(
      req.session.volunteer.v_id
    );
    console.log(req.session.volunteer.v_id)
    if (!pendingEvents) {
      res.status(400).json("You don't have any pending events.");
    } else {
      res.status(200).json(pendingEvents);
    }
  },
  getApprovedEvents: async (req, res) => {
    const db = req.app.get("db");
    const approvedEvents = await db.volunteer_approval.getVolunteerApprovedEvents(
      req.session.volunteer.v_id
    );
    // console.log(approvedEvents)
    if (!approvedEvents) {
      res.status(400).json("You don't have any approved events.");
    } else {
      res.status(200).json(approvedEvents);
    }
  },
  getPastEvents: async (req, res) => {
    const db = req.app.get("db");
    const pastEvents = await db.volunteer_approval.getVolunteerPastEvents(
      req.session.volunteer.v_id
    );
    // console.log(pastEvents)
    if (!pastEvents) {
      res.status(400).json("You don't have any past events.");
    } else {
      res.status(200).json(pastEvents);
    }
  }
};
