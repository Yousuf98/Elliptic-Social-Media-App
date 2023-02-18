import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from 'hooks/auth';
import { LOGIN } from 'lib/routes';
import Navbar from 'components/Navbar';

//Ensure protected routes can be accessed only after authentication
export default function Layout() {
  const location = useLocation();
  const {pathname} = location;
  const navigate = useNavigate();
  const {user, isLoading} = useAuth(); //Our custom hook being called!

  useEffect(()=>{
      if(!isLoading && pathname.startsWith("/protected") && !user){ //We get this user object from our own custom hook
          navigate(LOGIN)
      }
      
  },[pathname,user,isLoading]);
  
  if (isLoading) return "Loading...";
  if (!user) {navigate(LOGIN);};
  return (
    <>
    <Navbar user={user}/>
    <Outlet/>
    </>
  )
}
