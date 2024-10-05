import {createBrowserRouter} from 'react-router-dom';
import App from "../App.jsx";
import {PageNotFound} from "../pages/SystemPage/PageNotFound.jsx";
import Login from "../pages/Auth/Login.jsx";
import Dashboard from "../components/Dashboard/Dashboard.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />
            },
        ]
    },
]);