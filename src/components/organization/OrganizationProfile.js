import React from "react";
import ProfileNav from "./../ProfileNav";
import OrganizationEvents from '../organization/OrganizationEvents';
import "../../styles/OrganizationProfile.scss";
import { connect } from "react-redux";
import { getOrganizationSession } from "../../redux/reducers/organizationReducer";
import {MdEmail,MdLocationOn} from "react-icons/md";
import {IoIosContact} from "react-icons/io";


class OrganizationProfile extends React.Component {
  componentDidMount() {
    this.props.getOrganizationSession();
  }
  render() {
    const { organization } = this.props;
    const {
      o_name,
      o_image,
      o_location,
      organizer_name,
      o_email
    } = organization;
    return (
      <div className="parent-parent-container">
        <ProfileNav />
        <div className="organization-profile-container">
          <figure className="organization-image-container">
          <img src={o_image} alt="organization" id="org-image"/>
          </figure>
          <div className="organization-info-container">
          <h3>{o_name}</h3>
          <p><MdLocationOn size={20}/>  {o_location}</p>
          <p><IoIosContact size={20}/>  {organizer_name}</p>
          <p><MdEmail size={20}/>  {o_email}</p>
          </div>
        </div>
        <OrganizationEvents/>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    organization: reduxState.organization.organization
  };
};
export default connect(mapStateToProps, { getOrganizationSession })(
  OrganizationProfile
);
