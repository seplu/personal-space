import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";

import Admin from "./components/Admin";
import Login from "./components/Login";
import Home from "./components/Home";
import Missing from "./components/Missing";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* public routes */}
                <Route path="login" element={<Login />} />
                {/* protected routes */}
                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Home/>} exact/>
                    <Route path="admin" element={<Admin/>} />
                </Route>
                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
