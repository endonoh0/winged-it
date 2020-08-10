import React, {useState} from "react";

import "./Auth.scss";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    <Form className="sign-up">
      <p className="text-lg">Sign In</p>

      <Form.Group controlId="ControlInput1">
        <Form.Label htmlFor="email">Email address</Form.Label>
        <Form.Control
          size="lg"
          type="email"
          placeholder="name@example.com"
          name="email"
          value={email}
          onChange={event => onChangeHandler(event)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          size="lg"
          type="password"
          id="inputPassword6"
          aria-describedby="passwordHelpInline"
          name="password"
          value={password}
          onChange={e => onChangeHandler(e)}
        />

       <div className="form-group">
         <div className="custom-control custom-checkbox">
           <input type="checkbox" className="custom-control-input" id="customCheck1" />
           <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
         </div>
       </div>
      </Form.Group>

      <div className="mt-15">
        <Button
          type="submit"
          className="mb-2"
          onClick={event => {
            onClick(event, email, password);
            setEmail("");
            setPassword("");
          }
        }>
          Sign in
        </Button>
      </div>

      <p className="forgot-password mr-alt">
        Sign in with <a onClick={loginWithGoogle}>Google?</a>
      </p>
    </Form>
  );
};

export default SignIn;
