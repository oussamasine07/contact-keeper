import React, { useContext } from "react";
import Proptypes from "prop-types";

import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact }) => {
    
    const contactContext = useContext(ContactContext);

    const { deleteContact, setCurrentContact} = contactContext;
    
    const { _id, name, email, phone, type } = contact;
    
    const onDeleteClick = () => {
        deleteContact(_id);
    }


    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name} {" "} <strong style={{ float: "right" }} className={"badge " + (type === "personal" ? "badge-primary" : "badge-success")}>{type.charAt(0).toUpperCase() + type.slice(1)}</strong>
            </h3>
            <ul className="list">
                {email && <li>
                        <i className="fas fa-envelope-open"></i>
                        {" "} {email}
                    </li>}
                {phone && <li>
                        <i className="fas fa-phone"></i>
                        {" "} {phone}
                    </li>}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrentContact(contact)}> Edit </button>
                <button onClick={onDeleteClick} className="btn btn-danger btn-sm"> Delete </button>
            </p>
        </div>
    );
}

ContactItem.propTypes = {
    contact: Proptypes.object.isRequired
}

export default ContactItem;