import React, {useState} from "react";
import { projectAuth } from '../../firebase/config';
import "./Auth.scss"

const SignIn = ({ onClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	// Button handler to sign in
  const signInWithEmailAndPasswordHandler = (event,email, password) => {
		event.preventDefault();
		projectAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// Alert
			if (errorCode === 'auth/wrong-password') {
				// Do css html styling to add on screen error message
				alert('Wrong password.');
			} else {
				alert(errorMessage);
			}
		console.log(error);
		});
		setEmail("");
    setPassword("");
	};

	// Controlled component setstates
  const onChangeHandler = (event) => {
      const {name, value} = event.currentTarget;
      if(name === 'email') {
          setEmail(value);
      }
      else if(name === 'password'){
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
          signInWithEmailAndPasswordHandler(event, email, password)
          onClick(email, password)
        }}>
        Sign In
      </button>
      <p className="login-alt text-right">
        Sign in with <a href="#">Google?</a>
      </p>
    </form>

  );
};

export default SignIn;
