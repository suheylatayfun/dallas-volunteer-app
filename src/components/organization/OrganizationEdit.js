import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getOrganizationSession,editOrganizationInfo} from '../../redux/reducers/organizationReducer';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import '../../styles/Edit.scss';
require('dotenv').config();
const {REACT_APP_cloudName,REACT_APP_uploadPreset} = process.env;

class EditOrganization extends React.Component{
  constructor(){
    super();
    this.state={
      o_name: '',
      o_email:'',
      o_location:'',
      organizer_name:'',
      o_image:'',
      shouldRedirect: false
    }
  }
  componentDidMount(){
    this.props.getOrganizationSession();
    const {o_name,o_location,o_email,organizer_name,o_image} = this.props.organization
    this.setState({
      o_name:o_name,
      o_email:o_email,
      o_location:o_location,
      organizer_name:organizer_name,
      o_image:o_image
    })
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value });
  };
  handleClick= e=>{
    e.preventDefault();
    const {o_name,o_location,o_email,o_image,organizer_name} = this.state;
    const {o_id}= this.props.o_id;
    this.props.editOrganizationInfo(o_name,o_email,o_location,organizer_name,o_image,o_id);
    this.setState({shouldRedirect:true})
  }
  checkUploadResult = (error,event)=>{
    if(event.event === 'success'){
        this.setState({o_image:event.info.url}) 
    }
}
  render(){
    if(this.state.shouldRedirect === true){
      return(
        <Redirect to="/organization/profile"/>
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
    const {o_name,o_location,o_email,organizer_name,o_image} = this.state;
      return (
        <div className="org-edit-parent">
          <div className="org-edit-form">
            <h4>Organization Name</h4>
            <input name="o_name" onChange={this.handleChange} value={o_name} />
            <h4>Location</h4>
                <GooglePlacesAutocomplete 
                name="o_location"
                initialValue={o_location}
                placeholder= ""
                onSelect={(selectedResult) => this.setState({o_location: selectedResult.description })}
                autocompletionRequest={{
                    componentRestrictions: {
                      country: ['us'],
                    }
                  }}
                />
            <h4>Contact Person</h4>
            <input name="organizer_name"onChange={this.handleChange} value={organizer_name}/>
            <h4>Email</h4>
            <input name="o_email" onChange={this.handleChange} value={o_email} />
            <button onClick={()=>widget.open()}>Change image</button>
            <input name="o_image" onChange={this.handleChange} value={o_image} />
            <div className="button-group">
            <button onClick={this.handleClick}>Save Changes</button>
            <button onClick={this.props.toggleOrg}>Cancel</button>
            </div>
          </div>
        </div>
      );
}
}
const mapStateToProps = reduxState=>{
  return{
    organization: reduxState.organization.organization
  }
}    
export default connect(mapStateToProps,{getOrganizationSession,editOrganizationInfo})(EditOrganization);