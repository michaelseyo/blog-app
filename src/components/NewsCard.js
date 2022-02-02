import React from "react";
import { Card, CardHeader, CardContent, CardMedia, Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    newsCard: {
        padding: 10,
        margin: 20,
        '&:hover': {
            cursor: 'pointer'
        }
    }
});

function NewsCard({news}) {
    const classes = useStyles();
    const goToNews = () => {
        window.open(news.link);   
    }
    
    return (
        <Grid item md={4}>
            <Card 
                className={classes.newsCard}
                onClick={goToNews}>
                <CardHeader
                    title={news.title}
                    subheader={news.author}
                />
                <CardContent>
                    <CardMedia 
                        component="img"
                        image={news.img}
                    />
                    <Typography>
                        {news.excerpt}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default NewsCard;