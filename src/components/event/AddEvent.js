import React from "react";
import { connect } from "react-redux";
import {
  updateState,
  addEvent,
  getEvents
} from "../../redux/reducers/eventReducer";
import { Redirect } from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "../../styles/Login.scss";
require("dotenv").config();
const { REACT_APP_cloudName, REACT_APP_uploadPreset } = process.env;

class AddEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect: false,
      e_image: ""
    };
  }
  componentDidMount() {
    this.setState({
      e_image: this.props.events.e_image
    });
  }
  handleChange = e => {
    this.props.updateState({ [e.target.name]: e.target.value });
  };
  handleClick = () => {
    const {
      e_title,
      e_address,
      e_date,
      e_start_time,
      e_end_time,
      e_details,
      e_volunteer_count
    } = this.props.events;
    this.props.addEvent(
      e_title,
      e_address,
      e_date,
      e_start_time,
      e_end_time,
      this.state.e_image,
      e_details,
      e_volunteer_count,
      this.props.id
    );
    this.props.getEvents();
    this.setState({ shouldRedirect: true });
  };
  checkUploadResult = (error, event) => {
    if (event.event === "success") {
      this.setState({ e_image: event.info.url });
    }
  };

  render() {
    if (this.state.shouldRedirect) {
      return <Redirect to="/home" />;
    }
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
    return (
      <div className="register-parent">
        <div className="register-form">
          <h3>EVENT REGISTER</h3>
          <h4>Event Name</h4>
          <input name="e_title" onChange={this.handleChange} />
          <h4>Address</h4>
          <GooglePlacesAutocomplete
            name="e_address"
            placeholder=""
            onSelect={selectedResult =>
              this.props.updateState({ e_address: selectedResult.description })
            }
            autocompletionRequest={{
              componentRestrictions: {
                country: ["us"]
              }
            }}
          />
          <h4>Event Date</h4>
          <input
            id="date"
            type="date"
            name="e_date"
            onChange={this.handleChange}
          />
          <h4>Event Start Time and End Time</h4>
          <div className="time-input">
            <input
              id="time"
              type="time"
              name="e_start_time"
              onChange={this.handleChange}
            />
            --
            <input
              id="time"
              type="time"
              name="e_end_time"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={() => widget.open()}>Add your event image!</button>
          <input name="e_image" value={this.state.e_image} />
          <h4>Event Details</h4>
          <textarea name="e_details" onChange={this.handleChange}></textarea>
          <h4>How many volunteers are needed?</h4>
          <input
            type="number"
            min={1}
            name="e_volunteer_count"
            onChange={this.handleChange}
          />
          <div className="button-group">
            <button onClick={this.handleClick}>Save Changes</button>
            <button onClick={this.props.toggleAddEvent}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    events: reduxState.events
  };
};
export default connect(mapStateToProps, { updateState, addEvent, getEvents })(
  AddEvent
);
