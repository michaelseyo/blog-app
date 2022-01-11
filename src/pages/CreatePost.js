import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Input, InputLabel, Typography, TextField } from "@material-ui/core"
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({isAuth}) {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const postsCollectionRef = collection(db, "posts");
    let navigate = useNavigate();
    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            title,
            postText,
            author: {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid
            }
        });
        navigate("/");
    }

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, []);

    return (
    <Card>
        <Typography variant="h4">Create a post</Typography>
        <CardContent>
            <InputLabel>Title: </InputLabel>
            <Input placeholder="Title..." 
                    onChange={(e) => {setTitle(e.currentTarget.value)}}>
            </Input>
            <InputLabel>Post: </InputLabel>
            <TextField multiline="true"
                        onChange={(e) => {setPostText(e.currentTarget.value)}}>
            </TextField>
        </CardContent>
        <Button onClick={createPost}> Submit </Button>
    </Card>
    );
}

export default CreatePost;