import React, { useContext, useEffect } from "react";


// load components
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm"
import ContacFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();

        // eslint-disable-next-line
    }, []);

    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContacFilter />
                <Contacts />
            </div>
        </div>
    );
}

export default Home;