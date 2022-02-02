import React from "react";
import { Container, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    page: {
        marginTop: 80
    }
});

function ErrorPage() {
    const classes = useStyles(); 
    return <Container className={classes.page}>
                Error! Page doesn't exist
            </Container>
}

export default ErrorPage