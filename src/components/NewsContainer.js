import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import NewsCard from "./NewsCard";

const NEWS_CATCHER_API_KEY = "LAfq5CN3QzuFVPqQt4zN-Gf4BhU69DmeFmADRsV1C_o";
const COVID = "covid-19";
const useStyles = makeStyles({
    container: {
        marginTop: 10,
        marginBottom: 10
    }
});

function NewsContainer() {
    const classes = useStyles();
    const [newsList, setNews] = useState([]);
    useEffect(() => {
        const getNews = async () => {
            const response = await fetch(`https://api.newscatcherapi.com/v2/search?q=${COVID}&lang=en&sort_by=rank`, {
                "method": "GET",
                "headers": {
                    "x_api_key": NEWS_CATCHER_API_KEY
                }
            });
            const data = await response.json();
            const createdNews = data.articles.map(news => ({
                id: news._id,
                author: news.author,
                title:  news.title,
                excerpt: news.excerpt,
                date: news.published_date,
                link: news.link,
                img: news.media,
            }));
            const topNews = createdNews.slice(0,9);
            setNews(topNews);
        }
        getNews();
    }, []);

    return (
        <Container>
            <Typography
            variant="h4"
            align="center"
            >
                Latest news on Covid-19
            </Typography>
            <Grid container 
                className={classes.container}
            >
                {newsList.map(news => {
                    return <NewsCard key={news.id} news={news}/>
                })}
            </Grid>
        </Container>
    );
}

export default NewsContainer