import { getToken } from "./authManager"
import "firebase/auth"
import firebase from "firebase/app"

const baseUrl = "/api/team"

export const getMyTeams = () => {
  const user = firebase.auth().currentUser
  return getToken().then((token) =>
    fetch(`${baseUrl}/GetTeamsByCurrentUser?firebaseUserId=${user.uid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json()))
}

export const getTeam = (id) => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json()))
}

export const updateTeam = (team) => {
  return getToken().then((token) => {
      return fetch(`${baseUrl}/${team.id}`, {
          method: "PUT",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify(team)
      })
      .then((res) => res)    
  })
}

export const AddPlayerToTeam = (userTeam) => {
  return getToken().then((token) => {
    fetch(`${baseUrl}/addPlayer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userTeam)
    })
      .then(response => response.json())
  });
}

export const GetTeamsByLeague = (leagueId) => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/GetTeamsByLeague/${leagueId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json()))
}

export const CreateTeam = (team) => {
  const user = firebase.auth().currentUser
  return getToken().then((token) => {
    fetch(`${baseUrl}/createTeam?firebaseUserId=${user.uid}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(team)
    })
      .then(response => response.json())
  });
}
