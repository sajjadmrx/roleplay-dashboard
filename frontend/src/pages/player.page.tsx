import React, {useContext, useEffect, useState} from "react";
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
import {useParams} from "react-router-dom"
import {Player, PlayerAccounts, PlayerContext, PlayerStatusResponse} from "../shared/interfaces/player.interface";
import {playerService} from "../service/index.service";
import {playerContext} from "../components/player-section/context/player.context";
import {axiosError} from "../handlers/error.handler";
import {toast} from "react-toastify";

export function PlayerPage() {
    const authContextData: AuthContext = useContext(authContext)
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
    const [playerAccounts, setPlayerAccounts] = useState<PlayerAccounts>()
    const navigate = useNavigate();
    let {playerId} = useParams();
    const playerContextData = {
        ...currentPlayer,
        accounts: {...playerAccounts},
        setAccounts: setPlayerAccounts,
        setPlayer: setCurrentPlayer
    }
    useEffect(() => {
        document.title = infoStore.brandName.fa;
        if (!authContextData.isAuthenticated || !CookieUtil.get("token"))
            return navigate("/")

        if (!playerId)
            return navigate("/")

        async function getPlayer(playerIdInput: string) {
            try {
                const [player, playerStatus, playerAccounts]: [Player, PlayerStatusResponse, PlayerAccounts] =
                    await Promise.all([
                            playerService.getPlayer(playerIdInput),
                            playerService.getStatus(playerIdInput),
                            playerService.getAccounts(playerIdInput),
                        ]
                    )

                setCurrentPlayer(player)
                setPlayerAccounts(playerAccounts)
            } catch (e) {
                axiosError(e, toast.error)
            }
        }

        if (!currentPlayer)
            return () => {
                getPlayer(playerId as string)
            }
    }, [currentPlayer]);

    const pages = [...pageLinks]
    pages.push({
        name: "فروشگاه",
        to: `/${1}/shop`
    })
    return (
        <PageWrapper pageLinks={pages}>
            <playerContext.Provider value={playerContextData}>
                <div className={"max-w-6xl mx-auto"}>
                    <div className="flex flex-col shadow-md rounded-3xl lg:flex-row">
                        <aside className="bg-secondary rounded-3xl p-8 lg:mr-4 mb-2">
                            <PlayerSideSectionComponent/>
                        </aside>
                        <main className="flex-1 lg:py-8 lg:px-1.5 rounded-3xl ">
                            <PlayerCardsComponent/>
                            <PlayerVehiclesTable/>
                        </main>
                    </div>
                </div>
            </playerContext.Provider>
        </PageWrapper>
    )
}