import React from "react";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { getDetailedEvent } from "../../redux/reducers/eventReducer";
import {volunteerEvent} from '../../redux/reducers/volunteerReducer';
import '../../styles/DetailedEvent.scss'
import {TiDelete} from "react-icons/ti";
import {MdEmail,MdLocationOn,MdInfo} from "react-icons/md";
import {IoIosContact,IoIosPeople,IoIosTime} from "react-icons/io";
import {FaCalendarAlt,FaHandsHelping} from "react-icons/fa";
// import Nav from './../Nav';



class DetailedEvent extends React.Component {
  componentDidMount() {
      this.props.getDetailedEvent(this.props.e_id);
  }
  volunteerEvent=()=>{
    const e_id = this.props.match.params.id;
    const {v_id} = this.props.volunteer;
    this.props.volunteerEvent(v_id,e_id).then().catch(()=>window.alert("You have already volunteered for this event."))
  }
  render() {
    // console.log(this.props)
    // console.log(this.props.event)
    const mappedEvent = this.props.event.length > 0 ? this.props.event.map((el, i) => {
      return (
        <div key={el.e_id} className="detailed-event">
            <TiDelete  onClick={this.props.toggleEvent} id="delete" size={30}/>
          <h2>{el.e_title}</h2>
          <img src={el.e_image} alt="event" id="detailed-ev-image"/>

          {this.props.role === 'organization'? null : (
          <Link to="/volunteer/profile"><button onClick={this.volunteerEvent}>VOLUNTEER</button></Link> 
          )  } 
          <div className="detailed-ev-info">
          <p><MdLocationOn size={20}/>  {el.e_address}</p>
          <p><FaCalendarAlt size={18}/>  {el.e_date}</p>
          <p><IoIosTime size={20}/>  {el.e_start_time} - {el.e_end_time}</p>
          <p><MdInfo size={20}/>  {el.e_details}</p>
          <p> <FaHandsHelping size={20}/>  {el.e_volunteer_count} volunteer/s needed.</p>
          {/* <hr/> */}
          <h4>Sponsored by:</h4>
          <p><IoIosPeople size={22}/>  {el.o_name}</p>
          <p><IoIosContact size={20}/>  {el.organizer_name}</p>
          <p><MdEmail size={20}/>  {el.o_email}</p>
          </div>
          {/* <h4>Organization: {el.o_name}</h4>
          <h4>Organizer Name: {el.organizer_name}</h4> 
          <h4>Email: {el.o_email}</h4> */}
        </div>
      );
    }) : null;
    return (
      <div className="detailed-event-container">
        {/* <Nav/> */}
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
