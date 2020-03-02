import React from "react";
import {Link,Redirect} from "react-router-dom";
import { connect } from "react-redux";
import {
  updateState,
  loginVolunteer
} from "./../../redux/reducers/volunteerReducer";

class VolunteerLogin extends React.Component {
  constructor() {
    super();
    this.state = {
    //   v_email: "",
    //   v_password: "",
    shouldRedirect:false
    };
  }
  handleChange = e => {
      this.props.updateState({[e.target.name]: e.target.value });
    };

  handleLogin = () => {
    this.props
      .loginVolunteer(this.props.v_email, this.props.v_password)
      .then(()=> this.setState({shouldRedirect:true}))
      .catch(()=>window.alert('Wrong password'))
  };
  render() {
    // const {loading}= this.props;
    if(this.state.shouldRedirect){
        return <Redirect to="/home"/>
      }
    return (
      <div>
        {/* {loading? <img src='https://resources.humandx.org/static/img/loading_spinner.gif' alt='Loading..' /> : null} */}
        <h1>VOLUNTEER LOGIN</h1>
        <h3>E-mail</h3>
        <input name="v_email" onChange={this.handleChange}/>
        <h3>Password</h3>
        <input name="v_password" onChange={this.handleChange} />
        <button onClick={this.handleLogin}>Login</button>
        <p>
          Not have an account. Register{" "}
          <Link to="/volunteer/register"> Here!</Link>
        </p>
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
