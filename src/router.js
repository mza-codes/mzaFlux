import { useRoutes } from "react-router-dom";
import App from "./App";
import Recent from "./Components/Recent";
import WishList from "./Components/Wishlist";
import Account from "./Pages/Account";
import SingleView from "./Pages/SingleView";

export default function Router() {

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