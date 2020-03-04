import React from 'react';
import {connect} from 'react-redux';
import {updateState,addEvent,getEvents} from '../../redux/reducers/eventReducer';
import {Redirect,Link} from 'react-router-dom';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

class AddEvent extends React.Component{
    constructor(){
        super();
        this.state={
            shouldRedirect:false
        }
    }
    handleChange = (e)=>{
        this.props.updateState({ [e.target.name]: e.target.value });
    }
    handleClick = ()=>{
        const {e_title,e_address,e_date,e_start_time,e_end_time,e_image,e_details,e_volunteer_count} = this.props.events;
        this.props.addEvent(e_title,e_address,e_date,e_start_time,e_end_time,e_image,e_details,e_volunteer_count,this.props.id)
        this.props.getEvents();
        this.setState({shouldRedirect:true})
    }
   
    render(){
        // console.log(this.props.events)
        if(this.state.shouldRedirect){
            return <Redirect to="/home"/>
          }
        return(
            <div>
                <h3>EVENT REGISTER</h3>
                <div>
                <h3 >Event Name</h3>
                <input name="e_title" onChange={this.handleChange}/>
                <h3>Address</h3>
                <GooglePlacesAutocomplete 
                name="e_address"
                placeholder="event address"
                onSelect={(selectedResult) => this.props.updateState({e_address: selectedResult.description })}
                autocompletionRequest={{
                    componentRestrictions: {
                      country: ['us'],
                    }
                  }}
                />
                {/* <input name="e_address" onChange={this.handleChange}/> */}
                <h3>Event Date</h3>
                <input type="date" name="e_date" onChange={this.handleChange}/>
                <h3>Event Start Time and End Time</h3>
                <input type="time" name="e_start_time" onChange={this.handleChange}/>-- 
                <input type="time" name="e_end_time" onChange={this.handleChange}/>
                <h3>Event Image</h3>
                <input name="e_image" onChange={this.handleChange}/>
                <h3>Event Details</h3>
                <textarea name="e_details" onChange={this.handleChange}></textarea>
                <h3>How many volunteers are needed?</h3>
                <input type="number" min={1} name="e_volunteer_count" onChange={this.handleChange}/>
                <Link to="/home"><button>Cancel</button></Link>
                <button onClick={this.handleClick}>Save Changes</button>
                </div>
            </div>
            //ORGANIZATION ID
        )
    }
}
const mapStateToProps=reduxState=>{
    return{
        events:reduxState.events,
      
        // e_title:reduxState.events.e_title,
        // e_address:reduxState.events.e_address,
        // e_date:reduxState.events.e_date,
        // e_start_time:reduxState.events.e_start_time,
        // e_end_time:reduxState.events.e_end_time       
    }

}
export default connect(mapStateToProps,{updateState,addEvent,getEvents})(AddEvent);