import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {

    useEffect(() => {
        const time = setTimeout(() => {
            removeAlert()
            // console.log("working")
        }, 2500)
        return () => clearTimeout(time)
    },[list])
    return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;


