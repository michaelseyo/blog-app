import React, { useEffect } from "react";
import { Container, Typography } from "@material-ui/core";

function Infographic() {  
    useEffect(() => {
        const getData = async () => {
            const response = await fetch("https://api.covid19api.com/summary");
            const data = await response.json();
            console.log(data.Countries);
        }
        getData();
    }, []);

    return (
        <Container>
            <Typography
                variant="h4"
                align="center"
            >
                Covid-19 Status
            </Typography>
        </Container>
    );
}

export default Infographic