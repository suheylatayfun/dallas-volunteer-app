import React from "react";
import { connect } from "react-redux";
import {
  getUpcomingEvents,
  getPastEvents,
} from "../../redux/reducers/organizationReducer";
import { deleteEvent } from "./../../redux/reducers/eventReducer";
import axios from "axios";
import EditEvent from "./../event/EditEvent";
import EventVolunteerList from "../event/EventVolunteerList";
import DetailedEvent from "../event/DetailedEvent";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class OrganizationEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      isPastEventVisible: false,
      topic: "Event cancellation",
      event_id: 0,
      canEdit: false,
      showVol: false,
      isEventInfoOpen: false,
      vol_count: 0,
    };
  }
  componentDidMount() {
    // this.props.getOrganizationSession();
    const o_id = this.props.organization.o_id;
    this.props.getUpcomingEvents(o_id);
    this.props.getPastEvents(o_id);
  }

  sendEmailsToDeletedEventVolunteers = (id, o_email, topic, text) => {
    axios
      .post(
        `/send-cancellation/${id}?sender=${o_email}&topic=${topic}&text=${text}`
      )
      .then((response) => console.log(response))
      .catch((err) => {
        console.log(err);
      });
    window.alert(
      "We sent your event cancellation information to event volunteers."
    );
  };
  toggle = (id) => {
    this.setState({ canEdit: !this.state.canEdit, event_id: id });
  };
  showVol = (id, count) => {
    this.setState({
      showVol: !this.state.showVol,
      event_id: id,
      vol_count: count,
    });
  };
  openEventInfo = (id) => {
    this.setState({
      isEventInfoOpen: !this.state.isEventInfoOpen,
      event_id: id,
    });
  };

  render() {
    const moment = require("moment");
    const { topic } = this.state;
    const o_email = this.props.organization.o_email;
    const o_id = this.props.organization.o_id;
    const { upcomingEvents, pastEvents } = this.props;
    const mappedUpcomingEvent = upcomingEvents.map((el) => {
      return (
        <tbody key={el.e_id}>
          <tr>
            <td
              onClick={() => {
                this.openEventInfo(el.e_id);
              }}
            >
              <u>{el.e_title}</u>
            </td>
            <td>{el.e_address}</td>
            <td>{moment(el.e_date).format("LL")}</td>
            <td>
              {el.e_start_time}-{el.e_end_time}
            </td>
            <td>
              <button
                onClick={() => {
                  this.toggle(el.e_id);
                }}
                id="event-setting-button"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you wish to delete this event?"
                    )
                  ) {
                    this.sendEmailsToDeletedEventVolunteers(
                      el.e_id,
                      o_email,
                      topic,
                      el.e_title
                    );
                    this.props.deleteEvent(el.e_id);
                    this.props.getUpcomingEvents(o_id);
                  }
                }}
                id="event-setting-button"
              >
                Delete
              </button>
              <button
                id="event-setting-button"
                onClick={() => {
                  this.showVol(el.e_id, el.e_volunteer_count);
                }}
              >
                Volunteers
              </button>
            </td>
          </tr>
        </tbody>
      );
    });
    const mappedPastEvent = pastEvents.map((el) => {
      return (
        <tbody key={el.e_id}>
          <tr>
            <td>{el.e_title}</td>
            <td>{el.e_address}</td>
            <td>{moment(el.e_date).format("LL")}</td>
            <td>
              {el.e_start_time}-{el.e_end_time}
            </td>
          </tr>
        </tbody>
      );
    });

    return (
      <Tabs>
        <TabList>
          <Tab>Upcoming Events</Tab>
          <Tab>Past Events</Tab>
        </TabList>
        <TabPanel>
          {mappedUpcomingEvent.length !== 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Where</th>
                  <th>When</th>
                  <th>What time</th>
                  <th></th>
                </tr>
              </thead>
              {mappedUpcomingEvent}
            </table>
          ) : (
            <h4>No upcoming event</h4>
          )}
        </TabPanel>
        <TabPanel>
          {mappedPastEvent.length !== 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Where</th>
                  <th>When</th>
                  <th>What time</th>
                </tr>
              </thead>
              {mappedPastEvent}
            </table>
          ) : (
            <h4>No past event</h4>
          )}
        </TabPanel>
        {this.state.canEdit ? (
          <EditEvent toggle={this.toggle} event_id={this.state.event_id} />
        ) : null}
        {this.state.showVol ? (
          <EventVolunteerList
            showVol={this.showVol}
            event_id={this.state.event_id}
            vol_count={this.state.vol_count}
          />
        ) : null}
        {this.state.isEventInfoOpen ? (
          <DetailedEvent
            openEventInfo={this.openEventInfo}
            e_id={this.state.event_id}
          />
        ) : null}
      </Tabs>
    );
  }
}
const mapStateToProps = (reduxState) => {
  return {
    upcomingEvents: reduxState.organization.upcomingEvents,
    pastEvents: reduxState.organization.pastEvents,
    organization: reduxState.organization.organization,
  };
};
export default connect(mapStateToProps, {
  getUpcomingEvents,
  getPastEvents,
  deleteEvent,
})(OrganizationEvents);
