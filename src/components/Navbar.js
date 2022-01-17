import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, makeStyles, Toolbar } from "@material-ui/core"

const useStyles = makeStyles({
    headerFont: {
        color: "white",
        textDecoration: "none"
    }
});

function Navbar({isAuth, logUserOut}) {
    const classes = useStyles();
    return (
        <AppBar 
            color="primary" 
            position="sticky"
            elevation={0}
        >
            <Toolbar>
                <Button>
                    <Link 
                        className={classes.headerFont} 
                        to="/"
                    >
                        Home
                    </Link>
                </Button>
                {!isAuth ? (
                    <Button>
                        <Link 
                            className={classes.headerFont} 
                            to="/login"
                        >
                            Login
                        </Link> 
                    </Button>
                ) : (
                    <>
                    <Button>
                        <Link 
                            className={classes.headerFont} 
                            to="/createpost"
                        >
                            Create
                        </Link>
                    </Button>
                    <Button 
                        className={classes.headerFont}
                        onClick={logUserOut}
                    >
                        Log Out
                    </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar