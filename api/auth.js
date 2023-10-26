import axios from "axios";

const API_KEY = "AIzaSyDOQYVx5oeWJ2ZhAyp85oD8mjnF2zO7ago";
const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}`;
  const res = await axios.post(`${url}?key=${API_KEY}`, {
    email,
    password,
    returnSecureToken: true,
  });
  // console.log(res.data);
  return res.data;
};

export const signUpApi = (email, password) => {
  return authenticate("SignUp", email, password);
};

export const loginApi = (email, password) => {
  return authenticate("signInWithPassword", email, password);
};
