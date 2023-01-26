import React, {useContext, useEffect} from "react";
import {PageWrapper} from "../Wrappers/pages.wrapper";
import {PlayerSideSectionComponent} from "../components/player-section/side/side";
import {PlayerCardsComponent} from "../components/player-section/cards/cards";
import {PlayerVehiclesTable} from "../components/player-section/vehicles/table/table";
import {pageLinks} from "../shared/constants/pages.constant";
import {AuthContext} from "../shared/interfaces/authContext.interface";
import {authContext} from "../contexts/authContext";
import {infoStore} from "../store/info.store";
import {useNavigate} from "react-router-dom";
import {CookieUtil} from "../utils/cookie.util";


export function PlayerPage() {
    const authContextData: AuthContext = useContext(authContext)
    const navigate = useNavigate();
    useEffect(() => {
        document.title = infoStore.brandName.fa;
        if (!authContextData.isAuthenticated || !CookieUtil.get("token"))
            return navigate("/")

    }, []);

    const pages = [...pageLinks]
    pages.push({
        name: "فروشگاه",
        to: `/${1}/shop`
    })
    return (
        <PageWrapper pageLinks={pages}>
            <div className={"max-w-7xl mx-auto"}>
                <div className="flex flex-col shadow-md rounded-3xl lg:flex-row">
                    <aside className="bg-secondary rounded-3xl p-8">
                        <PlayerSideSectionComponent/>
                    </aside>
                    <main className="p-6 lg:py-8 lg:px-1.5 rounded-3xl">
                        <PlayerCardsComponent/>
                        <PlayerVehiclesTable/>
                    </main>
                </div>
            </div>
        </PageWrapper>
    )
}