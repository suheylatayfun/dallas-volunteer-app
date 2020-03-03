import React from "react";
import { connect } from "react-redux";
import { getOrganizationSession } from "../../redux/reducers/organizationReducer";
import {
  getPendingVolunteers,
  getEventVolunteers
} from "../../redux/reducers/eventReducer";
import {
  acceptVolunteer,
  declineVolunteer
} from "../../redux/reducers/volunteerReducer";
import axios from "axios";

class EventVolunteerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // volunteerCount: this.props.location.state.volunteerCount,
      selectedVolunteerInfo: {},
      showVolInfo: false,
      subject: 'Event Approval',

    };
  }
  componentDidMount() {
    // console.log(this.props)
    this.props.getOrganizationSession();
    const e_id = this.props.match.params.id;

    this.props
      .getPendingVolunteers(e_id)
      .then(() => {
        console.log("Pending volunteers are shown");
      })
      .catch(err => console.log(err));
    // console.log(this.props.pendingVolunteers)
    this.props
      .getEventVolunteers(e_id)
      .then(() => {
        console.log("Event volunteers are shown.");
      })
      .catch(err => console.log(err));
    //   console.log(this.props)
  }

  getVolunteerInfo(v_id) {
    axios.get(`/api/volunteer/${v_id}`).then(response => {
      this.setState({
        selectedVolunteerInfo: response.data,
        showVolInfo: !this.state.showVolInfo
      });
    });
  }
  sendApprovalEmail=(v_email,o_email,subject,text)=>{
    axios.post(`/send-email?recipient=${v_email}&sender=${o_email}&topic=${subject}&text=${text}`)
    .then((response)=>console.log(response))
    .catch((err)=>{console.log(err)})
    window.alert('We sent your approval to volunteer.')
  }
  
  
  render() {
    const {o_email}= this.props
    const { selectedVolunteerInfo,showVolInfo,subject} = this.state;
    console.log(showVolInfo)
    console.log(this.props.o_email)
    const mappedPendingVolunteers = this.props.pendingVolunteers.map(el => {
      const e_id = this.props.match.params.id;
      return (
        <div key={el.v_id}>
          <p onClick={() => this.getVolunteerInfo(el.v_id)}>{el.v_name}</p>
          <button
            onClick={() => {
              this.props.acceptVolunteer(el.v_id, e_id);
              this.props.getPendingVolunteers(e_id);
              this.props.getEventVolunteers(e_id);
              this.sendApprovalEmail(el.v_email,o_email,subject,el.e_title)
            }}
          >
            Accept
          </button>
          <button
            onClick={() => {
              this.props.declineVolunteer(el.va_id);
              this.props.getPendingVolunteers(e_id);
            }}
          >
            Decline
          </button>
        </div>
      );
    });
    // console.log(mappedPendingVolunteers)
    const mappedVolunteers = this.props.eventVolunteers.map(el => {
      return <li key={el.v_id}>{el.v_name}</li>;
    });
    return (
      <div>
        <h3>Pending Volunteers</h3>
        {mappedPendingVolunteers}

        {this.state.showVolInfo ? (
          <div key={selectedVolunteerInfo.v_id}>
          <p>Name:{selectedVolunteerInfo.v_name}</p>
          <p>Location: {selectedVolunteerInfo.v_location}</p>
          <p>Email: {selectedVolunteerInfo.v_email}</p>
          <img src={selectedVolunteerInfo.v_image} alt={selectedVolunteerInfo.v_name}/>
          <p>Why are you interested in volunteering?</p>
          <p>{selectedVolunteerInfo.v_why_interested_in_volunteering}</p>
          <p>Have you been a volunteer before?{selectedVolunteerInfo.v_been_a_volunteer_before}</p>
          <p>Interests</p>
          <p>{selectedVolunteerInfo.v_interests}</p>
          </div>
        ) : null}

        {/* <h3>Event Volunteers // Volunteer Limit:{this.state.volunteerCount}</h3> */}
        <h3>Event volunteers</h3>
        <ol>{mappedVolunteers}</ol>
        {/* {mappedPendingVolunteerInfo} */}
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    // events: reduxState.events,
    // volunteer: reduxState.volunteer,
    pendingVolunteers: reduxState.events.pendingVolunteers,
    eventVolunteers: reduxState.events.eventVolunteers,
    o_email : reduxState.organization.organization.o_email
  };
};
export default connect(mapStateToProps, {
  getPendingVolunteers,
  getOrganizationSession,
  getEventVolunteers,
  acceptVolunteer,
  declineVolunteer
})(EventVolunteerList);
