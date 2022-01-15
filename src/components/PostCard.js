import React from "react";
import { auth, db } from "../firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { Button, Card, Typography, makeStyles } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

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

function PostCard({isAuth, post}) {
    const classes = useStyles();

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id)
        await deleteDoc(postDoc);
    }

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
}

export default PostCard