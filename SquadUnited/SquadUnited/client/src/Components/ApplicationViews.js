
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Logins/Login";
import Register from "./Logins/Register";
import MyTeams from "./Teams/MyTeams";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={isLoggedIn ? <MyTeams /> : <Navigate to="/login" />}
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Routes>
        </main>
    )
}