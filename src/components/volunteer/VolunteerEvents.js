import React from "react";
import { connect } from "react-redux";
import {
  getPendingEvents,
  getApprovedEvents,
  getPastEvents
} from "./../../redux/reducers/volunteerReducer";

class VolunteerEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      eventView: "pending"
    };
  }
  componentDidMount() {
    const v_id = this.props.volunteer.v_id;
    this.props.getPendingEvents(v_id);
    this.props.getApprovedEvents(v_id);
    this.props.getPastEvents(v_id);
  }
  render() {
    const moment = require('moment');
    const { pendingEvents, approvedEvents, pastEvents} = this.props;
    const mappedPendingEvent = pendingEvents.map(el => {
      return (
        <tbody key={el.e_id}>
          <tr>
            <td>{el.e_title}</td>
            <td>{moment(el.e_date).format('LL')}</td>
            <td>
              {el.e_start_time} - {el.e_end_time}
            </td>
            <td>{el.e_address}</td>
            <td>{el.approved.toString()}</td>
          </tr>
        </tbody>
      );
    });
    const mappedApprovedEvent = approvedEvents.map(el => {
      return (
        <tbody key={el.e_id}>
          <tr key={el.e_id}>
            <td>{el.e_title}</td>
            <td>{moment(el.e_date).format('LL')}</td>
            <td>
              {el.e_start_time} - {el.e_end_time}
            </td>
            <td>{el.e_address}</td>
            <td>{el.approved.toString()}</td>
          </tr>
        </tbody>
      );
    });
    const mappedPastEvent = pastEvents.map(el => {
      return (
        <tbody key={el.e_id}>
          <tr>
            <td>{el.e_title}</td>
            <td>{moment(el.e_date).format('LL')}</td>
            <td>
              {el.e_start_time} - {el.e_end_time}
            </td>
            <td>{el.e_address}</td>
          </tr>
        </tbody>
      );
    });
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ eventView: "pending" });
          }}
        >
          Pending Events
        </button>
        <button
          onClick={() => {
            this.setState({ eventView: "approved" });
          }}
        >
          Approved Events
        </button>
        <button
          onClick={() => {
            this.setState({ eventView: "past" });
          }}
        >
          Past Events
        </button>
        {this.state.eventView === "pending" ? (
          <div>
              <h3>Volunteer Pending Events</h3>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>When</th>
                  <th>What time</th>
                  <th>Where</th>
                  <th>Approved</th>
                </tr>
              </thead>
              {mappedPendingEvent}
            </table>
          </div>
        ) : this.state.eventView === "approved" ? (
          <div>
              <h3>Volunteer Approved Events</h3>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>When</th>
                  <th>What time</th>
                  <th>Where</th>
                  <th>Approved</th>
                </tr>
              </thead>
              {mappedApprovedEvent}
            </table>
          </div>
        ) : this.state.eventView === "past" ? (
          <div>
              <h3>Volunteer Past Events</h3>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>When</th>
                  <th>What time</th>
                  <th>Where</th>
                </tr>
              </thead>
              {mappedPastEvent}
            </table>
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    pendingEvents: reduxState.volunteer.pendingEvents,
    approvedEvents: reduxState.volunteer.approvedEvents,
    pastEvents: reduxState.volunteer.pastEvents,
    volunteer: reduxState.volunteer.volunteer
  };
};
export default connect(mapStateToProps, {
  getPendingEvents,
  getApprovedEvents,
  getPastEvents
})(VolunteerEvents);
