
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Logins/Login";
import Register from "./Logins/Register";
import MyTeams from "./Teams/MyTeams";
import TeamDetails from "./Teams/TeamDetails";
import { EditTeamForm } from "./Teams/EditTeamForm";
import ManageRoster from "./Users/ManageRoster";
import { RemovefromRoster } from "./Users/RemoveFromRoster";
import { AvailablePlayerList } from "./Users/AddPlayerList";
import AddtoRoster from "./Users/AddPlayerToRoster";

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
                        <Route path=":id/EditTeam" element={<EditTeamForm />} />
                        <Route path=":id/ManageRoster" element={<ManageRoster />} />
                        <Route path=":id/Remove/:playerId" element={<RemovefromRoster />} />
                        <Route path=":id/AddPlayers" element={<AvailablePlayerList />} />
                        <Route path=":id/AddToRoster/:playerId" element={<AddtoRoster />} />
                    </Route>
                </Route>
            </Routes>
        </main>
    )
}