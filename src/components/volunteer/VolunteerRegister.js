import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {updateState,registerVolunteer,loginVolunteer} from "../../redux/reducers/volunteerReducer";
import "../../styles/Register.scss";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
require('dotenv').config();
const {REACT_APP_cloudName,REACT_APP_uploadPreset} = process.env;

class VolunteerRegister extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect:false,
      v_image:''
    };
  }
  componentDidMount(){
    this.setState({
      v_image: this.props.v_image,
    })
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
        this.state.v_image,
        v_why_interested_in_volunteering,
        v_been_a_volunteer_before,
        v_interests,
        v_role,
        v_id
      )
      .then(() => {
        // e.preventDefault()
        this.setState({ shouldRedirect: true });
        // this.props.loginVolunteer(v_email, v_password);
      })
      .catch(err => console.log(err));
  };
  checkUploadResult = (error,event)=>{
    // console.log(props.e_image)
    if(event.event === 'success'){
        this.setState({v_image:event.info.url}) 
    }
}

  render() {
    if (this.state.shouldRedirect) {
      return <Redirect to="/home" />
    }
    let widget;
    if( window.cloudinary ) {
        widget = window.cloudinary.createUploadWidget(
            {
                cloudName: `${REACT_APP_cloudName}`,
                uploadPreset: `${REACT_APP_uploadPreset}`,
                sources: ['local', 'url', 'camera', 'instagram'],
                default: false
            },
            ( error, result ) => {
                this.checkUploadResult(error, result);
            }
        );
    }
    return (
      <div className="register-parent">
        <div className="register-form" onChange={(e)=>{e.preventDefault()}}>
        <h3>Volunteer Register</h3>
          <h4>Full Name</h4>
          <input name="v_name" onChange={this.handleChange} />
          <h4>Which city do you live in?</h4>
          <GooglePlacesAutocomplete 
                name="v_location"
                placeholder= ""
                onSelect={(selectedResult) => this.props.updateState({v_location: selectedResult.description })}
                autocompletionRequest={{
                  componentRestrictions: {
                    country: ['us'],
                  }
                }}
                />
          {/* <input name="v_location" onChange={this.handleChange} /> */}
          <h4>Have you ever been volunteering activities before?</h4>
          <select name="v_been_a_volunteer_before" onChange={this.handleChange}>
            <option>---</option>
            <option> YES</option>
            <option> NO</option>
          </select>
          <h4>Why are you interested in volunteering?</h4>
          <textarea
            name="v_why_interested_in_volunteering"
            onChange={this.handleChange}
          ></textarea>
          <h4>Your interests</h4>
          <input name="v_interests" onChange={this.handleChange} />
          <button onClick={()=>widget.open()}>Add your profile image!</button>
          <input name="v_image" value={this.state.v_image}/>
          <h4>Email</h4>
          <input name="v_email" onChange={this.handleChange} />
          <h4>Password</h4>
          <input  type="password" name="v_password" onChange={this.handleChange} />
          <div className="button-group">
          <button onClick={this.handleClick}>Save Changes</button>
          <button onClick={this.props.toggleVol}>Cancel</button>
          </div>
        </div>
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
