import axios from "axios";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "300384576511-1cfq6psoqtub50pck22es3nr3adtfcai.apps.googleusercontent.com",
});

const API_KEY = "AIzaSyDOQYVx5oeWJ2ZhAyp85oD8mjnF2zO7ago";
const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}`;
  const res = await axios.post(`${url}?key=${API_KEY}`, {
    email,
    password,
    returnSecureToken: true,
    // id: localId,
  });
  // console.log(res);
  return res.data;
};

export const loginWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // await GoogleSignin.signOut();
    // console.log({ userInfo });
    return userInfo;
  } catch (error) {
    console.log(error);
    // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //   // user cancelled the login flow
    // } else if (error.code === statusCodes.IN_PROGRESS) {
    //   // operation (e.g. sign in) is in progress already
    // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //   // play services not available or outdated
    // } else {
    //   // some other error happened
    // }
  }
};

export const signUpApi = (email, password) => {
  return authenticate("signUp", email, password);
};

export const loginApi = (email, password) => {
  return authenticate("signInWithPassword", email, password);
};
