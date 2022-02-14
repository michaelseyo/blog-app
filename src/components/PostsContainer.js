import React, { useEffect, useState } from "react"; 
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Container, Typography } from "@material-ui/core";
import PostCard from "./PostCard";

function PostsContainer({isAuth}) {
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
    }, []);

    return (
        <Container>
            <Typography
                variant="h4"
                align="center"
            >
                Here's what people are saying...
            </Typography>
            {postList.map((post) => {
                return <PostCard key={post.id} isAuth={isAuth} post={post}/>
            })} 
        </Container>
    );
}

export default PostsContainer;