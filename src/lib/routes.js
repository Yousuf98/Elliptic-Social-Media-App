import { createBrowserRouter } from "react-router-dom";
import Register from "components/auth/Register";
import Login from "components/auth/Login";
import Layout from "components/Layout";
import Dashboard from "components/Dashboard";
import Profile from "components/Profile";
import Newpost from "components/Newpost";
import Root from "components/Root";

//Constants that store the URL routes
export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const PROTECTED = "/protected"
export const DASHBOARD = "/protected/dashboard";
export const USERPROFILE = "/protected/user";
export const NEWPOST = "/protected/newpost";

export const router = createBrowserRouter([ //List of all different routes. Each route is an object
    {path:ROOT, element:<Root/>},
    {path:LOGIN, element:<Login/>},
    {path:REGISTER, element:<Register/>},
    {
        path:PROTECTED, 
        element:<Layout/>, 
        children:[
            {
                path:DASHBOARD,
                element: <Dashboard/>
            },
            {
                path:USERPROFILE,
                element: <Profile/>
            },
            {
                path:NEWPOST,
                element: <Newpost/>
            },
        ]},
]);