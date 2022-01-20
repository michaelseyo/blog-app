import React, { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config'
import { Container, makeStyles } from "@material-ui/core";
import PostCard from "../components/PostCard";
import Infographic from "../components/Infographic";

const useStyles = makeStyles({
    homeContainer: {
        margin: 20
    }
});

function Home({isAuth}) {
    const classes = useStyles();
    const [postList, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            if (data.docs.length > 0) {
                setPostList(data.docs.map((doc) => (
                    {...doc.data(), id: doc.id }
                )));
            }
        };
        getPosts();
    }, [])

    return (
        <Container className={classes.homeContainer}>
            <Infographic> </Infographic>
            {postList.map((post) => {
                return <PostCard isAuth={isAuth} post={post} key={post.id}/>
            })} 
        </Container>
    );
}

export default Home;