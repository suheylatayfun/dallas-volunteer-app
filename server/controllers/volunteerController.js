module.exports = {
  volunteerEvent: async (req, res) => {
    const db = req.app.get("db");
    const { e_id, v_id } = req.body;
    // const v_id = req.session.volunteer.v_id;
    await db.volunteer_approval.addIntoEventApproval(v_id, e_id);
    // .then(response=>res.status(200).json(response))
    // req.session.pendingVolunteerForEvent = {
    //     approved:pendingEvent[0].approved,
    // }
    // console.log(req.session.pendingVolunteerForEvent)
    // res.status(200).json(req.session.pendingVolunteerForEvent)
  },
  getPendingEvents: async (req, res) => {
    const db = req.app.get("db");
    const pendingEvents = await db.volunteer_approval.getVolunteerPendingEvents(
      req.session.volunteer.v_id
    );
    // console.log(pendingEvents)
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
