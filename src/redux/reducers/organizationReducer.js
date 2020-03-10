import axios from "axios";

const initialState = {
  loading: false,
  o_name: "",
  o_email: "",
  o_password: "",
  o_location: "",
  organizer_name: "",
  o_image: "",
  o_role: "",
  organization: [],
  upcomingEvents: [],
  pastEvents: []
};
//CONSTANTS
const UPDATE_STATE = "UPDATE_STATE";
const REGISTER_ORGANIZATION = "REGISTER_ORGANIZATION";
const RESET_INPUT = "RESET_INPUT";
const LOGIN_ORGANIZATION = "LOGIN_ORGANIZATION";
const GET_ORGANIZATION_SESSION = "GET_ORGANIZATION_SESSION";
const GET_UPCOMING_EVENTS = "GET_UPCOMING_EVENTS";
const GET_PAST_EVENTS = "GET_PAST_EVENTS";
const EDIT_ORGANIZATION_INFO = 'EDIT_ORGANIZATION_INFO';

//ACTION CREATOR
export function editOrganizationInfo(o_name,o_email,o_location,organizer_name,o_image,o_id){
  return{
    type:EDIT_ORGANIZATION_INFO,
    payload: axios.put("/api/organization/edit",{o_name,o_email,o_location,organizer_name,o_image,o_id
    })
  }
}
export function getPastEvents() {
  return {
    type: GET_PAST_EVENTS,
    payload: axios.get("/api/organization/past")
  };
}
export function getUpcomingEvents() {
  return {
    type: GET_UPCOMING_EVENTS,
    payload: axios.get("/api/organization/upcoming")
  };
}
export function getOrganizationSession() {
  return {
    type: GET_ORGANIZATION_SESSION,
    payload: axios.get("/auth/session")
  };
}
export function updateState(e) {
  return {
    type: UPDATE_STATE,
    payload: e
  };
}
export const registerOrganization = (
  o_name,
  o_email,
  o_password,
  o_location,
  organizer_name,
  o_image
) => {
  return {
    type: REGISTER_ORGANIZATION,
    payload: axios.post("/auth/organization", {
      o_name,
      o_email,
      o_password,
      o_location,
      organizer_name,
      o_image
    })
  };
};
export function loginOrganization(o_email, o_password) {
  return {
    type: LOGIN_ORGANIZATION,
    payload: axios.post("/auth/login/organization", {
      o_email,
      o_password
    })
  };
}

//REDUCER
export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${EDIT_ORGANIZATION_INFO}_FULFILLED`:
      return{
        ...state,
        loading:false,
        organization: payload.data
      }
    case `${GET_PAST_EVENTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        pastEvents: payload.data
      };
    case `${GET_UPCOMING_EVENTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        upcomingEvents: payload.data
      };
    case `${GET_ORGANIZATION_SESSION}_FULFILLED`:
      return {
        ...state,
        loading: false,
        organization: payload.data
      };
    case UPDATE_STATE:
      return {
        ...state,
        ...payload
      };
    case RESET_INPUT:
      return {
        ...state
      };
    case `${REGISTER_ORGANIZATION}_FULFILLED`:
      return {
        ...state,
        loading: false,
        organization: payload.data
      };
    case `${LOGIN_ORGANIZATION}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${LOGIN_ORGANIZATION}_FULFILLED`:
      return {
        ...state,
        loading: false,
        organization: payload.data
      };

    default:
      return state;
  }
}
