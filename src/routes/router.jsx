import {createBrowserRouter, Navigate} from 'react-router-dom';
import App from "../App.jsx";
import {PageNotFound} from "../pages/SystemPage/PageNotFound.jsx";
import Login from "../pages/Auth/Login.jsx";
import Dashboard from "../components/Dashboard/Dashboard.jsx";
import PrivateRoute from "../pages/SystemPage/PrivateRoute.jsx";
import UserPage from "../pages/User.jsx";
import ProductPage from "../pages/Product.jsx";
import Category from "../pages/Category.jsx";
import AdministratorPage from "../pages/Administrator.jsx";
import OrderPage from "../pages/Order.jsx";
import Messages from "../pages/Messages.jsx";
import CreateProductPage from "../components/Product/CreateProductPage.jsx";

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
                path: "administrators",
                element: <AdministratorPage/>
            },
            {
                path: "users",
                element: <UserPage />
            },
            {
                path: "products",
                element: <ProductPage />
            },
            {
                path: "category",
                element: <Category/>
            },
            {
                path: "orders",
                element: <OrderPage/>
            },
            {
                path: "messages",
                element: <Messages/>
            },
            {
                path: "create-product",
                element: <CreateProductPage/>
            }
        ]
    },
]);