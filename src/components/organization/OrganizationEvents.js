import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getUpcomingEvents,
  getPastEvents
} from "../../redux/reducers/organizationReducer";
import { deleteEvent } from "./../../redux/reducers/eventReducer";

class OrganizationEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      isPastEventVisible: false
    };
  }
  componentDidMount() {
    // this.props.getOrganizationSession();
    const o_id = this.props.organization.o_id;
    this.props.getUpcomingEvents(o_id);
    this.props.getPastEvents(o_id);
  }

  switchToPastView = () => {
    this.setState({ isPastEventVisible: true });
  };
  switchToUpcomingView = () => {
    this.setState({ isPastEventVisible: false });
  };
  render() {
    const { upcomingEvents, pastEvents } = this.props;
    // console.log(upcomingEvents)
    console.log(upcomingEvents.length);
    const o_id = this.props.organization.o_id;
    const mappedUpcomingEvent = upcomingEvents.map(el => {
      return (
        <table key={el.e_id}>
          <tbody>
            <tr>
              <td>
                <Link to={`/event/${el.e_id}`}>{el.e_title}</Link>
              </td>
              <td>{el.e_address}</td>
              <td>{el.e_date}</td>
              <td>
                {el.e_start_time} -{el.e_end_time}
              </td>
              {/* <td><button>Delete this event</button></td> */}
              <td>
                <button
                  onClick={() => {
                    this.props.deleteEvent(el.e_id);
                    this.props.getUpcomingEvents(o_id);
                  }}
                >
                  Delete this event
                </button>
              </td>
              <td>
                <Link to={{
                  pathname: `/event/${el.e_id}/volunteers`,
                  state: { volunteerCount: el.e_volunteer_count }
                }}>
                  <button>Show Volunteer List</button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      );
    });
    const mappedPastEvent = pastEvents.map(el => {
      return (
        <table key={el.e_id}>
          <tbody>
            <tr>
              <td>{el.e_title}</td>
              <td>{el.e_address}</td>
              <td>{el.e_date}</td>
              <td>
                {el.e_start_time} -{el.e_end_time}
              </td>
            </tr>
          </tbody>
        </table>
      );
    });

    return (
      <div>
        <button onClick={this.switchToUpcomingView}>UPCOMING EVENTS</button>
        <button onClick={this.switchToPastView}>PAST EVENTS</button>
      
        {!this.state.isPastEventVisible ? (
          <div>
            <h3>Upcoming</h3>
            {mappedUpcomingEvent}
          </div>
        ) : (
          <div>
            <h3>Past</h3>
            {mappedPastEvent}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    upcomingEvents: reduxState.organization.upcomingEvents,
    pastEvents: reduxState.organization.pastEvents,
    organization: reduxState.organization.organization
  };
};
export default connect(mapStateToProps, {
  getUpcomingEvents,
  getPastEvents,
  deleteEvent
})(OrganizationEvents);
