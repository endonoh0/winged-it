import React, {useState} from "react";
import { projectAuth } from '../firebase/config';

const SignIn = () => {
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
    <div>
      <h1 >Sign In</h1>
      <div>
        <form>
          <label htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value = {email}
            placeholder="Email"
            onChange = {(event) => onChangeHandler(event)}
          />
          <label htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value = {password}
            placeholder="Your Password"
            onChange = {(event) => onChangeHandler(event)}
          />
          <button onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            Sign in
          </button>
        </form>
        <p>or</p>
        <button>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
export default SignIn;