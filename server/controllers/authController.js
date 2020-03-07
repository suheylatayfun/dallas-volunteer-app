const bcrypt = require("bcryptjs");

module.exports = {
  registerVolunteer: async (req, res) => {
    const db = req.app.get("db");
    const { v_email } = req.body;
    const foundVolunteer = await db.auth.checkForVolunteerEmail(v_email);
    if (foundVolunteer[0]) {
      res.status(401).json("Volunteer already exists.");
    } else {
      const {
        v_email,
        v_password,
        v_name,
        v_location,
        v_image,
        v_why_interested_in_volunteering,
        v_been_a_volunteer_before,
        v_interests
      } = req.body;
      const hash = await bcrypt.hash(v_password, 12);
      const newUser = await db.auth.registerVolunteer([
        v_email,
        hash,
        v_name,
        v_location,
        v_image,
        v_why_interested_in_volunteering,
        v_been_a_volunteer_before,
        v_interests
      ]);
      // console.log(newUser);
      req.session.volunteer = {
        v_email: newUser[0].v_email,
        v_name: newUser[0].v_name,
        v_location: newUser[0].v_location,
        v_image: newUser[0].v_image,
        v_why_interested_in_volunteering: newUser[0].v_why_interested_in_volunteering,
        v_been_a_volunteer_before: newUser[0].v_been_a_volunteer_before,
        v_interests: newUser[0].v_interests,
        v_role: newUser[0].v_role,
        v_id: newUser[0].v_id
      };
      console.log(req.session.volunteer);
      res.status(201).json(req.session.volunteer);
    }
  },
  loginVolunteer: async (req, res) => {
    const { v_email, v_password } = req.body;
    const db = req.app.get("db");
    const foundVolunteer = await db.auth.checkForVolunteerEmail(v_email);
    if (foundVolunteer[0]) {
      const isAuthenticated = await bcrypt.compare(
        v_password,
        foundVolunteer[0].v_password
      );
      if (!isAuthenticated) {
        res.status(403).json("Password is incorrect");
      } else {
        req.session.volunteer = {
          v_email,
          v_name: foundVolunteer[0].v_name,
          v_location: foundVolunteer[0].v_location,
          v_image: foundVolunteer[0].v_image,
          v_why_interested_in_volunteering:
            foundVolunteer[0].v_why_interested_in_volunteering,
          v_been_a_volunteer_before:foundVolunteer[0].v_been_a_volunteer_before,
          v_interests: foundVolunteer[0].v_interests,
          v_role: foundVolunteer[0].v_role,
          v_id:foundVolunteer[0].v_id
        };
        // console.log(req.session.volunteer);
        res.status(200).json(req.session.volunteer);
        console.log('Volunteer logged in.')
      }
    }
  },
  registerOrganization: async (req, res) => {
    const db = req.app.get("db");
    const { o_email } = req.body;
    const foundOrganization = await db.auth.checkForOrganizationEmail(o_email);
    if (foundOrganization[0]) {
      res.status(401).json("Organization already exists.");
    } else {
      const {
        o_name,
        o_email,
        o_password,
        o_location,
        o_image,
        organizer_name
      } = req.body;

      const hash = await bcrypt.hash(o_password, 12);
      const newOrganization = await db.auth.registerOrganization([
        o_name,
        o_email,
        hash,
        o_location,
        organizer_name,
        o_image
      ]);
      // console.log(newOrganization);
      req.session.organization = {
        o_name: newOrganization[0].o_name,
        o_email: newOrganization[0].o_email,
        o_location: newOrganization[0].o_location,
        organizer_name: newOrganization[0].organizer_name,
        o_image: newOrganization[0].o_image,
        o_role: newOrganization[0].o_role
      };
      console.log(req.session.organization);
      res.status(201).json(req.session.organization);
    }
  },
  loginOrganization: async (req, res) => {
    const db = req.app.get("db");
    const { o_email, o_password } = req.body;
    const foundOrganization = await db.auth.checkForOrganizationEmail(o_email);
    if (foundOrganization[0]) {
      const areEqual = await bcrypt.compare(
        o_password,
        foundOrganization[0].o_password
      );
      if (!areEqual) {
        res.status(403).json("Password is incorrect");
      } else {
        req.session.organization = {
          o_email,
          o_id: foundOrganization[0].o_id,
          o_name: foundOrganization[0].o_name,
          o_location: foundOrganization[0].o_location,
          organizer_name: foundOrganization[0].organizer_name,
          o_image: foundOrganization[0].o_image,
          o_role: foundOrganization[0].o_role
        };
        // console.log(req.session.organization);
        res.status(200).json(req.session.organization);
        console.log('Organization logged in.')
      }
    }
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
    console.log("logged out");
  },
  getSession: (req, res) => {
    // console.log("1")
    if (req.session.organization) {
      // console.log("2")
      // console.log(req.session.organization);
      // console.log("hit Organization");
      res.status(200).json(req.session.organization);
    } else {
      // console.log("3")
      // console.log(req.session.volunteer);
      // console.log("hit V");
      res.status(200).json(req.session.volunteer);
    }
  },
  editVolunteerInfo: async (req, res) => {
    const db = req.app.get("db");
    const v_id = req.session.volunteer.v_id;
    const {
      v_email,
      v_name,
      v_location,
      v_image,
      v_why_interested_in_volunteering,
      v_been_a_volunteer_before,
      v_interests
    } = req.body;
    const editedVolInfo = await db.volunteer.editVolunteerInfo(
      v_email,
      v_name,
      v_location,
      v_image,
      v_why_interested_in_volunteering,
      v_been_a_volunteer_before,
      v_interests,
      v_id
    );
    const newProfile= editedVolInfo[0];
      req.session.volunteer = {
        v_email: newProfile.v_email,
        v_name: newProfile.v_name,
        v_location: newProfile.v_location,
        v_image: newProfile.v_image,
        v_why_interested_in_volunteering: newProfile.v_why_interested_in_volunteering,
        v_been_a_volunteer_before: newProfile.v_been_a_volunteer_before,
        v_interests: newProfile.v_interests,
        v_id: newProfile.v_id
    }
    res.status(200).json(req.session.volunteer);
  },
  editOrganizationInfo: async (req,res)=>{
    const db = req.app.get('db');
    const o_id = req.session.organization.o_id;
    const {o_name,o_email,o_location,organizer_name,o_image}= req.body;
    const editedOrgInfo = await db.organization.editOrganizationInfo(o_name,o_email,o_location,organizer_name,o_image,o_id);
    const newProfile = editedOrgInfo[0];
    req.session.organization = {
      o_name : newProfile.o_name,
      o_email: newProfile.o_email,
      o_location: newProfile.o_location,
      organizer_name: newProfile.organizer_name,
      o_image : newProfile.o_image,
      o_id : newProfile.o_id
    }
    res.status(200).json(req.session.organization)
  },
  getVolunteerInfo: async(req,res)=>{
    const db = req.app.get('db');
    const v_id = +req.params.id;
    const volunteerInfo = await db.volunteer.getVolunteerInfo(v_id);
    res.status(200).json(volunteerInfo[0]);
    // console.log(volunteerInfo[0])
  }
};

