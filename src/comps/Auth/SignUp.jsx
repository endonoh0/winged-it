import React, { useState } from "react";

import "./Auth.scss"

const SignUp = ({ onClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "email") {
      setEmail(value);
    } else {
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
          onClick={event => {
            onClick(event, email, password);
            setEmail("");
            setPassword("");
          }
        }>
          Sign Up
        </button>

        <p className="forgot-password text-right">
          Already registered <a href="#">sign in?</a>
        </p>
      </form>
  );
};


export default SignUp;
