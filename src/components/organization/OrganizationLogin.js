import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  updateState,
  loginOrganization
} from "../../redux/reducers/organizationReducer";
import OrganizationRegister from "../organization/OrganizationRegister";
import { TiDeleteOutline } from "react-icons/ti";

class OrganizationLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect: false,
      canRegister: false
    };
  }
  handleChange = e => {
    this.props.updateState({ [e.target.name]: e.target.value });
  };
  handleLogin = e => {
    this.props
      .loginOrganization(this.props.o_email, this.props.o_password)
      .then(() => this.setState({ shouldRedirect: true }))
      .catch(() => window.alert("Wrong password"));
  };
  toggleRegister = () => {
    this.setState({ canRegister: !this.state.canRegister });
  };
  render() {
    if (this.state.shouldRedirect) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
        {this.state.canRegister ? (
          <OrganizationRegister toggleOrg={this.props.toggleOrg} />
        ) : (
          <div className="login-parent">
            <div className="login-form">
              <TiDeleteOutline
                onClick={this.props.toggleOrg}
                id="delete"
                size={30}
              />
              <h3>ORGANIZATION LOGIN</h3>
              <h4>E-mail</h4>
              <input name="o_email" onChange={this.handleChange} />
              <h4>Password</h4>
              <input
                type="password"
                name="o_password"
                onChange={this.handleChange}
              />
              <button onClick={this.handleLogin}>Login</button>
              <p>
                Not have an account. Register,{" "}
                <u onClick={this.toggleRegister}>Here!</u>
              </p>
            </div>
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
