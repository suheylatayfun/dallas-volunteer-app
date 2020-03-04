import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {updateState,registerVolunteer,loginVolunteer} from "../../redux/reducers/volunteerReducer";
import "../../styles/VolunteerRegister.scss";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

class VolunteerRegister extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect: false
    };
  }
  handleChange = e => {
    this.props.updateState({ [e.target.name]: e.target.value });
  };
  handleClick = e => {
    e.preventDefault();
    const {
      v_email,
      v_password,
      v_name,
      v_location,
      v_image,
      v_why_interested_in_volunteering,
      v_been_a_volunteer_before,
      v_interests,
      v_role,
      v_id
    } = this.props;
    this.props
      .registerVolunteer(
        v_email,
        v_password,
        v_name,
        v_location,
        v_image,
        v_why_interested_in_volunteering,
        v_been_a_volunteer_before,
        v_interests,
        v_role,
        v_id
      )
      .then(() => {
        this.setState({ shouldRedirect: true });
        // this.props.loginVolunteer(v_email, v_password);
      })
      .catch(err => console.log(err));
  };
  render() {
    if (this.state.shouldRedirect) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="volunteer-register">
        <h1>VolunteerRegister</h1>
        <form>
          <h4>Full Name</h4>
          <input name="v_name" onChange={this.handleChange} />
          <h4>Profile image</h4>
          <input name="v_image" onChange={this.handleChange} />
          <h4>Which city do you live in?</h4>
          <GooglePlacesAutocomplete 
                name="v_location"
                placeholder= "city name"
                onSelect={(selectedResult) => this.props.updateState({v_location: selectedResult.description })}
                autocompletionRequest={{
                    componentRestrictions: {
                      country: ['us'],
                    }
                  }}
                />
          {/* <input name="v_location" onChange={this.handleChange} /> */}
          <h4>HAVE YOU EVER BEEN VOLUNTEERING ACTIVITIES?</h4>
          <select name="v_been_a_volunteer_before" onChange={this.handleChange}>
            <option>---</option>
            <option> YES</option>
            <option> NO</option>
          </select>
          <h4>WHY ARE YOU INTERESTED IN VOLUNTEERING?</h4>
          <textarea
            name="v_why_interested_in_volunteering"
            onChange={this.handleChange}
          ></textarea>
          <h4>Your interests</h4>
          <input name="v_interests" onChange={this.handleChange} />
          <h4>Email</h4>
          <input name="v_email" onChange={this.handleChange} />
          <h4>Password</h4>
          <input name="v_password" onChange={this.handleChange} />
          <button onClick={this.handleClick}>Save Changes</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    v_email: reduxState.volunteer.v_email,
    v_password: reduxState.volunteer.v_password,
    v_name: reduxState.volunteer.v_name,
    v_location: reduxState.volunteer.v_location,
    v_image: reduxState.volunteer.v_image,
    v_why_interested_in_volunteering:
      reduxState.volunteer.v_why_interested_in_volunteering,
    v_been_a_volunteer_before: reduxState.volunteer.v_been_a_volunteer_before,
    v_interests: reduxState.volunteer.v_interests
  };
};

export default connect(mapStateToProps, {
  updateState,
  registerVolunteer,
  loginVolunteer
})(VolunteerRegister);
