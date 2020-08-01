import React, { useState } from "react";
import { projectAuth } from '../firebase/config';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Button handler to create user
  const createUserWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    projectAuth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      let errorMessage = error.message;
      console.log(errorMessage);
    });
    setEmail("");
    setPassword("");
  };


  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } 
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <form className="">
          <label htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Your Password"
            onChange={event => onChangeHandler(event)}
          />
          <button
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
          <button
            onClick={event => {
              event.preventDefault();
              console.log(projectAuth.currentUser);
            }}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;