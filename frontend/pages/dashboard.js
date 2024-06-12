import React from "react";

export default function Dashboard() {
    const token = localStorage.getItem("ps_token");

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
