import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";

import PrivateRoutes from "./Private.routes";
import PublicRoute from "./Public.routes";

import Login from "../Pages/Auth/Login";
import Forgot from "../Pages/Auth/Forgot";
import Reset from "../Pages/Auth/Reset";
import Create from "../Pages/Auth/Create";
import Profile from "../Pages/Profile/Profile";
import NotFound from "../Pages/NotFound/NotFound";
import Users from "../Pages/Users/Users";
import Home from "../Pages/Home/Home";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="notfound" element={<NotFound />} />


        {/* Rotas públicas */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot"
          element={
            <PublicRoute>
              <Forgot />
            </PublicRoute>
          }
        />
        <Route
          path="/reset"
          element={
            <PublicRoute>
              <Reset />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Create />
            </PublicRoute>
          }
        />

        {/* Rotas privadas */}
        <Route element={<PrivateRoutes />}>
          <Route element={<App />}>

            
            {/* Home */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* Users */}
            <Route path="/users" element={<Users />} />

            {/* Profile */}
            <Route path="/profile/:id" element={<Profile />} />

          </Route>
        </Route>
      </Routes>

    </BrowserRouter>
  );
}