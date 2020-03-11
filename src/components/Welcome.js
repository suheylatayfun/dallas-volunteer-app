import React, { Component } from "react";
import Header from "./Header";
import "../styles/Welcome.scss";
import {connect} from 'react-redux'
import {getEvents} from '../redux/reducers/eventReducer';
import { IoIosPin } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import axios from 'axios';
import Footer from '../components/Footer';

class Welcome extends Component {
  constructor(){
    super();
    this.state={
      count:0
    }
  }
  componentDidMount(){
    this.props.getEvents();
    axios.get('/api/volunteer').then(response=>{
      this.setState({count:response.data})
    })
  }
  render() {
    const moment = require("moment");
    const mappedEvents = this.props.events.map((el, i) => {
      return (
        <div key={el.e_id} className="w-event-container">
          <h4 id="w-event-title">{el.e_title}</h4>
          <img
            src={el.e_image}
            alt="event"
            className="w-event-image-container"
          />
          <div>
            <p id="w-event-address">
              <IoIosPin size={15} />
              {el.e_address}
            </p>
            <p id="w-event-date">
              <MdDateRange size={14} /> {moment(el.e_date).format("LL")}
            </p>
          </div>
        </div>
      );
    })
    return (
      <div>
        <Header />
        <div className="welcome">
          
          <div className="about">
            <div className="about-info">
              <h3>About</h3>
              <p>
                Volunteering is an activity where an individual or group
                provides services for no financial or social gain "to benefit
                another person, group or organization". <span>Volevent</span> is for bringing volunteers and organizations together 
                on volunteering events.
              </p>
            </div>
          </div>
          <h2 id="opportunities">Upcoming volunteer opportunities</h2>
          <div className="w-event-parent">
          {mappedEvents}
          </div>
          <div className="how-works">
            <h2>How volevent works?</h2>
            <div className="how">
          <div id="org-how">
              <h3>Organizations</h3>
              <p>Register,</p>
              <p>Add your event,</p>
              <p>Approve  your pending Volunteers,</p>
              <p>You're done.</p>
          </div>
    
          <div id="vol-how">
              <h3>Volunteers</h3>
              <p>Register,</p>
              <p>Look at upcoming events,</p>
              <p>Volunteer an event,</p>
              <p>Wait for being approved</p>
          </div>
          </div>
          </div>
          <div className="volunteer-count">
              <h1>{this.state.count.count}</h1>
            <h3>Volunteers so far.</h3>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    events: reduxState.events.events
  };
};

export default connect(mapStateToProps, { getEvents})(Welcome);
