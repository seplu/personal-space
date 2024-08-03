import React, {useEffect} from "react";
import {Outlet, Navigate} from "react-router-dom";
import CheckMe from "./CheckMe";

const ProtectedRoutes = () => {
    const [validAuth, setValidAuth] = React.useState(null);

    useEffect(() => {
        CheckMe().then(isAuthenticated => {
            setValidAuth(isAuthenticated);
        });
    }, []);
    if (validAuth === null) {
        return <div>Loading...</div>;
    }

    return validAuth ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes;
