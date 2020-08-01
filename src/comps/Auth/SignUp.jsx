import React, { useState } from "react";
import { projectAuth } from '../../firebase/config';
import "./Auth.scss"

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
      <form className="sign-up">
        <p>Sign Up</p>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" placeholder="Email" name="email"
              value={email}
              onChange={event => onChangeHandler(event)} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Enter:</label>
          <input type="password" className="form-control" placeholder="Your Password" name="password"
              value={password}
              onChange={event => onChangeHandler(event)} />
        </div>

        <button type="submit" className="btn btn-primary btn-block"
          onClick={event => { createUserWithEmailAndPasswordHandler(event, email, password);
          }}
        >
          Sign Up
        </button>

        <p className="forgot-password text-right">
          Already registered <a href="#">sign in?</a>
        </p>

        {/* <button
          onClick={event => {
            event.preventDefault();
            console.log(projectAuth.currentUser);
          }}
        >
          Sign up
        </button> */}
      </form>

  );
};
export default SignUp;
