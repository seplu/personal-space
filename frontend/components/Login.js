import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import registerCheck from "../hooks/registerCheck";
import axios from "../api/axios";
import {FaEnvelope, FaLock, FaUser} from "react-icons/fa";

const Login = () => {
    const USER_REGEXP = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

    const LOGIN_URL = "/login"
    const REGISTER_URL = "/signup"
    const {setAuth} = useAuth()
    const [isRegisterEnabled, setIsRegisterEnabled] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const userRef = useRef(null);
    const registerUserRef = useRef(null);
    const errRef = useRef(null);

    const [username, setUsername] = useState('');
    const [usernameregister, setUsernameReg] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordregister, setPasswordReg] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [email,setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [action, setAction] = useState('');

    const registerLink = () => {
        setAction(' active')
    }
    const loginLink = () => {
        setAction('')
    }

    useEffect(() => {
        const checkRegistration = async () => {
            const registerStatus = await registerCheck();
            setIsRegisterEnabled(registerStatus === 'enabled' || registerStatus === 'not found');
        };
        checkRegistration().then();
    }, []);
    useEffect(() => {
        userRef.current.focus();
    }, []);
    useEffect(() => {
        const result = USER_REGEXP.test(usernameregister);
        setValidName(result);
    }, [usernameregister]);
    useEffect(() => {
        const result = PWD_REGEX.test(passwordregister);
        setValidPwd(result);
    }, [passwordregister]);
    useEffect(() => {
        const result = EMAIL_REGEXP.test(email);
        setValidEmail(result);
    }, [email]);
    useEffect(() => {
        setErrMsg('');
    }, [usernameregister, passwordregister])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({
                    Username: username,
                    Password: password,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                })
            const accessToken = response?.data?.token;
            setAuth({username, password, accessToken});
            setUsername("");
            setPassword("");
            navigate(from, {replace: true});
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                
                setErrMsg('Missing username or password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed');
            }
            errRef.current.focus();
        }
    }


    const register = async (event) => {
        event.preventDefault();
        const field1 = USER_REGEXP.test(usernameregister);
        const field2 = PWD_REGEX.test(passwordregister);
        const field3 = EMAIL_REGEXP.test(email);
        if (!field1 || !field2 || !field3) {
            setErrMsg('Invalid username, email or password');
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({
                    Username: usernameregister,
                    Password: passwordregister,
                    Email: email,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                })
            const registerResponse = response?.data?.value;
            setUsernameReg("");
            setPasswordReg("");
            setEmail("");
            console.log(registerResponse);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing username, email or password');
            } else {
                setErrMsg('Registration failed');
            }
        }
    }

    return (
        <div className="login-register-form">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <p id="uidnote" className={userFocus && usernameregister && !validName ? "instructions" : "offscreen"}>
                4 to 24 characters. <br/>
                Must begin with a letter.<br/>
                Letters, numbers, underscores, hyphens allowed.
            </p>
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                8 to 24 characters.<br/>
                Must include uppercase and lowercase letters, a number<br/>and a special character.<br/>
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span
                aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span
                aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>
            <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                Must be a valid email address with @ and domain.
            </p>
            <div className={`login-wrapper${action}`}>
                <div className="form-box login">
                    <form onSubmit={handleSubmit} className="login-form">
                        <h1>Login</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                required={true}
                                className="text-input"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <FaUser className="icon"/>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                id="password"
                                autoComplete="off"
                                required={true}
                                className="text-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FaLock className="icon"/>
                        </div>
                        <div className="form-options">
                            <label><input type="checkbox"/>Remember me</label>
                            <a href="#">Forgot password?</a>
                        </div>
                        <button type="submit">Login</button>
                        {isRegisterEnabled && (
                        <div className="register">
                            <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                        </div>
                        )}
                    </form>
                </div>

                <div className="form-box register">
                    <form onSubmit={register} className="register-form">
                        <h1>Registration</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                id="usernameregister"
                                ref={registerUserRef}
                                autoComplete="off"
                                required={true}
                                className="text-input"
                                placeholder="Username"
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onChange={(e) => setUsernameReg(e.target.value)}
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <FaUser className="icon"/>
                        </div>
                        <div className="input-box">
                            <input
                                type="email"
                                id="email"
                                autoComplete="off"
                                required={true}
                                className="text-input"
                                placeholder="Email"
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <FaEnvelope className="icon"/>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                id="passwordregister"
                                autoComplete="off"
                                required={true}
                                className="text-input"
                                placeholder="Password"
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onChange={(e) => setPasswordReg(e.target.value)}
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <FaLock className="icon"/>
                        </div>
                        <button type="submit">Register</button>
                        <div className="register">
                            <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
