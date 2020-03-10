import React from "react";
import Nav from "./Nav";
import { connect } from "react-redux";
import { getEvents } from "./../redux/reducers/eventReducer";
import { getSession } from "./../redux/reducers/userReducer";
import "./../styles/Home.scss";
import DetailedEvent from "../components/event/DetailedEvent";
import { IoIosPin } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import AddEvent from '../components/event/AddEvent';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isEventOpen: false,
      isAddEventOpen: false,
      e_id: 0
    };
  }
  componentDidMount() {
    this.props.getSession();
    this.props.getEvents();
  }
  toggleEvent = id => {
    this.setState({ isEventOpen: !this.state.isEventOpen, e_id: id });
  };
  toggleAddEvent= id =>{
    this.setState({isAddEventOpen:!this.state.isAddEventOpen})
  }
  render() {
    const moment = require("moment");
    console.log(this.props.role);
    const mappedEvents = this.props.events.map((el, i) => {
      // console.log(el)
      return (
        <div key={el.e_id} className="event-container" onClick={() => this.toggleEvent(el.e_id)}>
          <h3 id="event-title">{el.e_title}</h3>
          <img
            src={el.e_image}
            alt="event"
            className="event-image-container"
          />
          <div>
            <p id="event-address">
              <IoIosPin size={18} />
              {el.e_address}
            </p>
            <p id="event-date">
              <MdDateRange size={16} /> {moment(el.e_date).format("LL")}
            </p>
          </div>
        </div>
      );
    });
    return (
      <div className="parent-parent-event-container">
        <Nav />
        <div className="parent-event-container">
          {this.props.role !== "organization" ? null : (
              <button id="event-add-button" onClick={this.toggleAddEvent}>ADD YOUR EVENT</button>
          )}
          <h2 id="upcoming">UPCOMING EVENTS</h2>
          <div className="upcoming-events">{mappedEvents}</div>
        </div>
        {this.state.isEventOpen ? (
          <DetailedEvent
            toggleEvent={this.toggleEvent}
            e_id={this.state.e_id}
          />
        ) : null}
        {this.state.isAddEventOpen?(
          <AddEvent
          toggleAddEvent={this.toggleAddEvent}
          />
        ):null}
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
export default connect(mapStateToProps, { getEvents, getSession })(Home);
