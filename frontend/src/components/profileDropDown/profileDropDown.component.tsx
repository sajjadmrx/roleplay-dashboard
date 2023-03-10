import React from "react";
import {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import {authContext} from "../../contexts/authContext";
import {CookieUtil} from "../../utils/cookie.util";
import {AuthContext} from "../../shared/interfaces/authContext.interface";
import {User} from "../../shared/interfaces/user.interface";
import {Button} from "react-daisyui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function ProfileDropDownComponent(): JSX.Element {
    const user: User = useContext(authContext).user as User;
    const authContextData = useContext(authContext);
    const statusLoading = useContext(authContext).statusLoading;
    if (statusLoading) {
        return (
            <div>
                <button className="btn btn-ghost loading"></button>
            </div>
        );
    } else
        return (
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="avatar online">
                        <div className="w-10 rounded-full">
                            <img src={user.avatar} alt={`${user.displayName} avatar`}/>
                        </div>
                    </div>
                </label>
                <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li onClick={() => logoutHandler(authContextData)}>
                        <a>خروج</a>
                    </li>
                </ul>
            </div>
        );
}

function logoutHandler(authContext: AuthContext) {
    authContext.setIsAuthenticated(false);
    authContext.setToken(null)
    authContext.setUser(null)
    CookieUtil.delete("token");
}
