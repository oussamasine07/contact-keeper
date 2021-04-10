import React, { useReducer } from "react";
import axios from "axios";

import ContextContact from "./contactContext";
import contactReducer from "./contactReducer";

import {
    GET_CONTACTS,
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    SET_CONTACT,
    CLEAR_CONTACT,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    FILTER_CONTACTS,
    CONTACT_ERROR
} from "../types";

const ContactState = props => {

    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null,
        loading: true
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // get all contacts
    const getAllContacts = async () => {

        try {
            const res = await axios.get("/api/contacts");
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.msg
            });
        }

    }

    // Add contact 
    const addContact = async contact => {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }

        try {
            const res = await axios.post("/api/contacts", contact, config);
            
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.msg
            });
        }

    }

    // update contact
    const updateContact = async contact => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.msg
            });
        }  
    }
    
    // set Current Contact
    const setCurrentContact = (current) => {
        dispatch({
            type: SET_CONTACT,
            payload: current
        });
    }

    // filter contacts
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        });
    }

    // clear filtered contacts
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }

    // clear contact
    const clearContact = () => {
        dispatch({type: CLEAR_CONTACT});
    }

    // Delete Contact
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`)
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.msg
            });
        }
    }

    // clear contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    return (
        <ContextContact.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            loading: state.loading,
            getAllContacts,
            addContact,
            setCurrentContact,
            updateContact,
            clearContact,
            filterContacts,
            clearFilter,
            deleteContact,
            clearContacts
        }}>
            {props.children}
        </ContextContact.Provider>
    );

}

export default ContactState;