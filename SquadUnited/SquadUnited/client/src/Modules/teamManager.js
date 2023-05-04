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