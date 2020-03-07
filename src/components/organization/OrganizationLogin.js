import React from "react";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';
import {
  updateState,
  loginOrganization
} from "../../redux/reducers/organizationReducer";
import OrganizationRegister from "../organization/OrganizationRegister";
import {TiDelete} from "react-icons/ti";

class OrganizationLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect:false,
      canRegister: false,
    };
  }

  handleChange = e => {
    this.props.updateState({ [e.target.name]: e.target.value });
  };
  handleLogin = (e) => {
    e.preventDefault()
    // this.props.loginOrganization(this.props.o_email,this.props.o_password).then(()=>{console.log("You're logged in")}).catch(err=>{console.log(err)})
    this.props
      .loginOrganization(this.props.o_email, this.props.o_password)
      .then(() => this.setState({ shouldRedirect: true }))
      .catch(() => window.alert("Wrong password"));
  };
  toggleRegister = () => {
    this.setState({ canRegister: !this.state.canRegister });
  };
  render() {
    // const {loading}= this.props;
    if(this.state.shouldRedirect){
      return <Redirect to="/home"/>
    }
    return (
      <div>
        {this.state.canRegister ? (
          <OrganizationRegister toggleOrg={this.props.toggleOrg}/>
        ) : (
          <div className="login-parent">
            {/* {loading? <img src='https://resources.humandx.org/static/img/loading_spinner.gif' alt='Loading..' /> : null} */}
            <form className="login-form">
              {/* <button onClick={this.props.toggleOrg}>✖</button> */}
              <TiDelete  onClick={this.props.toggleOrg} id="delete" size={30}/>
              <h3>ORGANIZATION LOGIN</h3>
              <h3>E-mail</h3>
              <input name="o_email" onChange={this.handleChange} />
              <h3>Password</h3>
              <input name="o_password" onChange={this.handleChange} />
              <button onClick={this.handleLogin}>Login</button>
              <p>
                Not have an account. Register,{" "}
                <u onClick={this.toggleRegister}>Here!</u>
              </p>
            </form>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    o_email: reduxState.organization.o_email,
    o_password: reduxState.organization.o_password,
    loading: reduxState.organization.loading
  };
};
export default connect(mapStateToProps, {
  updateState,
  loginOrganization
})(OrganizationLogin);
