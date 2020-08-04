import React, {useState} from "react";

import "./Auth.scss"

const SignIn = ({ onClick, loginWithGoogle }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeHandler = (event) => {
      const {name, value} = event.currentTarget;

      if (name === 'email') {
        setEmail(value);
      } else {
        setPassword(value);
      }
	};

  return (

    <form className="sign-in">
      <p>Sign In</p>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" className="form-control" placeholder="Email" name="email"
          value = {email}
          onChange = {(event) => onChangeHandler(event)} />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" className="form-control" placeholder="Your Password" name="password"
          value = {password}
          onChange = {(event) => onChangeHandler(event)} />
      </div>

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="customCheck1" />
          <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-block"
        onClick = {(event) => {
          onClick(event, email, password);
          setEmail("");
          setPassword("");
        }}>
        Sign In
      </button>

      <p className="login-alt text-right">
        Sign in with <a onClick={loginWithGoogle}>Google?</a>
      </p>
    </form>
  );
};

export default SignIn;
