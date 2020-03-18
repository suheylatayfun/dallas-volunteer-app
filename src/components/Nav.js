import React from "react";
import { connect } from "react-redux";
import { logout} from "../redux/reducers/userReducer";
import { Link } from "react-router-dom";
import {getSession} from './../redux/reducers/userReducer';

class Nav extends React.Component {
  componentDidMount() {
    this.props.getSession();
  }
  logout = () => {
    this.props.logout();
  };
  render() {
    return (         
      <div className="header-container">
        <h1 id="app-name">volevent</h1>
        <div className="profile-bar">
          <p>{this.props.name}</p>

          {this.props.role !== 'organization' ? (
            <Link to="/volunteer/profile">
              <img src={this.props.image} className="profile-image" alt="profile" />
            </Link>
          ) : (
            <Link to="/organization/profile">
              <img src={this.props.image} className="profile-image" alt="profile" />
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
    name:reduxState.userReducer.name,
    image: reduxState.userReducer.image 
  }
};
export default connect(mapStateToProps, { logout,getSession})(Nav);
