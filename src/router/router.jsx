import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home.jsx";
import { Login } from "../pages/Login.jsx";
import { Profile } from "../pages/Profile.jsx";
import { Error } from "../pages/Error.jsx";

const router = createBrowserRouter( [
    {
        path:"/",
        element: <Home />
    },
    {
        path:"/sign-in",
        element: <Login />
    },
    {
        path:"/profil",
        element: <Profile />
    },
    {
        path:"*",
        element: <Error />
    },
])

export default router;