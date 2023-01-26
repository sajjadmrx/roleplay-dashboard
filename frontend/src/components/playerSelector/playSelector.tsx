import React, {useContext, useEffect, useState} from "react";
import {Avatar, Button} from "react-daisyui";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {authContext} from "../../contexts/authContext";
import {userService} from "../../service/index.service";
import {axiosError} from "../../handlers/error.handler";
import {toast} from "react-toastify";
import {Player} from "../../shared/interfaces/player.interface";
import {CookieUtil} from "../../utils/cookie.util";


export function PlaySelectorComponent() {
    const [ready, setReady] = useState<boolean>(true)
    const authContextData = useContext(authContext);
    const statusLoading = useContext(authContext).statusLoading;
    const [players, setPlayers] = useState<Array<Player>>([])
    useEffect(() => {

        async function getPlayers() {
            try {
                const players: Array<Player> = await userService.getPlayers()
                setPlayers(players)
            } catch (e) {
                axiosError(e, toast.error)
            }
        }

        return () => {
            if (!CookieUtil.get("token") || !authContextData.isAuthenticated) return;
            else
                getPlayers()
        }

    }, [authContextData.user])
    return (
        <div>
            <label className={"mb-4"}>کاراکتر خود رو انتخاب کنید:</label>
            <div className={"grid gap-1 mt-2"} dir={"ltr"}>

                {players.length ?

                    <div>

                        {players.map((user: Player, index) => {
                            return (
                                <div key={index + 20}
                                     className={"grid  grid-cols-1 md:grid-cols-3 py-5 bg-gray-800 rounded mb-2"}>
                                    <div>
                                        <Avatar shape={"circle"} letters={user.id.toString()}
                                                size={"sm"}/>
                                    </div>
                                    <div>
                                        <h1 className={"text-center py-3 font-medium text-emerald-50"}> {user.firstname} {user.lastname} </h1>
                                    </div>
                                    <div>
                                        <Link to={`/${user.id}`}>
                                            <Button shape={"circle"} color={"ghost"}>
                                                <FontAwesomeIcon
                                                    icon={["fas", "door-open"]}
                                                    className={"text-white"}></FontAwesomeIcon>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}

                        <div
                            className={"grid  grid-cols-1 md:grid-cols-3 py-5 bg-gray-800 rounded"}>
                            <div>
                                <Avatar shape={"circle"} letters="new"
                                        size={"sm"}/>
                            </div>
                            <div>
                                <h1 className={"text-center py-3 font-medium text-emerald-50"}> خرید کاراکتر جدید </h1>
                            </div>
                            <div>
                                <Button shape={"circle"} color={"ghost"}>
                                    <FontAwesomeIcon
                                        icon={["fas", "shopping-basket"]}
                                        className={"text-white"}></FontAwesomeIcon>
                                </Button>
                            </div>
                        </div>

                    </div> : <div>
                        {[1, 2, 3].map((x) => {
                            return (
                                <div
                                    className={"grid  grid-cols-1 md:grid-cols-3 py-5 bg-gray-800 rounded"}>
                                    <div>
                                        <Avatar shape={"circle"} letters=""
                                                size={"sm"}/>
                                    </div>
                                    <div>
                                        <h1 className={"text-center py-3 font-medium text-emerald-50 bg-slate-600"}>

                                        </h1>
                                    </div>
                                    <div>
                                        <Button shape={"circle"} color={"ghost"}>
                                            <Avatar shape={"circle"} letters=""
                                                    size={"xs"}/>
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                }

            </div>
        </div>
    )
}