import React, { useState } from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    <Form className="sign-up">
      <p>Sign up</p>

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

        <Form.Text id="passwordHelpBlock" muted>
          Must be 8-20 characters long.
        </Form.Text>
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
          Sign up
        </Button>

        <p className="forgot-password text-right">
          Already registered <a href="#">sign in?</a>
        </p>

      </div>
    </Form>
  )
};



export default SignUp;
