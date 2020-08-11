import { projectAuth, provider } from '../firebase/config';

const logout = () => {
  projectAuth.signOut();
}

const login = (event, email, pass, setCookie) => {
  event.preventDefault();

  projectAuth.signInWithEmailAndPassword(email, pass)
  .then(() =>{
    setCookie("user", email)
  })
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

const register = (event, email, password, setCookie) => {
  event.preventDefault();
  projectAuth.createUserWithEmailAndPassword(email, password)
  .then(() =>{
    setCookie("user", email)
  })
  .catch(function (error) {
    let errorMessage = error.message;
  });
}

const loginWithGoogle = (setCookie) => {
  projectAuth.signInWithPopup(provider).then(result => {
    const token = result.credential.accessToken;
    const user = result.user
    setCookie("user", token);
  }).catch(error => console.log(error))
}

export { logout, login, register, loginWithGoogle }