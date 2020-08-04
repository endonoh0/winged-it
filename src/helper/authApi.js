import { projectAuth } from '../firebase/config';

const logout = () => {
  projectAuth.signOut();
}

const login = (event, email, pass) => {
  event.preventDefault();

  projectAuth.signInWithEmailAndPassword(email, pass)
    .catch (function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
  });
}

const register = (event, email, password) => {
  event.preventDefault();
  projectAuth.createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    let errorMessage = error.message;
    console.log(errorMessage);
  });
}

export { logout, login, register }
