import axios from "axios";

const initialState = {
  v_email: "",
  v_password: "",
  v_name: "",
  v_location: "",
  v_image: "",
  v_why_interested_in_volunteering: "",
  v_been_a_volunteer_before: "",
  v_interests: "",
  volunteer: [],
  loading: false,
  v_role: "",
  approved: "",
  pendingEvents: [],
  approvedEvents: [],
  pastEvents: []
};
//CONSTANTS
const UPDATE_STATE = "UPDATE_STATE";
const REGISTER_VOLUNTEER = "REGISTER_VOLUNTEER";
const LOGIN_VOLUNTEER = "LOGIN_VOLUNTEER";
const VOLUNTEER_EVENT = "VOLUNTEER_EVENT";
const GET_PENDING_EVENTS = "GET_PENDING_EVENTS";
const GET_APPROVED_EVENTS = "GET_APPROVED_EVENTS";
const GET_PAST_EVENTS = "GET_PAST_EVENTS";
const GET_VOLUNTEER_SESSION = "GET_VOLUNTEER_SESSION";
const EDIT_VOLUNTEER_INFO = "EDIT_VOLUNTEER_INFO";
const ACCEPT_VOLUNTEER = 'ACCEPT_VOLUNTEER';
const DECLINE_VOLUNTEER = 'DECLINE_VOLUNTEER';

//ACTION CREATOR
export function declineVolunteer(id){
  return{
    type: DECLINE_VOLUNTEER,
    payload: axios.delete(`/api/event/volunteer/${id}`)
  }
}
export function acceptVolunteer(v_id,e_id,approved){
  return{
    type: ACCEPT_VOLUNTEER,
    payload: axios.put(`/api/event/volunteer/accept`,{
      v_id:v_id,
      e_id:e_id,
      approved:approved
    })
  }
}
export function editVolunteerInfo(
  v_email,
  v_name,
  v_location,
  v_image,
  v_why_interested_in_volunteering,
  v_been_a_volunteer_before,
  v_interests,
  v_id
) {
  return {
    type: EDIT_VOLUNTEER_INFO,
    payload: axios.put("/api/volunteer/edit", {
      v_email,
      v_name,
      v_location,
      v_image,
      v_why_interested_in_volunteering,
      v_been_a_volunteer_before,
      v_interests,
      v_id
    })
  };
}
export function getVolunteerSession() {
  return {
    type: GET_VOLUNTEER_SESSION,
    payload: axios.get(`/auth/session`)
  };
}
export function getPastEvents() {
  return {
    type: GET_PAST_EVENTS,
    payload: axios.get(`/api/volunteer/past`)
  };
}
export function getApprovedEvents() {
  return {
    type: GET_APPROVED_EVENTS,
    payload: axios.get(`/api/volunteer/approved`)
  };
}
export function getPendingEvents() {
  return {
    type: GET_PENDING_EVENTS,
    payload: axios.get(`/api/volunteer/pending`)
  };
}
export function volunteerEvent(v_id, e_id, approved) {
  return {
    type: VOLUNTEER_EVENT,
    payload: axios.post("/api/volunteer/event", {
      v_id: v_id,
      e_id: e_id,
      approved: approved
    })
  };
}
export function updateState(e) {
  return {
    type: UPDATE_STATE,
    payload: e
  };
}
export function registerVolunteer(
  v_email,
  v_password,
  v_name,
  v_location,
  v_image,
  v_why_interested_in_volunteering,
  v_been_a_volunteer_before,
  v_interests
) {
  return {
    type: REGISTER_VOLUNTEER,
    payload: axios.post("/auth/volunteer", {
      v_email: v_email,
      v_password: v_password,
      v_name: v_name,
      v_location: v_location,
      v_image: v_image,
      v_why_interested_in_volunteering: v_why_interested_in_volunteering,
      v_been_a_volunteer_before: v_been_a_volunteer_before,
      v_interests: v_interests
    })
  };
}

export function loginVolunteer(v_email, v_password) {
  return {
    type: LOGIN_VOLUNTEER,
    payload: axios.post("/auth/login/volunteer", {
      v_email: v_email,
      v_password: v_password
    })
  };
}

//REDUCER

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${DECLINE_VOLUNTEER}_FULFILLED`:
      return{
        ...state,
        loading:false
      }
    case `${ACCEPT_VOLUNTEER}_FULFILLED`:
      return{
        ...state,
        approved: payload.data,
        loading:false
      }
    case `${EDIT_VOLUNTEER_INFO}_FULFILLED`:
      return {
        ...state,
        loading:false,
        volunteer: payload.data
      };
    case `${GET_VOLUNTEER_SESSION}_FULFILLED`:
      return {
        ...state,
        loading: false,
        volunteer: payload.data
      };
    case `${GET_PAST_EVENTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        pastEvents: payload.data
      };
    case `${GET_APPROVED_EVENTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        approvedEvents: payload.data
      };
    case `${GET_PENDING_EVENTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        pendingEvents: payload.data
      };
    case `${VOLUNTEER_EVENT}_FULFILLED`:
      return {
        ...state,
        approved: payload.data,
        loading: false
      };
    case UPDATE_STATE:
      return {
        ...state,
        ...payload
      };
    case `${REGISTER_VOLUNTEER}_FULFILLED`:
      return {
        ...state,
        loading: false
      };
    case `${LOGIN_VOLUNTEER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${LOGIN_VOLUNTEER}_FULFILLED`:
      return {
        ...state,
        loading: false,
        volunteer: payload.data
      };
    default:
      return state;
  }
}
