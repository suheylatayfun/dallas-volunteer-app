import React from 'react';
import {Redirect,Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {updateState,loginOrganization,resetInput} from '../../redux/reducers/organizationReducer';

class OrganizationLogin extends React.Component{
    constructor() {
        super();
        this.state = {
        shouldRedirect:false
        };
      }

    handleChange = e => {
        this.props.updateState({[e.target.name]: e.target.value });
      };
    handleLogin=()=>{
        // this.props.loginOrganization(this.props.o_email,this.props.o_password).then(()=>{console.log("You're logged in")}).catch(err=>{console.log(err)})
        this.props.loginOrganization(this.props.o_email,this.props.o_password).then(()=> this.setState({shouldRedirect:true})).catch(()=>window.alert('Wrong password'))
        // this.props.resetInput();
         

    }  
    render(){
        // const {loading}= this.props;
        if(this.state.shouldRedirect){
            return <Redirect to="/home"/>
          }
        return(
            <div>
            {/* {loading? <img src='https://resources.humandx.org/static/img/loading_spinner.gif' alt='Loading..' /> : null} */}
            <h1>ORGANIZATION LOGIN</h1>
            <h3>E-mail</h3>
            <input name="o_email"onChange={this.handleChange}/>
            <h3>Password</h3>
            <input name="o_password" onChange={this.handleChange}/>
            {/* <Link to="/organization/home"><button onClick={this.handleLogin}>Login</button></Link> */}
            <button onClick={this.handleLogin}>Login</button>
            <p>Not have an account. Register <Link to="/organization/register"> Here!</Link></p>
            </div>
        )
    }
}
const mapStateToProps = reduxState =>{
    return{
        o_email: reduxState.organization.o_email,
        o_password: reduxState.organization.o_password,
        loading:reduxState.organization.loading
    }
}
export default connect(mapStateToProps,{updateState,loginOrganization,resetInput})(OrganizationLogin)