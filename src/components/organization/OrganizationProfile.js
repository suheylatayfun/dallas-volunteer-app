import React from "react";
import ProfileNav from "./../ProfileNav";
import OrganizationEvents from '../organization/OrganizationEvents';
import "../../styles/OrganizationProfile.scss";
import { connect } from "react-redux";
import { getOrganizationSession } from "../../redux/reducers/organizationReducer";

class OrganizationProfile extends React.Component {
  componentDidMount() {
    this.props.getOrganizationSession();
    // console.log(this.props.organization);
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
      <div>
        <ProfileNav />
        <div className="organization-profile-container">
          <figure>
          <img src={o_image} alt="organization" />
          </figure>
          <div>
          <h1>{o_name}</h1>
          <p>LOCATION:{o_location}</p>
          <p>Organizer: {organizer_name}</p>
          <p>MESSAGE: {o_email}</p>
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
