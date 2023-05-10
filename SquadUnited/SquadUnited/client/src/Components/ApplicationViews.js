
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
import { LeaguesIndex } from "./Leagues/LeaguesIndex";
import LeagueDetails from "./Leagues/LeagueDetails";
import { CreateTeamForm } from "./Teams/CreateTeamForm";
import { PlayerDetails } from "./Users/PlayerDetails";
import { MyProfile } from "./Users/MyProfile";
import { EditProfile } from "./Users/EditProfile";

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
                    <Route path="/profile" element={<MyProfile />} />
                    <Route path="/profile/edit" element={<EditProfile />} />
                    <Route path="team">
                        <Route path=":id" element={<TeamDetails />} />
                        <Route path=":id/EditTeam" element={<EditTeamForm />} />
                        <Route path=":id/ManageRoster" element={<ManageRoster />} />
                        <Route path=":id/Remove/:playerId" element={<RemovefromRoster />} />
                        <Route path=":id/AddPlayers" element={<AvailablePlayerList />} />
                        <Route path=":id/AddToRoster/:playerId" element={<AddtoRoster />} />
                    </Route>
                    <Route path="Leagues">
                        <Route path="index" element={<LeaguesIndex />} />
                        <Route path=":id" element={<LeagueDetails />} />
                        <Route path=":id/CreateTeam" element={<CreateTeamForm />} />
                    </Route>
                    <Route path="Player">
                        <Route path=":id" element={<PlayerDetails />} />
                    </Route>
                </Route>
            </Routes>
        </main>
    )
}