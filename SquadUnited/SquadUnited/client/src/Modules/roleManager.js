import { getToken } from "./authManager"
import "firebase/auth"
import firebase from "firebase/app"

const baseUrl = "/api/role"

export const getCurrentUserRole = (teamId) => {
  const user = firebase.auth().currentUser;
  return getToken().then((token) =>
    fetch(`${baseUrl}/CurrentUserRole?firebaseUserId=${user.uid}&teamId=${teamId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          throw new Error("User role not found");
        } else if (response.status === 204) {
          return null;
        } else {
          return response.json();
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      })
  );
};


