import React from "react";
import "./../styles/Header.scss";
import { connect } from "react-redux";
import { logout } from "../redux/reducers/userReducer";
import { Link } from "react-router-dom";
import OrganizationEdit from "../components/organization/OrganizationEdit";
import VolunteerEdit from "../components/volunteer/VolunteerEdit";
import { MdSettings } from "react-icons/md";
class ProfileNav extends React.Component {
  constructor() {
    super();
    this.state = {
      isVolEditOpen: false,
      isOrgEditOpen: false
    };
  }
  toggleVol = () => {
    this.setState({ isVolEditOpen: !this.state.isVolEditOpen });
  };
  toggleOrg = () => {
    this.setState({ isOrgEditOpen: !this.state.isOrgEditOpen });
  };

  logout = () => {
    this.props.logout();
  };
  render() {
    return (
      <div>
        <div className="header-container">
          <Link to="/home" id="link">
            <h1 id="app-name">volevent</h1>
          </Link>

          <div className="dropdown">
            <MdSettings size={25} className="dropbtn" />
            <div className="dropdown-content">
              {this.props.role !== "organization" ? (
                <p onClick={this.toggleVol}>Edit</p>
              ) : (
                <p onClick={this.toggleOrg}>Edit</p>
              )}
              <Link to="/" id="link">
                <p onClick={this.logout}>Sign out</p>
              </Link>
            </div>
          </div>
        </div>

        {this.state.isVolEditOpen ? (
          <VolunteerEdit toggleVol={this.toggleVol} v_id={this.props.id} />
        ) : null}

        {this.state.isOrgEditOpen ? (
          <OrganizationEdit toggleOrg={this.toggleOrg} o_id={this.props.id} />
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    role: reduxState.userReducer.role,
    id: reduxState.userReducer.id
    // name:reduxState.userReducer.name
  };
};
export default connect(mapStateToProps, { logout })(ProfileNav);


