import { projectAuth, provider } from '../firebase/config';

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

const loginWithGoogle = () => {
  projectAuth.signInWithPopup(provider).then(result => {
    const token = result.credential.accessToke;

    const user = result.user
    console.log(result.user);
  }).catch(error => console.log(error))
}

export { logout, login, register, loginWithGoogle }
