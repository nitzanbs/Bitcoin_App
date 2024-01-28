import React, { useEffect, useState } from "react";
import SignUp from "../../components/signUp/SignUp";
import LogIn from "../../components/logIn/LogIn";
import { useSearchParams } from "react-router-dom";
import { auth } from '../../config/FirebaceConfig';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import '../../components/logIn/LogIn.css'
function Auth(props) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoginError(null);

    if (isLoginMode) {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          props.setUser(userCredential.user);
          setIsAuthenticated(true);
          setIsLoginMode(false);
        })
        .catch((error) => {

          console.log(error.code);
          if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/wrong-password"
          ) {
            setLoginError("Login failed. Email or password are wrong.");
          } else {
            setLoginError("An error occurred during login.");
          }
        });
    } else {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {

          props.setUser(userCredential.user);
        })
        .catch((error) => {
          console.error("Signup error:", error);

        });
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({ email: "", password: "" });
    setLoginError(null); 

    setIsAuthenticated(false);
  };


  if (isAuthenticated) {
    return (
      <div>
        <p>You are logged in successfully</p>
      </div>
    );
  }

  return (
    <div>
      {isLoginMode ? (
        <LogIn
          setIsAuthenticated={setIsAuthenticated}
          submitHandler={submitHandler}
          changeHandler={changeHandler}
        />
      ) : (
        <SignUp submitHandler={submitHandler} changeHandler={changeHandler} />
      )}
      {loginError && <p id="tryTest">{loginError}</p>}
      <p className="toggleBtn" type="button" onClick={toggleMode}>
        {isLoginMode ? "Sign Up" : "Already have an account?"}
      </p>
    </div>
  );
}

export default Auth;