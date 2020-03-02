import React from "react";
import ProfileNav from "../ProfileNav"
import { connect } from "react-redux";
import VolunteerEvents from '../../components/volunteer/VolunteerEvents';
import "../../styles/VolunteerProfile.scss";
import { getVolunteerSession} from "./../../redux/reducers/volunteerReducer";

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
      <div>
        <ProfileNav/>
        <div className="volunteer-profile-container">
          {/* <h2>Volunteered Event Count: {pastEvents.length}</h2> */}
          <img
            className="background-image"
            src="https://images.unsplash.com/photo-1528459584353-5297db1a9c01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1075&q=80"
            alt="plain"
          />
          <img className="profile" src={v_image} alt="profile" />
          <h1>{v_name}</h1>
          <h3>{v_location}</h3>
          <h4>Why are you interested in volunteering?</h4>
          <p>{v_why_interested_in_volunteering}</p>
          <h4>Have you ever been volunteer activities before?</h4>
          <p>
            {v_been_a_volunteer_before !== undefined
              ? v_been_a_volunteer_before.toString()
              : null}
          </p>
          <h4>Your interests:</h4>
          <p>{v_interests}</p>
        </div>
        <VolunteerEvents/>   
       
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    volunteer: reduxState.volunteer.volunteer
  };
};
export default connect(mapStateToProps, {
  getVolunteerSession
})(VolunteerProfile);
