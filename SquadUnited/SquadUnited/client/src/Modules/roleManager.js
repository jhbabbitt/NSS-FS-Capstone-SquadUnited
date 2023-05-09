import { getToken } from "./authManager"
import "firebase/auth"
import firebase from "firebase/app"

const baseUrl = "/api/role"

export const getCurrentUserRole = (id) => {
  const user = firebase.auth().currentUser;
  return getToken().then((token) =>
    fetch(`${baseUrl}/CurrentUserRole?firebaseUserId=${user.uid}&teamId=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          return null;
        } else if (!response.ok) {
          throw new Error("Error fetching user role");
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
        return null;
      })
  );
};
