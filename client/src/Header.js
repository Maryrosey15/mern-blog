import { useContext, useEffect } from "react";
import {Link} from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
    const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });       
    }, [setUserInfo]);

    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: true,
            method: 'POST',
        });
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
                <nav>
                    {username && (
                        <>
                        <span>Hello, {username}</span>
                        <Link to="/create">Create New Post</Link>
                        <button onClick={logout}>Logout ({username})</button>
                        </>
                    )}
                    {!username && (
                        <>
                            <Link to="/Login">Login</Link>
                            <Link to="register/">Register</Link>
                        </>
                    )}   
                </nav>
        </header>
    );
}