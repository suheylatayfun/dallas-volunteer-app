import React from "react";
import "./../styles/Header.scss";
// import { Link } from "react-router-dom";
import OrganizationLogin from "../components/organization/OrganizationLogin";
import VolunteerLogin from "../components/volunteer/VolunteerLogin";
import { FaRegUser } from "react-icons/fa";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isVolOpen: false,
      isOrgOpen: false
    };
  }
  toggleVol = () => {
    this.setState({ isVolOpen: !this.state.isVolOpen });
  };
  toggleOrg = () => {
    this.setState({ isOrgOpen: !this.state.isOrgOpen });
  };
  render() {
    return (
      <div>
        <div className="header-container">
          <h1 id="app-name">volevent</h1>

          <div className="dropdown">
            <FaRegUser size={30} className="dropbtn"/>
            <div className="dropdown-content">
              <h1 onClick={this.toggleVol}>Volunteer</h1>
              <h1 onClick={this.toggleOrg}>Organization</h1>
            </div>
          </div>

          {/* <div className="sign-in">
            <FaUser onClick={this.toggleVol} size={30} />
            <FaRegUser onClick={this.toggleOrg} size={30} />
          </div> */}
        </div>
        {this.state.isVolOpen ? (
          <VolunteerLogin toggleVol={this.toggleVol} />
        ) : null}

        {this.state.isOrgOpen ? (
          <OrganizationLogin toggleOrg={this.toggleOrg} />
        ) : null}
      </div>
    );
  }
}
export default Header;
