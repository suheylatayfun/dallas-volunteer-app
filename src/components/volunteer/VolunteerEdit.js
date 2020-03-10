import React from "react";
import {
  getVolunteerSession,
  editVolunteerInfo
} from "../../redux/reducers/volunteerReducer";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import '../../styles/Edit.scss';
require('dotenv').config();
const {REACT_APP_cloudName,REACT_APP_uploadPreset} = process.env;

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
    const { v_id } = this.props.v_id;
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
  checkUploadResult = (error,event)=>{
    if(event.event === 'success'){
        this.setState({v_image:event.info.url}) 
    }
  }
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
      <div className="vol-edit-parent">
        <div className="vol-edit-form">
        <h3>Volunteer Edit</h3>
          <h4>Full Name</h4>
          <input name="v_name" onChange={this.handleChange} value={v_name} />
          <h4>Email</h4>
          <input name="v_email" onChange={this.handleChange} value={v_email} />
          <h4>Which city do you live in?</h4>
          <GooglePlacesAutocomplete 
                name="v_location"
                placeholder= ""
                initialValue={v_location}
                onSelect={(selectedResult) => this.setState({v_location: selectedResult.description })}
                autocompletionRequest={{
                    componentRestrictions: {
                      country: ['us'],
                    }
                  }}
                />
          <h4>Have you ever been volunteering activities before?</h4>
          <select
            name="v_been_a_volunteer_before"
            onChange={this.handleChange}
            value={v_been_a_volunteer_before}
          >
            <option>---</option>
            <option> YES</option>
            <option> NO</option>
          </select>
          <h4>Why are you interested in volunteering?</h4>
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
            <button onClick={()=>widget.open()}>Change image</button>
          <input name="v_image" onChange={this.handleChange} value={v_image} />          
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
