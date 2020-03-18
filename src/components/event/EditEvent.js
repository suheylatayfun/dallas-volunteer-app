import React from "react";
import { connect } from "react-redux";
import {
  editEvent,
  getDetailedEventForEdit,
  getDetailedEvent
} from "../../redux/reducers/eventReducer";
import { getUpcomingEvents } from "../../redux/reducers/organizationReducer";
// import {Link} from 'react-router-dom';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
let moment = require("moment");
require("dotenv").config();
const { REACT_APP_cloudName, REACT_APP_uploadPreset } = process.env;

class EditEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      e_title: "",
      e_address: "",
      e_date: 0,
      e_start_time: 0,
      e_end_time: 0,
      e_image: "",
      e_details: "",
      e_volunteer_count: "",
      event_id: 0
    };
  }
  componentDidMount() {
    this.props.getDetailedEventForEdit(this.props.event_id).then(() => {
      this.setState({
        e_title: this.props.event[0].e_title,
        e_address: this.props.event[0].e_address,
        e_date: this.props.event[0].e_date,
        e_start_time: this.props.event[0].e_start_time,
        e_end_time: this.props.event[0].e_end_time,
        e_image: this.props.event[0].e_image,
        e_details: this.props.event[0].e_details,
        e_volunteer_count: this.props.event[0].e_volunteer_count,
        event_id: this.props.event[0].e_id
      });
    });
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClick = () => {
    const {
      e_title,
      e_address,
      e_date,
      e_start_time,
      e_end_time,
      e_image,
      e_details,
      e_volunteer_count,
      event_id
    } = this.state;
    this.props.toggle();
    this.props.editEvent(
      e_title,
      e_address,
      e_date,
      e_start_time,
      e_end_time,
      e_image,
      e_details,
      e_volunteer_count,
      event_id
    );
    this.props.getDetailedEvent();
    this.props.getUpcomingEvents();
  };
  checkUploadResult = (error, event) => {
    if (event.event === "success") {
      this.setState({ e_image: event.info.url });
    }
  };
  render() {
    let widget;
    if (window.cloudinary) {
      widget = window.cloudinary.createUploadWidget(
        {
          cloudName: `${REACT_APP_cloudName}`,
          uploadPreset: `${REACT_APP_uploadPreset}`,
          sources: ["local", "url", "camera", "instagram"],
          default: false
        },
        (error, result) => {
          this.checkUploadResult(error, result);
        }
      );
    }

    const {
      e_title,
      e_address,
      e_date,
      e_start_time,
      e_end_time,
      e_image,
      e_details,
      e_volunteer_count
    } = this.state;
    return (
      <div className="edit-parent">
        <div className="edit-form">
          <h4>Event Name</h4>
          <input name="e_title" onChange={this.handleChange} value={e_title} />
          <h4>Address</h4>
          <GooglePlacesAutocomplete
            name="e_address"
            initialValue={e_address}
            placeholder=""
            onSelect={selectedResult =>
              this.setState({ e_address: selectedResult.description })
            }
            autocompletionRequest={{
              componentRestrictions: {
                country: ["us"]
              }
            }}
          />
          <h4>Event Date</h4>
          <input
            id="edit-date"
            type="date"
            name="e_date"
            onChange={this.handleChange}
            value={moment(e_date).format("YYYY-MM-DD")}
          />
          <h4>Event Start Time and End Time</h4>
          <div className="time">
            <input
              id="edit-time"
              type="time"
              name="e_start_time"
              onChange={this.handleChange}
              value={e_start_time}
            />
            --
            <input
              id="edit-time"
              type="time"
              name="e_end_time"
              onChange={this.handleChange}
              value={e_end_time}
            />
          </div>
          <button onClick={() => widget.open()}>
            Change your event image!
          </button>
          <input name="e_image" onChange={this.handleChange} value={e_image} />
          <h4>Event Details</h4>
          <textarea
            name="e_details"
            onChange={this.handleChange}
            value={e_details}
          ></textarea>
          <h4>How many volunteers are needed?</h4>
          <input
            type="number"
            min={1}
            name="e_volunteer_count"
            onChange={this.handleChange}
            value={e_volunteer_count}
          />
          <div className="button-group">
            <button onClick={() => this.props.toggle()}>Cancel</button>
            <button onClick={this.handleClick}>Save Changes</button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    event: reduxState.events.event
  };
};
export default connect(mapStateToProps, {
  editEvent,
  getDetailedEventForEdit,
  getUpcomingEvents,
  getDetailedEvent
})(EditEvent);
