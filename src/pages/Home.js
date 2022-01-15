import React, { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config'
import Container from "@material-ui/core/Container";
import PostCard from "../components/PostCard"

function Home({isAuth}) {
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
        <Container> 
            {postList.map((post) => {
                return <PostCard isAuth={isAuth} post={post}/>
            })} 
        </Container>
    );
}

export default Home;