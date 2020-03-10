import React from "react";
import { connect } from "react-redux";
import {
  updateState,
  registerOrganization,
  loginOrganization
} from "./../../redux/reducers/organizationReducer";
import {Redirect} from 'react-router-dom';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "../../styles/Register.scss";
require('dotenv').config();
const {REACT_APP_cloudName,REACT_APP_uploadPreset} = process.env;

class OrganizationRegister extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect:false,
      o_image:''
    };
  }
  componentDidMount(){
    this.setState({
      o_image: this.props.o_image,
    })
  }
  handleChange = e => {
    this.props.updateState({ [e.target.name]: e.target.value });
  };

  handleClick = e => {
    e.preventDefault();
    const {
      o_name,
      o_email,
      o_password,
      o_location,
      organizer_name,
    } = this.props;
    this.props
      .registerOrganization(
        o_name,
        o_email,
        o_password,
        o_location,
        organizer_name,
        this.state.o_image
      )
      .then(() => {
        this.setState({ shouldRedirect: true });
        // this.props.loginOrganization(o_email,o_password);
      })
      .catch(err => console.log(err));
  };
  checkUploadResult = (error,event)=>{
    // console.log(props.e_image)
    if(event.event === 'success'){
        this.setState({o_image:event.info.url}) 
    }
}
  render() {
    if(this.state.shouldRedirect){
      return <Redirect to="/home"/>
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
        <form className="register-form" onChange={(e)=>{e.preventDefault()}}>
          <h3>Organization Register</h3>
          <h4>Organization Name</h4>
          <input name="o_name" onChange={this.handleChange} />
          <h4>Location</h4>
          <GooglePlacesAutocomplete
            className="location"
            name="o_location"
            placeholder="city-name"
            onSelect={selectedResult =>
              this.props.updateState({ o_location: selectedResult.description })
            }
            autocompletionRequest={{
              componentRestrictions: {
                country: ["us"]
              }
            }}
          />
          <button onClick={()=>widget.open()}>Add your profile image!</button>
          <input name="o_image" value={this.state.o_image}/>
    
          <h4>Contact Person</h4>
          <input name="organizer_name" onChange={this.handleChange} />
          <h4>Email</h4>
          <input name="o_email" onChange={this.handleChange} />
          <h4>Password</h4>
          <input name="o_password" onChange={this.handleChange} />
          <div className="button-group">
          <button onClick={this.handleClick}>Save Changes</button>
          <button onClick={this.props.toggleOrg}>Cancel</button>
          </div>      
        </form>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    o_name: reduxState.organization.o_name,
    o_email: reduxState.organization.o_email,
    o_password: reduxState.organization.o_password,
    o_location: reduxState.organization.o_location,
    o_image: reduxState.organization.o_image,
    organizer_name: reduxState.organization.organizer_name
  };
};
export default connect(mapStateToProps, {
  updateState,
  registerOrganization,
  loginOrganization
})(OrganizationRegister);
