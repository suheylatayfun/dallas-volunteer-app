import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getOrganizationSession,editOrganizationInfo} from '../../redux/reducers/organizationReducer';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

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
    const {o_name,o_location,o_email,o_image,organizer_name} = this.props.organization
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
    const {o_id}= this.props.organization;
    this.props.editOrganizationInfo(o_name,o_email,o_location,organizer_name,o_image,o_id);
    this.setState({shouldRedirect:true})
  }
  render(){
    if(this.state.shouldRedirect === true){
      return(
        <Redirect to="/organization/profile"/>
      )
    }
    const {o_name,o_location,o_email,o_image,organizer_name} = this.state;
      return (
        <div>
          <h1>Edit Organization Information</h1>
          <form>
            <h4>Organization Name</h4>
            <input name="o_name" onChange={this.handleChange} value={o_name} />
            <h4>Location</h4>
                <GooglePlacesAutocomplete 
                name="o_location"
                initialValue={o_location}
                placeholder= "city-name"
                onSelect={(selectedResult) => this.setState({o_location: selectedResult.description })}
                autocompletionRequest={{
                    componentRestrictions: {
                      country: ['us'],
                    }
                  }}
                />
            {/* <input name="o_location" onChange={this.handleChange} value={o_location} /> */}
            <h4>Contact Person</h4>
            <input name="organizer_name"onChange={this.handleChange} value={organizer_name}/>
            <h4>Email</h4>
            <input name="o_email" onChange={this.handleChange} value={o_email} />
            <h4>image</h4>
            <input name="o_image" onChange={this.handleChange} value={o_image} />
            <button onClick={this.handleClick}>Save Changes</button>
          </form>
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