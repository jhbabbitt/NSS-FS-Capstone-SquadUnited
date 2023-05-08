import { getToken } from "./authManager"
import "firebase/auth"
import firebase from "firebase/app"

const baseUrl = "/api/user"

export const getPlayersOnATeam = (id) => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/GetPlayersOnATeam?teamId=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json()))
}

export const getCaptainsOnATeam = (id) => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/GetCaptainsOnATeam?teamId=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json()))
}

export const getUser = (id) => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/details/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json()))
}

export const RemovePlayerFromTeam = (teamId, userId) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/team/${teamId}/player/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  })
}