import React from "react";
import Navbar from "./Navbar";

function Layout({isAuth, logUserOut}) {
    return (
        <div>
            <Navbar isAuth={isAuth} logUserOut={logUserOut}/>
        </div>
    );
}

export default Layout