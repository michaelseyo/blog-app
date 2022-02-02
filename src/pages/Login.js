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
    page: {
        marginTop: 80
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
        <Container className={classes.page}>
            <Typography className={classes.centerAlign}> 
                Sign in with Google to continue
            </Typography>
            <div className={classes.centerAlign}> 
                <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
        </Container>
    );
}

export default Login;