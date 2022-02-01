import React from "react";
import { Container } from "@material-ui/core"
import CountryCard from "./CountryCard";

const sortByCases = (a, b) => {
    return b.cases - a.cases;
}

function TopCountries({countries}) {
    const getTop5Countries = () => {
        countries.sort(sortByCases);
        return countries.slice(0, 5);
    }
    const top5 = getTop5Countries();

    return (
        <Container>
            {top5.map(country => {
                return <CountryCard 
                            key={country.id} 
                            country={country}
                        />
            })}
        </Container>
    );
}

export default TopCountries