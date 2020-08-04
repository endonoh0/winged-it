import React, { useContext } from 'react';

// const defaultUser = { loggedIn: false, email: "" };
// const UserContext = React.createContext(defaultUser);
// const UserProvider = UserContext.Provider;
// const UserConsumer = UserContext.Consumer;

const Logout = ({ onClick, UserContext}) => {
  const user = useContext(UserContext);
  return (
    <div>
      <span>You are logged in as {user.email}</span>
      <button onClick={onClick}>Logout</button>
    </div>
  );
}

export default Logout;
