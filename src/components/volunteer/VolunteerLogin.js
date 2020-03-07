import React from "react";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";
import {
  updateState,
  loginVolunteer
} from "./../../redux/reducers/volunteerReducer";
import VolunteerRegister from '../../components/volunteer/VolunteerRegister'

import '../../styles/Login.scss';
import {TiDelete} from "react-icons/ti";

class VolunteerLogin extends React.Component {
  constructor() {
    super();
    this.state = {
    canRegister:false,
    shouldRedirect:false
    };
  }
  handleChange = e => {
      this.props.updateState({[e.target.name]: e.target.value });
    };

  handleLogin = (e) => {
    e.preventDefault();
    this.props
      .loginVolunteer(this.props.v_email, this.props.v_password)
      .then(()=> this.setState({shouldRedirect:true}))
      .catch(()=>window.alert('Wrong password'))
  };
  toggleRegister=()=>{
    this.setState({canRegister:!this.state.canRegister})
  }
  render() {
    // const {loading}= this.props;
    if(this.state.shouldRedirect){
      return <Redirect to="/home"/>
    }
    return (
      <div>
      {this.state.canRegister? <VolunteerRegister toggleVol={this.props.toggleVol}/>
      :
      <div className="login-parent">
        {/* {loading? <img src='https://resources.humandx.org/static/img/loading_spinner.gif' alt='Loading..' /> : null} */}
        <form className="login-form">
        {/* <button onClick={this.props.toggleVol}>✖</button> */}
        <TiDelete  onClick={this.props.toggleVol} id="delete" size={30}/>
        <h3>VOLUNTEER LOGIN</h3>
        <h3>E-mail</h3>
        <input name="v_email" onChange={this.handleChange}/>
        <h3>Password</h3>
        <input name="v_password" onChange={this.handleChange} />
        <button onClick={this.handleLogin}>Login</button>
        <p>
          Not have an account. Register, <u onClick={this.toggleRegister}>Here!</u></p>
        </form>
      </div>
  }
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    v_email: reduxState.volunteer.v_email,
    v_password: reduxState.volunteer.v_password
  };
};

export default connect(mapStateToProps, { updateState, loginVolunteer })(
  VolunteerLogin
);
