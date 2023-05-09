import { getToken } from "./authManager"
import "firebase/auth"
import firebase from "firebase/app"

const baseUrl = "/api/league"

export const getActiveLeagues = () => {
    return getToken().then((token) =>
      fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json()))
  }