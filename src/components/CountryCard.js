import React from "react";
import { Avatar, Card, Typography, makeStyles, CardHeader, CardContent } from "@material-ui/core"
import makeNumberWithCommas from "../helperFn";

const useStyles = makeStyles({
    countryCard: {
        padding: 10,
        margin: 20,
    },
    infoText: {
        paddingLeft: 10
    }
});

function CountryCard({country}) {
    const classes = useStyles();
    return (
        <Card className={classes.countryCard}>
            <CardHeader 
                title={country.name}
                titleTypographyProps={{
                    variant: "h5"
                }}
                avatar={
                    <Avatar src={`https://countryflagsapi.com/png/${country.countryCode}`} />
                }
            />
            <CardContent>
                <Typography className={classes.infoText}>
                    {makeNumberWithCommas(country.cases)} cases
                </Typography>
                <Typography className={classes.infoText}>
                    {makeNumberWithCommas(country.deaths)} deaths
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CountryCard