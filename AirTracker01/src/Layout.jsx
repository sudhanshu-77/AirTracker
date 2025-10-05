import React, { createContext, useState } from "react";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Chatbot from "./Components/Chatbot.jsx";
import DarkModeToggle from "./Components/DarkModeToggle.jsx";
import BoardingPassWallet from "./Components/BoardingPassWallet.jsx";
import PWAInstaller from "./Components/PWAInstaller.jsx";
import OfflineIndicator from "./Components/OfflineIndicator.jsx";
import { Outlet } from "react-router-dom";
import ResulSearch from "./Components/Result/ResulSearch.jsx";
function Layout(){
    
    return(
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <Outlet />
        <Footer />
        <Chatbot />
        <DarkModeToggle />
        <BoardingPassWallet />
        <PWAInstaller />
        <OfflineIndicator />
        </div>
    )
}
export default Layout