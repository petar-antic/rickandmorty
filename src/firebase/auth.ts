import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const token = await getIdToken(userCredential.user);
  localStorage.setItem("token", token);
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const token = await getIdToken(userCredential.user);
  localStorage.setItem("token", token);
};

export const doSignOut = async () => {
  await auth.signOut();
  localStorage.removeItem("token");
};
