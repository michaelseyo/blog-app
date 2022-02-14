import React, { useState } from "react";
import { auth, db } from "../firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { Card, CardHeader, Typography, makeStyles, IconButton, CardContent } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles({
    post: {
        margin: 40,
        padding: 20
    },
    name: {
        flexGrow: 1
    },
    footer: {
        display: "flex",
        justifyContent: "space-between"
    }
});

function PostCard({isAuth, post}) {
    const classes = useStyles();

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id)
        await deleteDoc(postDoc);
    }

    return (
        <Card 
            className={classes.post} 
            key={post.id}
        > 
            <CardHeader 
                title={post.title}
                titleTypographyProps={{
                    variant: "h4"
                }}
                action={
                    auth.currentUser && 
                    isAuth && 
                    auth.currentUser.uid === post.author.id && 
                    <IconButton
                        onClick={() => {
                            deletePost(post.id)
                        }}
                    >
                        <DeleteOutlineIcon/>
                    </IconButton>
                }
            />
            <CardContent>
                <Typography 
                    variant="body2"
                    color="textSecondary"
                >
                    {post.postText}
                </Typography>
            </CardContent>   
            <div className={classes.footer}>
                <Typography
                        className={classes.name}
                        variant="subtitle2"
                        color="textSecondary"
                    >
                        @{post.author.name}
                    </Typography>
                    <Typography 
                        variant="subtitle2"
                        color="textSecondary"
                    >
                        {post.date}
                    </Typography>
            </div>
        </Card>
    );
}

export default PostCard