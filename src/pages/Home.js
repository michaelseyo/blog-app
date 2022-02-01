import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Infograph from "../components/Infograph";
import NewsContainer from "../components/NewsContainer";
import PostsContainer from "../components/PostsContainer";

const useStyles = makeStyles({
    homeContainer: {
        marginTop: 80
    }
});

function Home({isAuth}) {
    const classes = useStyles();

    return (
        <Container className={classes.homeContainer}>
            <Infograph/>
            <NewsContainer/>
            <PostsContainer isAuth={isAuth}/>
        </Container>
    );
}

export default Home;