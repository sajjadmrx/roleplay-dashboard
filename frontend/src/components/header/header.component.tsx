import React, {useContext, useEffect} from "react";
import {authContext} from "../../contexts/authContext";
import {PageLinkComponent} from "../pageLinkComponent";
import {ProfileDropDownComponent} from "../profileDropDown/profileDropDown.component";
import {ThemeSelectorComponent} from "../themeSelector/themeSelector.component";
import {} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {authModalContext} from "../../contexts/authModalContext";
import {pageLinks} from "../../shared/constants/pages.constant";
import {Button} from "react-daisyui";
import {PageLink} from "../../shared/interfaces/pages.interface";

interface Prop {
    pageLinks: PageLink[]
}

export function HeaderComponent(prop: Prop): JSX.Element {
    const {isAuthenticated} = useContext(authContext);
    const {setShowModal} = useContext(authModalContext);
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        {prop.pageLinks.map((value: any, index: number) => {
                            return (
                                <PageLinkComponent
                                    name={value.name}
                                    to={value.to}
                                    key={index + 1}
                                />
                            );
                        })}
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <ThemeSelectorComponent/>
                {isAuthenticated ? (
                    <ProfileDropDownComponent/>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}
