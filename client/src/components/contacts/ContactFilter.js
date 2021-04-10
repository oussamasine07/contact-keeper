import React, { useRef, useContext, useEffect } from "react";

import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);

    const { filtered, clearFilter, filterContacts } = contactContext;

    const text = useRef("");

    useEffect(() => {
        if (filtered === null) {
           text.current.value = ""; 
        }
    });

    const onChange = e => {
        if (text.current.value !== "") {
            filterContacts(e.target.value)
        } else {
            clearFilter();
        }
    }

    return(
        <form>
            <input placeholder="search contacts" type="text" ref={text} onChange={onChange} />
        </form>
    );
}

export default ContactFilter;