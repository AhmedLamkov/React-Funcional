import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context";
import MyButton from "../button/MyButton";

const Navbar = () => {
    const{isAuth, setIsAuth}= useContext(AuthContext);
    const navigate = useNavigate();
    const logout =() => {
        setIsAuth(false);
        localStorage.removeItem('auth')
        navigate('/')
    }
    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className="navbar__links">
            <Link to="/about">О сайте</Link>
            <Link to="/post">Посты</Link>
            
            </div>
        </div>
    );
};
export default Navbar;