import React from "react";
import "../styles/Nav.scss";
import { connect } from "react-redux";
import { logout} from "../redux/reducers/userReducer";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  logout = () => {
    this.props.logout();
  };
  render() {
    return (
      <div className="nav-bar">
        <h1>VOLUNTEER APP</h1>
        <div className="profile-bar">
          <p>{this.props.name}</p>

          {this.props.role !== 'organization' ? (
            <Link to="/volunteer/profile">
              <img className="profile-image" alt="profile" />
            </Link>
          ) : (
            <Link to="/organization/profile">
              <img className="profile-image" alt="profile" />
            </Link>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return{
    role: reduxState.userReducer.role,
    name:reduxState.userReducer.name 
  }
};
export default connect(mapStateToProps, { logout})(Nav);
