import React, { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";

function Infographic() {  
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await fetch("https://api.covid19api.com/summary");
            const data = await response.json();
            console.log(data.Countries);
            setCountries(data.Countries.map((c) => ({
                id : c.ID,
                country : c.Country, 
                deaths: c.TotalDeaths,
                cases: c.TotalConfirmed
            })));
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
            {countries.map((c) => {
                return <Typography key={c.id}> {c.country} </Typography>
            })}
        </Container>
    );
}

export default Infographic