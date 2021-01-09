import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
//google sign in
export const handleGoogleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      const { displayName, email, photoURL } = res.user;
      const signInInfo = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      };
      return signInInfo;
    })
    .catch((error) => {
      const errorInfo = { error: error.message };
      return errorInfo;
    });
};
//signUp with email
export const signUpWithEmail = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      updateUserInfo(name);
      const signUpInfo = { isSignIn: true };
      return signUpInfo;
    })
    .catch((error) => {
      const errorInfo = { error: error.message };
      return errorInfo;
    });
};
//update new user info
const updateUserInfo = (name) => {
  const user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: name,
  });
};
//signin with email, password
export const signInWithEmail = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const { displayName, email } = res.user;
      const signInInfo = {
        isSignIn: true,
        name: displayName,
        email: email,
      };
      return signInInfo;
    })
    .catch((error) => {
      const errorInfo = { error: error.message };
      return errorInfo;
    });
};
