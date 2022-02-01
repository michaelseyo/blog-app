import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import NewsCard from "./NewsCard";

const REACT_APP_NEWS_API_KEY='260906d8dcc740eba39f51d19db0bbcd';
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
            const response = await fetch(`https://newsapi.org/v2/everything?q=covid-19&apiKey=${REACT_APP_NEWS_API_KEY}`);
            const data = await response.json();
            const createdNews = data.articles.map(news => ({
                author: news.author,
                title:  news.title,
                description: news.description,
                content: news.content,
                date: news.publishedAt,
                url: news.url,
                img: news.urlToImage,
                source: news.source.name
            }));
            const filteredNews = createdNews.filter(news => 
                news.source !== "Blogspot.com" && 
                news.img !== "" &&
                !news.author.includes("https://")
            );
            setNews(filteredNews);
            console.log(filteredNews);
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
                    return <NewsCard news={news}/>
                })}
            </Grid>
        </Container>
    );
}

export default NewsContainer