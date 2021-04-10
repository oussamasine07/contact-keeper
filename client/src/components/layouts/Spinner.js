import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
    return (
        <img alt="" src={spinner} style={styleSpinner} />
    );
}

const styleSpinner = {
    width: "200px",
    display: "block",
    margin: "20px auto"
}

export default Spinner;
