import React from "react";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { getDetailedEvent } from "../../redux/reducers/eventReducer";
import {volunteerEvent} from '../../redux/reducers/volunteerReducer';
import Nav from './../Nav';


class DetailedEvent extends React.Component {
  componentDidMount() {
      this.props.getDetailedEvent(this.props.match.params.id);
  }
  volunteerEvent=()=>{
    const e_id = this.props.match.params.id;
    const {v_id} = this.props.volunteer;
    this.props.volunteerEvent(v_id,e_id).then().catch(()=>window.alert("You have already volunteered for this event."))
  }
  render() {
    const mappedEvent = this.props.event.map((el, i) => {
      return (
        <div key={el.e_id}>
          <h2>{el.e_title}</h2>
          <img src={el.e_image} alt="event" />

          {this.props.role === 'organization'? null : (
          <Link to="/volunteer/profile"><button onClick={this.volunteerEvent}>VOLUNTEER</button></Link> 
          )  } 

          <h4>Address:{el.e_address}</h4>
          <h4>Date: {el.e_date}</h4>
          <h4>Time: {el.e_start_time}-{el.e_end_time}</h4>
          <h4>Details: {el.e_details}</h4>
          <h4>{el.e_volunteer_count} volunteer/s needed.</h4>

          <hr/>
          <h4>Organization: {el.o_name}</h4>
          <h4>Organizer Name: {el.organizer_name}</h4> 
          <h4>Email: {el.o_email}</h4>
           
        </div>
      );
    });
    return (
      <div>
        <Nav/>
        {mappedEvent}
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    event: reduxState.events.event,
    volunteer:reduxState.volunteer.volunteer,
    role: reduxState.userReducer.role,
    
  };
};
export default connect(mapStateToProps, { getDetailedEvent,volunteerEvent })(DetailedEvent);
