import React, { useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config'
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles({
    btn: {
        margin: 10
    }, 
    post: {
        margin: 40,
        padding: 20
    },
    postHeader: {
        display: "flex",
        alignItems: "center"
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

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id)
        await deleteDoc(postDoc);
    }

    return (
    <Container> 
        {postList.map((post) => {
        return (
            <Card className={classes.post} key={post.id}> 
                <div className={classes.postHeader}>
                    <Typography
                        variant="h4"
                        component="h2"
                    >   
                        {post.title}
                    </Typography>
                    {isAuth && auth.currentUser.uid === post.author.id && (
                        <Button 
                            className = {classes.btn}
                            onClick={() => {
                                deletePost(post.id)
                            }}
                            startIcon={<DeleteOutlineIcon/>}
                        >
                            Delete
                        </Button>
                    )}   
                </div>
                <Typography>
                    {post.postText}
                </Typography>
                <Typography
                    variant="h6"
                >
                    @{post.author.name}
                </Typography>
            </Card>
        );
        })} 
    </Container>
    );
}

export default Home;