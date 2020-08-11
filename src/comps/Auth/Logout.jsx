import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';

const Logout = ({ onClick, UserContext}) => {

  const user = useContext(UserContext);

  return (
    <div className="flex align-none">
      <p className="text-lg">You are logged in as {user.email}</p>
      <Button
        variant="outline-dark"
        onClick={onClick}
      >
        Logout
      </Button>
    </div>
  );
}

export default Logout;
