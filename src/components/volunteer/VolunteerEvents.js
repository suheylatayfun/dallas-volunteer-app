import React from "react";
import { connect } from "react-redux";
import {
  getPendingEvents,
  getApprovedEvents,
  getPastEvents
} from "./../../redux/reducers/volunteerReducer";
import "../../styles/Events.scss";

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
    const moment = require("moment");
    const { pendingEvents, approvedEvents, pastEvents } = this.props;
    const mappedPendingEvent = pendingEvents.map(el => {
      return (
        <tbody key={el.e_id}>
          <tr>
            <td>{el.e_title}</td>
            <td>{moment(el.e_date).format("LL")}</td>
            <td>
              {el.e_start_time} - {el.e_end_time}
            </td>
            <td>{el.e_address}</td>
            <td>{el.approved === true? 'yes':'no'}</td>
          </tr>
        </tbody>
      );
    });
    const mappedApprovedEvent = approvedEvents.map(el => {
      return (
        <tbody key={el.e_id}>
          <tr key={el.e_id}>
            <td>{el.e_title}</td>
            <td>{moment(el.e_date).format("LL")}</td>
            <td>
              {el.e_start_time} - {el.e_end_time}
            </td>
            <td>{el.e_address}</td>
            <td>{el.approved === true? 'yes': 'no'}</td>
          </tr>
        </tbody>
      );
    });
    const mappedPastEvent = pastEvents.map(el => {
      return (
        <tbody key={el.e_id}>
          <tr>
            <td>{el.e_title}</td>
            <td>{moment(el.e_date).format("LL")}</td>
            <td>
              {el.e_start_time} - {el.e_end_time}
            </td>
            <td>{el.e_address}</td>
            <td>{el.approved === true? 'yes': 'no'}</td>
          </tr>
        </tbody>
      );
    });
    return (
      <div className="event-table-parent">
        <div className="event-type-buttons">
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
        </div>
        {this.state.eventView === "pending" ? (
          <div className="event-table">
            {mappedPendingEvent.length !== 0 ? (
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
            ) : (
              <h4>No Pending event</h4>
            )}
          </div>
        ) : this.state.eventView === "approved" ? (
          <div className="event-table">
            {mappedApprovedEvent.length !== 0 ? (
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
            ) : (
              <h4>No pending event</h4>
            )}
          </div>
        ) : this.state.eventView === "past" ? (
          <div className="event-table">
            {mappedPastEvent.length !== 0 ? (
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
                {mappedPastEvent}
              </table>
            ) : (
              <h4>No past event</h4>
            )}
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
