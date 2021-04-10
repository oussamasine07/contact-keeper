import React, {  useContext, Fragment, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import { TransitionGroup, CSSTransition } from "react-transition-group"

import ContactItem from "./ContactItem";
import Spinner from "../layouts/Spinner";


const Contacts = () => {
    const contextContact = useContext(ContactContext)
    const { contacts, filtered, getAllContacts, loading } = contextContact;

    useEffect(() => {
        getAllContacts();
        // eslint-disable-next-line
    }, []);

    if (contacts !== null && contacts.length === 0 && loading === true) {
        return (<div>Please add contacts</div>);
    } 

    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                {filtered !== null ? (filtered.map(contact => 
                    <CSSTransition key={contact._id} timeout={500} className="item">
                        <ContactItem contact={contact} />
                    </CSSTransition>
                    )) : ( contacts.map(contact => 
                    <CSSTransition key={contact._id} timeout={500} className="item" >
                        <ContactItem contact={contact} />
                    </CSSTransition>
                    ))}
            </TransitionGroup>
            ) : <Spinner/> }
             
        </Fragment>
    );
}

export default Contacts;