import React from "react";
import { connect } from "react-redux";
import {
  getPendingEvents,
  getApprovedEvents,
  getPastEvents,
} from "./../../redux/reducers/volunteerReducer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class VolunteerEvents extends React.Component {
  componentDidMount() {
    const v_id = this.props.volunteer.v_id;
    this.props.getPendingEvents(v_id);
    this.props.getApprovedEvents(v_id);
    this.props.getPastEvents(v_id);
  }
  render() {
    const moment = require("moment");
    const { pendingEvents, approvedEvents, pastEvents } = this.props;
    const mappedPendingEvent = pendingEvents.map((el) => {
      return (
        <tbody key={el.e_id}>
          <tr>
            <td>{el.e_title}</td>
            <td>{moment(el.e_date).format("LL")}</td>
            <td>
              {el.e_start_time}-{el.e_end_time}
            </td>
            <td>{el.e_address}</td>
            <td>{el.approved === true ? "yes" : "no"}</td>
          </tr>
        </tbody>
      );
    });
    const mappedApprovedEvent = approvedEvents.map((el) => {
      return (
        <tbody key={el.e_id}>
          <tr>
            <td>{el.e_title}</td>
            <td>{moment(el.e_date).format("LL")}</td>
            <td>
              {el.e_start_time}-{el.e_end_time}
            </td>
            <td>{el.e_address}</td>
            <td>{el.approved === true ? "yes" : "no"}</td>
          </tr>
        </tbody>
      );
    });
    const mappedPastEvent = pastEvents.map((el) => {
      return (
        <tbody key={el.e_id}>
          <tr>
            <td>{el.e_title}</td>
            <td>{moment(el.e_date).format("LL")}</td>
            <td>
              {el.e_start_time}-{el.e_end_time}
            </td>
            <td>{el.e_address}</td>
            <td>{el.approved === true ? "yes" : "no"}</td>
          </tr>
        </tbody>
      );
    });
    return (
      <Tabs>
        {/* <TabList className="event-type-buttons"> */}
        <TabList>
          <Tab>Pending Events</Tab>
          <Tab>Approved Events</Tab>
          <Tab>Past Events</Tab>
        </TabList>
        <TabPanel>
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
            <h4>No pending event</h4>
          )}
        </TabPanel>
        <TabPanel>
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
            <h4>No approved event</h4>
          )}
        </TabPanel>

        <TabPanel>
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
        </TabPanel>
      </Tabs>
    );
  }
}
const mapStateToProps = (reduxState) => {
  return {
    pendingEvents: reduxState.volunteer.pendingEvents,
    approvedEvents: reduxState.volunteer.approvedEvents,
    pastEvents: reduxState.volunteer.pastEvents,
    volunteer: reduxState.volunteer.volunteer,
  };
};
export default connect(mapStateToProps, {
  getPendingEvents,
  getApprovedEvents,
  getPastEvents,
})(VolunteerEvents);
