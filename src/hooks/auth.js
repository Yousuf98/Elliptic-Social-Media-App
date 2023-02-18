import { auth, db } from 'lib/firebase';
import { useEffect, useState } from 'react';
import { DASHBOARD, LOGIN } from 'lib/routes';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { notification } from 'antd';

//Customm hook to return authenticated user
export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true); //Always starts to load in the page load thats why starts with true
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const ref = doc(db, "users", authUser.uid); //Just a reference to the document in the firestore database
      const docSnap = await getDoc(ref);
      setUser(docSnap.data());
      setLoading(false);
    }

    if (!authLoading) { //Loading for authentication is done
      if (authUser) { fetchData() } //If user has  been signed in successfully
      else setLoading(false) //not signed in
    }

  }, [authLoading]);

  return { user: authUser, isLoading: isLoading, error: error };
}

//Custom hook to authenticate user based on email and password
export function useLogin() {

  const [isLoading, setLoading] = useState(false);
  //const toast = useToast();
  const navigate = useNavigate();

  async function login({ email, password, redirectto = DASHBOARD }) { //{email, password, redirectto=DASHBOARD} are props that login function receives
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const openNotification = () => {
        notification.open({
          message: 'You are logged in!',
          duration: 2,
          placement:'top'
        });
      };
      openNotification();
      navigate(redirectto)
    } catch (error) {
      const openNotification = () => {
        notification.open({
          message: 'Logging in failed',
          duration: 2,
          placement:'top'
        });
      };
      openNotification();
      setLoading(false);
      return false; //return false if login fails
    }
    setLoading(false);
    return true; //return true if login succeeds
  }

  return { login, isLoading };
}

export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  //const toast = useToast();
  const navigate = useNavigate();

  async function logout() {
    if (await signOut()) {
      const openNotification = () => {
        notification.open({
          message: 'Successfully logged out',
          duration: 2,
          placement:'top'
        });
      };
      openNotification();
      navigate(LOGIN);
    }
    else {
      const openNotification = () => {
        notification.open({
          message: 'Logging out failed',
          duration: 2,
          placement:'top'
        });
      };
      openNotification();
    }
  }

  return { logout, isLoading };
}

export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function register({
    email,
    password,
    fullname,
    avatar,
    gender,
    redirectTo = DASHBOARD,
  }) {
    setLoading(true);


    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        fullname: fullname,
        avatar: avatar,
        gender: gender,
        date: Date.now(),
      });

      const openNotification = () => {
        notification.open({
          message: 'Successfully registered!',
          duration: 2,
          placement:'top'
        });
      };
      openNotification();

      navigate(redirectTo);
    } catch (error) {
    } finally {
      setLoading(false);
    }

  }

  return { register, isLoading };
}


export function useUpdateInfo() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { user, isLoading: userLoading } = useAuth();
  async function update({
    fullname,
    avatar,
    gender,
    redirectTo = DASHBOARD,
  }) {
    setLoading(true);


    try {
      //const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", user.uid), {
        fullname: fullname,
        avatar: avatar,
        gender: gender,
      });

      const openNotification = () => {
        notification.open({
          message: 'Profile updated!',
          duration: 2,
          placement:'top'
        });
      };
      openNotification();
      navigate(redirectTo);
    } catch (error) {
    } finally {
      setLoading(false);
    }

  }

  return { update, isLoading };
}