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
import '../../styles/EventVolunteerList.scss';
import {TiDelete} from "react-icons/ti";

class EventVolunteerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // volunteerCount: this.props.location.state.volunteerCount,
      selectedVolunteerInfo: {},
      showVolInfo: false,
      topic: 'Event Approval',

    };
  }
  componentDidMount() {
    // console.log(this.props)
    this.props.getOrganizationSession();
    const e_id = this.props.event_id;

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
  sendApprovalEmail=(v_email,o_email,topic,text)=>{
    axios.post(`/send-email?recipient=${v_email}&sender=${o_email}&topic=${topic}&text=${text}`)
    .then((response)=>console.log(response))
    .catch((err)=>{console.log(err)})
    window.alert('We sent your approval to volunteer.')
  }
  
  
  render() {
    const {o_email}= this.props
    const { selectedVolunteerInfo,topic} = this.state;
    const mappedPendingVolunteers = this.props.pendingVolunteers.map(el => {
      const e_id = this.props.event_id;
      return (
        <div key={el.v_id}>
          <p id="pending-vol-name" onClick={() => this.getVolunteerInfo(el.v_id)}>{el.v_name}</p>
          <button
            onClick={() => {
              this.props.acceptVolunteer(el.v_id, e_id);
              this.sendApprovalEmail(el.v_email,o_email,topic,el.e_title)
              this.props.getPendingVolunteers(e_id);
              this.props.getEventVolunteers(e_id);
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
      <div className="volunteer-list-container">
      <div className="volunteer-list">
        <div className="pending">
      <TiDelete size={25} onClick={this.props.showVol} id="delete"/>
        <h3>Pending Volunteers</h3>
        {mappedPendingVolunteers}

        {this.state.showVolInfo ? (
          <div key={selectedVolunteerInfo.v_id} className="hidden-vol-info">
          <p>Name:<span>{selectedVolunteerInfo.v_name}</span></p>
          <p>Location:<span> {selectedVolunteerInfo.v_location}</span></p>
          <p>Email:<span>{selectedVolunteerInfo.v_email}</span></p>
          <img src={selectedVolunteerInfo.v_image} alt={selectedVolunteerInfo.v_name}/>
          <p>Why are you interested in volunteering?</p>
          <p><span>{selectedVolunteerInfo.v_why_interested_in_volunteering}</span> </p>
          <p>Have you been a volunteer before?{selectedVolunteerInfo.v_been_a_volunteer_before}</p>
          <p>Interests</p>
          <p><span>{selectedVolunteerInfo.v_interests}</span> </p>
          </div>
        ) : null}
        <div className="ev-vol-info">
        </div>
      </div>
        <div className="approved">
        <h3>Event volunteers ({this.props.vol_count} needed)</h3>
        <ol>{mappedVolunteers}</ol>
        </div>
      </div>
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
