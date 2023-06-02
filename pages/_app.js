import '../styles/globals.css'

// internal import
import { Component } from "react"
import {NavBar} from "../Components/index"
import { ChatAppProvider } from "../Context/ChatAppContext"
import "bootstrap/dist/css/bootstrap.min.css";

const MyApp = ({Component,pageProps}) =>{
    return (
      <div className="app_main_div">
        <ChatAppProvider>
          <NavBar />
          <Component {...pageProps} />
        </ChatAppProvider>
      </div>
    );
}

export default MyApp