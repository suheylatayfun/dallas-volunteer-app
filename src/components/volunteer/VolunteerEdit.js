import React from "react";
import {
  getVolunteerSession,
  editVolunteerInfo
} from "../../redux/reducers/volunteerReducer";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';

class EditVolunteer extends React.Component {
  constructor() {
    super();
    this.state = {
       v_email: "",
      v_name: "",
      v_location: "",
      v_image: "",
      v_why_interested_in_volunteering: "",
      v_been_a_volunteer_before: "",
      v_interests: "",
      shouldRedirect:false
    };
  }
  componentDidMount() {
    this.props.getVolunteerSession();
    this.setState({
      v_email: this.props.volunteer.v_email,
      v_name: this.props.volunteer.v_name,
      v_location: this.props.volunteer.v_location,
      v_image: this.props.volunteer.v_image,
      v_why_interested_in_volunteering: this.props.volunteer
        .v_why_interested_in_volunteering,
      v_been_a_volunteer_before: this.props.volunteer.v_been_a_volunteer_before,
      v_interests: this.props.volunteer.v_interests
    });
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClick = e => {
    e.preventDefault();
    const {
      v_email,
      v_name,
      v_image,
      v_location,
      v_been_a_volunteer_before,
      v_why_interested_in_volunteering,
      v_interests
    } = this.state;
    const { v_id } = this.props.volunteer;
    // console.log(v_id);
    this.props.editVolunteerInfo(
      v_email,
      v_name,
      v_location,
      v_image,
      v_why_interested_in_volunteering,
      v_been_a_volunteer_before,
      v_interests,
      v_id
    );
    // this.props.history.push('/volunteer/profile')
    this.setState({shouldRedirect:true})
  };
  render() {
    const {
      v_email,
      v_name,
      v_image,
      v_location,
      v_been_a_volunteer_before,
      v_why_interested_in_volunteering,
      v_interests
    } = this.state;

    if(this.state.shouldRedirect === true){
      return(
        <Redirect to="/volunteer/profile"/>
      )
    }

    return (
      <div className="volunteer-register">
        <h1>VolunteerRegister</h1>
        <form>
          <h4>Full Name</h4>
          <input name="v_name" onChange={this.handleChange} value={v_name} />
          <h4>Profile image</h4>
          <input name="v_image" onChange={this.handleChange} value={v_image} />
          <h4>Location</h4>
          <input
            name="v_location"
            onChange={this.handleChange}
            value={v_location}
          />
          <h4>HAVE YOU EVER BEEN VOLUNTEERING ACTIVITIES?</h4>
          <select
            name="v_been_a_volunteer_before"
            onChange={this.handleChange}
            value={v_been_a_volunteer_before}
          >
            <option>---</option>
            <option> YES</option>
            <option> NO</option>
          </select>
          <h4>WHY ARE YOU INTERESTED IN VOLUNTEERING?</h4>
          <textarea
            name="v_why_interested_in_volunteering"
            onChange={this.handleChange}
            value={v_why_interested_in_volunteering}
          ></textarea>
          <h4>Your interests</h4>
          <input
            name="v_interests"
            onChange={this.handleChange}
            value={v_interests}
          />
          <h4>Email</h4>
          <input name="v_email" onChange={this.handleChange} value={v_email} />
         <button onClick={this.handleClick}>Save Changes</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    volunteer: reduxState.volunteer.volunteer
    // v_email: reduxState.volunteer.v_email,
    // v_name: reduxState.volunteer.v_name,
    // v_location: reduxState.volunteer.v_location,
    // v_image: reduxState.volunteer.v_image,
    // v_why_interested_in_volunteering:
    //   reduxState.volunteer.v_why_interested_in_volunteering,
    // v_been_a_volunteer_before: reduxState.volunteer.v_been_a_volunteer_before,
    // v_interests: reduxState.volunteer.v_interests
  };
};

export default connect(mapStateToProps, {
  getVolunteerSession,
  editVolunteerInfo
})(EditVolunteer);
