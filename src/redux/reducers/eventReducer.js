import axios from "axios";

const initialState = {
  e_title: "",
  e_address: "",
  e_date: "",
  e_start_time: 0,
  e_end_time: 0,
  e_image: "",
  e_details: "",
  e_volunteer_count:0,
  o_id: 0,
  events: [],
  o_name: "",
  o_email: "",
  o_password: "",
  o_location: "",
  organizer_name: "",
  e_id: 0,
  event: [],
  pendingVolunteers:[],
  eventVolunteers:[],
  loading: false
};
//CONSTANTS
const GET_EVENTS = "GET_EVENTS";
const UPDATE_STATE = 'UPDATE_STATE';
const GET_DETAILED_EVENT = "GET_DETAILED_EVENT";
const GET_DETAILED_EVENT_FOR_EDIT = "GET_DETAILED_EVENT_FOR_EDIT";
const ADD_EVENT = 'ADD_EVENT';
const GET_PENDING_VOLUNTEERS = 'GET_PENDING_VOLUNTEERS';
const GET_EVENT_VOLUNTEERS = 'GET_EVENT_VOLUNTEERS';
const DELETE_EVENT = 'DELETE_EVENT';
const EDIT_EVENT = 'EDIT_EVENT';

//ACTION CREATOR
export function editEvent(e_title,e_address,e_date,e_start_time,e_end_time,e_image,e_details,e_volunteer_count,e_id){
  return{
    type:EDIT_EVENT,
    payload: axios.put(`/api/event/${e_id}`,{
      e_title,e_address,e_date,e_start_time,e_end_time,e_image,e_details,e_volunteer_count,e_id
    })
}
}
export function deleteEvent(e_id){
  return{
    type: DELETE_EVENT,
    payload: axios.delete(`/api/event/${e_id}`)
  }
}
export function getPendingVolunteers(e_id){
  let data = axios.get(`/api/event/${e_id}/pending`);
  return{
    type: GET_PENDING_VOLUNTEERS,
    payload:data
  }
}
export function getEventVolunteers(e_id){
  let data = axios.get(`/api/event/${e_id}/volunteer`);
  return{
    type: GET_EVENT_VOLUNTEERS,
    payload:data
  }
}

export function getEvents() {
  let data = axios.get("/api/events")
  return {
    type: GET_EVENTS,
    payload: data
  };
}
export function getDetailedEvent(id) {
  let data = axios.get(`/api/event/${id}`)
  return {
    type: GET_DETAILED_EVENT,
    payload: data
  };
}
export function getDetailedEventForEdit(id) {
  let data = axios.get(`/api/event/edit/${id}`)
  return {
    type: GET_DETAILED_EVENT_FOR_EDIT,
    payload: data
  };
}
export function updateState(e){
    return{
        type:UPDATE_STATE,
        payload: e
    }
}
export function addEvent(e_title,e_address,e_date,e_start_time,e_end_time,e_image,e_details,e_volunteer_count,o_id){
  let event = axios.post('/api/events',{e_title,e_address,e_date,e_start_time,e_end_time,e_image,e_details,e_volunteer_count,o_id});
  return{
    type:ADD_EVENT,
    payload:event
  }
}

//REDUCER
export default function eventReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${EDIT_EVENT}_FULFILLED`:
      return{
        ...state,
        loading:false,
        event: payload.data
      }

    case `${DELETE_EVENT}_FULFILLED`:
      return{
        ...state,
        loading: false
      }
    case `${GET_EVENT_VOLUNTEERS}_FULFILLED`:
      return{
        ...state,
        eventVolunteers: payload.data,
        loading:false
      }
    case `${GET_PENDING_VOLUNTEERS}_FULFILLED`:
      return{
        ...state,
        pendingVolunteers:payload.data,
        loading: false
      }
    case UPDATE_STATE:
      return {
        ...state,
        ...payload
      };
    case `${GET_EVENTS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_EVENTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        events: payload.data
      };
    case `${GET_DETAILED_EVENT}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_DETAILED_EVENT}_FULFILLED`:
      return {
        ...state,
        loading:false,
        event: payload.data
      };
    case `${GET_DETAILED_EVENT_FOR_EDIT}_FULFILLED`:
      return {
        ...state,
        loading:false,
        event: payload.data
      };
    case `${ADD_EVENT}_PENDING`:
      return{
        ...state,
        loading:true
      }  
    case `${ADD_EVENT}_FULFILLED`:
      return{
        ...state,
        loading:false
      }  
    default:
      return state;
  }
}
