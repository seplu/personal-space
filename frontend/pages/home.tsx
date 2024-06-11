// @ts-ignore
import React from "react";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    function login(event:any) {
        event.preventDefault();
        fetch('/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Username: username,
                Password: password,
            }),
        }).then((response) => response.json()).then((data) => {
            if (data.message === "Logged in!") {
                localStorage.setItem("ps_token", data.token);
                setUsername("");
                setPassword("");
                navigate("/dashboard")
            } else {
                alert(data.message)
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="center-div">
            <div className="login-div">
                <div className="logo">Personal Space</div>
                <form onSubmit={login} className="login-form">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="text-input"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="text-input"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">LOGIN</button>
                    <p className="message">&copy; 2024 - <a href="https://github.com/seplu/personal-space/releases">ver: 0.1.0</a></p>
                </form>
            </div>
        </div>
    );
}
