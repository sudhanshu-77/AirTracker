import React, { createContext, useState } from "react";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import ResulSearch from "./Components/Result/ResulSearch.jsx";
function Layout(){
    
    return(
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    )
}
export default Layout