import {createBrowserRouter, Navigate} from 'react-router-dom';
import App from "../App.jsx";
import {PageNotFound} from "../pages/SystemPage/PageNotFound.jsx";
import Login from "../pages/Auth/Login.jsx";
import Dashboard from "../components/Dashboard/Dashboard.jsx";
import PrivateRoute from "../pages/SystemPage/PrivateRoute.jsx";
import UserPage from "../pages/User/User.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace/>,
        errorElement: <PageNotFound />,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <PageNotFound />,
    },
    {
        path: "/main",
        element: (
            <PrivateRoute>
                <App />
            </PrivateRoute>
        ),
        errorElement: <PageNotFound />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "users",
                element: <UserPage />
            },
        ]
    },
]);