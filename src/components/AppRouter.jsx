import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../context";
import About from "../pages/About";
import Login from "../pages/login";
import { publicRoutes, privateRoutes} from "../router";
import Loader from "./UI/Loader/Loader";


const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    console.log(isAuth)

    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ? <Routes>
                {privateRoutes.map(route => 
                    <Route 
                        path={route.path}
                        element={<route.component/>} 
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Navigate replace to="/post" />}></Route>
            </Routes>
            : <Routes>
                 {publicRoutes.map(route => 
                    <Route 
                        path={route.path}
                        element={<route.component/>} 
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Navigate replace to="/login" />}></Route>
            </Routes>

    
       
    );
};
export default AppRouter;