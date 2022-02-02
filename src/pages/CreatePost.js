import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Button, Container, CardContent, Typography, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import { format } from "date-fns"

const useStyles = makeStyles({
    page: {
        marginTop: 80
    },
    postHeader: {
        marginTop: 20
    },
    field: {
        marginTop: 10,
        marginBottom: 10,
        display: "block"
    }
});

function CreatePost({isAuth}) {
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [postText, setPostText] = useState("");
    const [postTextError, setPostTextError] = useState(false);

    const postsCollectionRef = collection(db, "posts");
    let navigate = useNavigate();
    const createPost = async () => {
        setTitleError(false);
        setPostTextError(false);

        const date = format(new Date(), "d MMM yyyy h:mm aaa");
        if (title && postText) {
            await addDoc(postsCollectionRef, {
                title,
                postText,
                date,
                author: {
                    name: auth.currentUser.displayName,
                    id: auth.currentUser.uid
                }
            });
            navigate("/");
        } else {
            if (!title) {
                setTitleError(true);
            } 
            if (!postText) { 
                setPostTextError(true);
            } 
        }
    }

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, []);

    return (
        <Container className={classes.page}>
            <Typography 
                className={classes.postHeader}
                variant="h4"
                component="h2"
            >
                Create a post
            </Typography>
            <CardContent>
                <TextField
                    className={classes.field}
                    label="Title"
                    fullWidth
                    required
                    variant="outlined"
                    onChange={(e) => {setTitle(e.currentTarget.value)}}
                    error={titleError}
                />
                <TextField 
                    className={classes.field}
                    label="Post"
                    fullWidth
                    required
                    variant="outlined"
                    multiline
                    rows={4}
                    onChange={(e) => {setPostText(e.currentTarget.value)}}
                    error={postTextError}
                />
            </CardContent>
            <Button 
                variant="outlined" 
                onClick={createPost}
            > 
                Submit 
            </Button>
        </Container>
    );
}

export default CreatePost;