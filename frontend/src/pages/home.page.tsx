import React from "react";
import {useEffect, useState, useContext} from "react";
import {infoStore} from "../store/info.store";
import {PageWrapper} from "../Wrappers/pages.wrapper";
import {PlaySelectorComponent} from "../components/playerSelector/playSelector";
import {authContext} from "../contexts/authContext";
import {AuthContext} from "../shared/interfaces/authContext.interface";
import {LoginComponent} from "../components/login/login";
import {pageLinks} from "../shared/constants/pages.constant";

export function HomePage() {
    const authContextData: AuthContext = useContext(authContext)
    useEffect(() => {
        document.title = infoStore.brandName.fa;
    }, []);

    return (
        <PageWrapper pageLinks={pageLinks}>
            <div className="lg:flex-row">
                <main className="rounded-3xl">

                    <div className="hero min-h-screen">
                        <div
                            className="px-0 sm:p-4 hero-content text-center border-[#5d7e9721]  border-[4px] rounded-[18px] max-w-[350px] md:max-w-[450px] md:min-w-[720px]  shadow-lg mb-1 ">
                            <div className="max-w-full sm:pt-[100px] sm:pb-[100px] sm:pr-[30px] sm:pl-[30px] p-1">
                                <div className={"flex justify-center mb-5"}>
                                    <h1 className="text-5xl font-bold">
                                        <span
                                            className={" text-amber-700"}>IRWorld</span> Role Play</h1>
                                </div>
                                {authContextData.isAuthenticated ? <PlaySelectorComponent/> : <LoginComponent/>}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </PageWrapper>
    );
}
