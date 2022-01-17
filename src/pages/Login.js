import React from "react";
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { Container, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    centerAlign: {
        display: "flex",
        justifyContent: "center"
    },
    container: {
        margin: 20
    }
});

function Login({setAuth}) {
    const classes = useStyles();
    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            localStorage.setItem("isAuth", true);
            setAuth(true);
            navigate("/");
        });
    }
    return (
        <div className={classes.container}>
            <Typography className={classes.centerAlign}> 
                Sign in with Google to continue
            </Typography>
            <div className={classes.centerAlign}> 
                <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
        </div>
    );
}

export default Login;