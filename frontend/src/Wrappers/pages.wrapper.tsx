import {FunctionComponent, useContext, useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import {FooterComponent} from "../components/footer/footer.component";
import {HeaderComponent} from "../components/header/header.component";
import {authContext} from "../contexts/authContext";
import {CookieUtil} from "../utils/cookie.util";
import {authModalContext} from "../contexts/authModalContext";
import {userService} from "../service/index.service";
import React from "react";
import {AuthContext} from "../shared/interfaces/authContext.interface";
import {PageLink} from "../shared/interfaces/pages.interface";

interface Props {
    children: JSX.Element;
    pageLinks: PageLink[]
}

export const PageWrapper = (props: Props) => {
    const {
        setIsAuthenticated,
        isAuthenticated,
        setStatusLoading,
        setUser,
        token,
        setToken,
    }: AuthContext = useContext(authContext);
    useEffect(() => {
        async function getUserByToken(): Promise<void> {
            try {
                setStatusLoading(true);
                const profile = await userService.getProfile();
                setUser(profile);
                setStatusLoading(false);
            } catch (error: any) {
                if (error.response.status === 401) {
                    setIsAuthenticated(false);
                    setToken("");
                }
            }
        }

        if (isAuthenticated && CookieUtil.get("token"))
            getUserByToken().then((r) => {
            });
        else {
            setUser(null);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        }
    }, [token]);
    return (
        <div>
            <HeaderComponent pageLinks={props.pageLinks}/>
            <ToastContainer theme="dark" rtl/>
            {props.children}
            <FooterComponent/>
        </div>
    );
};
