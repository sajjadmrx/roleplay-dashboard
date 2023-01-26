import {Route, Routes, useLocation, useNavigate,} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {PageWrapper} from "../Wrappers/pages.wrapper";
import {pageLinks} from "../shared/constants/pages.constant";
import {authService} from "../service/index.service";
import {AuthContext} from "../shared/interfaces/authContext.interface";
import {authContext} from "../contexts/authContext";
import {axiosError} from "../handlers/error.handler";
import {toast} from "react-toastify";


export function CallbackPage() {
    return (
        <Routes>
            <Route path="auth" handle={true} element={<AuthCallBack/>} caseSensitive={true}/>
        </Routes>
    )
}

export function AuthCallBack() {
    let {search} = useLocation();
    const query = new URLSearchParams(search);
    const authContextData: AuthContext = useContext(authContext)
    const [claimed_id] = useState<string | null>(query.get("openid.claimed_id"))
    const navigate = useNavigate();
    useEffect(() => {
        if (!query.get("openid.claimed_id")) {
            window.location.href = "/"
            return
        }

        async function getToken() {
            try {
                const token: string = await authService.getToken(String(claimed_id))
                authContextData.setToken(token)
            } catch (e) {
                axiosError(e, toast.error)
            } finally {
                return navigate("/")
            }
        }

        return () => {
            getToken()
        }
    }, [claimed_id])

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
                                        لطفا کمی صبر کنید...
                                    </h1>
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </PageWrapper>

    )
}

function test() {
    const url = new URLSearchParams(window.location.href)
    console.log(url)
}