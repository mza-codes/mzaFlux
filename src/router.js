import { useContext } from "react";
import { useRoutes } from "react-router-dom";
import App, { UserSession } from "./App";
import LoginPage from "./Components/Login";
import Recent from "./Components/Recent";
import WishList from "./Components/Wishlist";
import Account from "./Pages/Account";
import SingleView from "./Pages/SingleView";

export default function Router() {

    // const { user } = useContext(UserSession)

    return useRoutes([
        { path: '/', element: <App /> },
        { path: 'wishlist', element: <WishList /> },
        { path: 'recents', element: <Recent /> },
        { path: 'account', element: <Account /> },
        { path: 'view', element: <SingleView /> },
        { path: '/*', element: <WishList /> },



        // {
        //     path: '/',
        //     element: <LogoOnlyLayout />,
        //     children: [
        //         { path: '/', element: <Navigate to="/dashboard/products" /> },
        //         { path: '404', element: <NotFound /> },
        //         { path: '*', element: <Navigate to="/404" /> },
        //     ],
        // },
        // {
        //     path: '*',
        //     element: <Navigate to="/404" replace />,
        // },
    ]);
}