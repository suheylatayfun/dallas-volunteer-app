import React from "react";
import ProfileNav from "../ProfileNav"
import { connect } from "react-redux";
import VolunteerEvents from '../../components/volunteer/VolunteerEvents';
import "../../styles/Profile.scss";
import { getVolunteerSession,getPastEvents} from "./../../redux/reducers/volunteerReducer";

class VolunteerProfile extends React.Component {
  componentDidMount() {
    this.props.getVolunteerSession();
  }
  render() {
    const {volunteer } = this.props;
    const {
      v_name,
      v_location,
      v_image,
      v_why_interested_in_volunteering,
      v_been_a_volunteer_before,
      v_interests
    } = volunteer;  
    return (
      <div className="parent-parent-container">
        <ProfileNav/>
        <div className="volunteer-profile-container">
          {/* <h2>Volunteered Event Count: {pastEvents.length}</h2> */}
          {/* <img
            id="background-image"
            src="https://images.unsplash.com/photo-1528459584353-5297db1a9c01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1075&q=80"
            alt="plain"
          /> */}
          <figure className="volunteer-image-container">
          <img id="vol-image" src={v_image} alt="profile" />
          <h2 id="vol-name">{v_name}</h2>
          <h3 id="v_location">{v_location}</h3>
          <h4 id="v_count"> Volunteered Event Count: {this.props.pastEvents.length}</h4>
          </figure>
          <ul className="volunteer-info-container">
          <li>Why are you interested in volunteering?</li>
          <p>{v_why_interested_in_volunteering}</p>
          <li>Have you ever been volunteer activities before?</li>
          <p>
            {v_been_a_volunteer_before === true
              ? "Yes": "No"}
          </p>
          <li>Your interests:</li>
          <p>{v_interests}</p>
          </ul>
        </div>
        <VolunteerEvents/>  
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    volunteer: reduxState.volunteer.volunteer,
    pastEvents: reduxState.volunteer.pastEvents,

  };
};
export default connect(mapStateToProps, {
  getVolunteerSession,getPastEvents
})(VolunteerProfile);
