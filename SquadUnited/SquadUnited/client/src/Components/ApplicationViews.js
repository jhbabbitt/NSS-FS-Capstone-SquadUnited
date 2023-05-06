
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Logins/Login";
import Register from "./Logins/Register";
import MyTeams from "./Teams/MyTeams";
import TeamDetails from "./Teams/TeamDetails";

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
                    <Route path="team">
                        <Route path=":id" element={<TeamDetails />} />
                    </Route>
                </Route>
            </Routes>
        </main>
    )
}