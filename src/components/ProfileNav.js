import React from "react";
// import '../styles/Nav.scss'
import { connect } from "react-redux";
import { logout } from "../redux/reducers/userReducer";
import {Link} from 'react-router-dom';

class ProfileNav extends React.Component {
  logout = () => {
    this.props.logout();
  };
  render() {
    return (
      <div className="nav-bar">
        <h1>VOLUNTEER APP</h1>
        <div className="profile-bar">
          {/* <p>{this.props.organization.o_name || this.props.volunteer.v_name}</p> */}
        
        {this.props.role !== 'organization'?(
         <Link to="/volunteer/edit"> <button>Edit</button></Link>
         ):(
          <Link to="/organization/edit"> <button>Edit</button></Link>
        )}
         <Link to="/"> <button onClick={this.logout}>Sign out</button></Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState=>{
  return{
    role:reduxState.userReducer.role,
    // name:reduxState.userReducer.name 
  }
}
export default connect(mapStateToProps, { logout})(ProfileNav);
