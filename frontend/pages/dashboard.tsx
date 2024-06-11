// @ts-ignore
import React from "react";
import {useNavigate} from "react-router-dom";

export default function Dashboard() {
    const [token] = React.useState(localStorage.getItem("ps_token"));
    const navigate = useNavigate();
    if(!token) {
        return (
            <>
                <main style={{ padding: '50px' }}>
                    <p>You&apos;re not logged in.</p>
                </main>
            </>
        )
    }
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

