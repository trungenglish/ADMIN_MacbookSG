import {createBrowserRouter} from 'react-router-dom';
import App from "../App.jsx";
import {PageNotFound} from "../pages/SystemPage/PageNotFound.jsx";
import Login from "../pages/Auth/Login.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <PageNotFound />,
    },
]);