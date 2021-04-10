import React, { useContext, useState, useEffect } from "react";


import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
    
    const contactContext  = useContext(ContactContext);
    
    const { addContact, current, clearContact, updateContact } = contactContext;

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        type: "personal"
    });

    const { name, email, phone, type } = contact;

    useEffect(() => {
        if (current) {
            setContact(current)
        } else {
            setContact({
                name: "",
                email: "",
                phone: "",
                type: "personal"
            });
        }
    }, [current, setContact]);

    const onChange = e => {
        setContact({
            ...contact,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        
        e.preventDefault();

        if (current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }

        setContact({
            name: "",
            email: "",
            phone: "",
            type: "personal"
        });

    }

    const onClearContact = () => {
        clearContact();
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>{current !== null ? "Update Contact" : "Add Contact"}</h1>
            <input 
                type="text"
                name="name"
                placeholder="Name"
                onChange={onChange}
                value={ name }
            />
            <input 
                type="text"
                name="email"
                placeholder="Email"
                onChange={onChange}
                value={ email }
            />
            <input 
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={onChange}
                value={ phone }
            />
            <h5>Contact Add</h5>
            <input 
                type="radio"
                name="type"
                onChange={onChange}
                value="personal"
                // checked={current.type === "personal" || type === "personal"}
                checked={ type === "personal" }
            />
            {" "} <span>Personal</span> {" "}
            <input 
                type="radio"
                name="type"
                onChange={onChange}
                value="professional"
                checked={ type === "professional" }
            />
            {" "} <span>Professional</span>
            <div>
                <input value={current !== null ? "Update Contact" : "Add Contact"} type="submit" className="btn btn-primary btn-block" />
                {current && <button className="btn btn-light btn-block" onClick={onClearContact}>Clear Contact</button>}
            </div>
        </form>
    );
}

export default ContactForm;