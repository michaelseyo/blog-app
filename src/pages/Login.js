import React from "react";
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

function Login({setAuth}) {
    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            localStorage.setItem("isAuth", true);
            setAuth(true);
            navigate("/");
        });
    }
    return (
        <div> 
            <p className="center-align"> Sign in with Google to continue</p>
            <div className="center-align"> 
                <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
        </div>
    );
}

export default Login;