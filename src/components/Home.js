import React from "react";
import Nav from './Nav'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getEvents} from "./../redux/reducers/eventReducer";
import {getSession} from './../redux/reducers/userReducer';

import "./../styles/Home.scss";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.getEvents();
    this.props.getSession();
  }
  render() {
    console.log(this.props.role)
    const mappedEvents = this.props.events.map((el, i) => {
      // console.log(el)
      return (
        <div key={el.e_id}className="event-container">
          <h2 className="event-title">{el.e_title}</h2>
          <Link to={`/event/${el.e_id}`}>
            <img
              src={el.e_image}
              alt="event"
              className="event-image-container"
              />
          </Link>
          <section>
            <div>
              <h4>{el.e_address}</h4>
              <h4>{el.e_date}</h4>
            </div>
            {/* <h4>{el.e_volunteer_count} spots left</h4> */}
          </section>
        </div>
      );
    });
    // const {loading}= this.props;
    return (
      <div>
        <Nav/>        
        {/* {this.props.loading? <img src='https://resources.humandx.org/static/img/loading_spinner.gif' alt='Loading..' /> : null} */}
        {this.props.role !== "organization" ? null : (
          <Link to="/add"><button>ADD YOUR EVENT</button></Link> 
          )}
       
        <h2>UPCOMING EVENTS --- {this.props.role}</h2>
     
        <div className="upcoming-events">{mappedEvents}</div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    events: reduxState.events.events,
    role: reduxState.userReducer.role
  };
};
export default connect(mapStateToProps, { getEvents,getSession})(Home);


