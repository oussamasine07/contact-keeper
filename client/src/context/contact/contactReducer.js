import {
    GET_CONTACTS,
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    SET_CONTACT,
    CLEAR_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    CLEAR_CONTACTS
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [ ...state.contacts, action.payload ]
            };
        case SET_CONTACT:
            return {
                ...state,
                current: action.payload
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
            }
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regexp = new RegExp( `${action.payload}`, "gi" );
                    return contact.name.match(regexp) || contact.email.match(regexp);
                })
            }
        case CLEAR_CONTACT:
            return {
                ...state,
                current: null
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload )
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_CONTACTS: 
            return {
                ...state,
                contacts: null,
                filtered: null,
                loading: true,
                current: null,
                error: null
            }
        default:
            return state
    }
}