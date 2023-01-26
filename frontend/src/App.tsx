import React, {useEffect, useState} from "react";
import "./App.css";
import {authContext} from "./contexts/authContext";

import {HomePage} from "./pages/home.page";
import {CookieUtil} from "./utils/cookie.util";
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free-solid';
import '@fortawesome/fontawesome-free-brands'
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link, useParams,
} from "react-router-dom";
import {CallbackRoute} from "./routes/callback.route";
import {appAxios} from "./utils/axios.util";
import ms from "ms";
import {PlayerPage} from "./pages/player.page";
import {User} from "./shared/interfaces/user.interface";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        CookieUtil.has("token")
    );
    const [user, setUser] = useState<User | null>(null);
    const [statusLoading, setStatusLoading] = useState(true);
    const [token, setToken] = useState(CookieUtil.get("token"));
    const AuthContextValues = {
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        statusLoading,
        setStatusLoading,
        token,
        setToken,
    };


    useEffect(() => {
        if (!token) CookieUtil.delete("token");
        const expireDate = new Date(new Date().getTime() + ms("20d"));
        // @ts-ignore
        CookieUtil.set("token", token, expireDate)
    }, [token]);

    return (
        <authContext.Provider value={AuthContextValues}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/:playerId"} element={<PlayerPage/>}></Route>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path={"/callbacks/*"} element={<CallbackRoute/>}/>
                </Routes>
            </BrowserRouter>
        </authContext.Provider>
    );
}


export default App;
