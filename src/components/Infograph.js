import React, { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import TopCountries from "./TopCountries";
import makeNumberWithCommas from "../helperFn";

function Infograph() {  
    const [totalCases, setTotalCases] = useState(0);
    const [countries, setCountries] = useState([]);
    
    useEffect(() => {
        const getData = async () => {
            const response = await fetch("https://api.covid19api.com/summary");
            const data = await response.json();
            console.log(data.Countries);
            const createdCountries = data.Countries.map(c => ({
                id : c.ID,
                countryCode: c.CountryCode,
                name : c.Country, 
                deaths: c.TotalDeaths,
                cases: c.TotalConfirmed
            }));
            setCountries(createdCountries);
            setTotalCases(createdCountries.map(c => c.cases)
                                            .reduce((prev, curr) => prev + curr, 0));
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
            <Typography
                variant="h5"
                align="center"
            >
                Total cases: {makeNumberWithCommas(totalCases)}
            </Typography>
            <TopCountries countries={countries} />
        </Container>
    );
}

export default Infograph