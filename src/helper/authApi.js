import { projectAuth } from '../firebase/config';

const logout = () => {
  projectAuth.signOut();
}

const login = (email, pass) => {
  projectAuth.signInWithEmailAndPassword(email, pass);
}

export { logout, login }
