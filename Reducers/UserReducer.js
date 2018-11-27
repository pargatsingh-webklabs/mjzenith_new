import {
    CURRENT_USER,
    NOTIFICATIONS,
    INBOX,
    ALL_USER
 } from '../Actions/types';

 const INITAL_STATE = {
    currentUser: null,
    notifications: null,
    inbox: [],
    allUsers: []
 }

 export default ( state = INITAL_STATE, action) => {
     switch (action.type) {
         case CURRENT_USER:
            return { ...state, currentUser: action.user }
        case NOTIFICATIONS:
            return { ...state, notifications: action.notifications}
        case ALL_USER:
                return { ...state, allUsers: action.payload.allUsers}
        case INBOX:
            return { ...state, inbox: [...state.inbox, action.inbox]}
         default:
             return state;
     }
 }
