import {Button} from "react-daisyui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {authService} from "../../service/index.service";


type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export function LoginComponent() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const buttonText: string = "ورود با استیم"
    return (
        <div>
            <p className="py-6">
                برای ورود به پنل کاربری خود و مشاهده اطلاعات اکانت ابتدا شما باید از طریق Steam
                در پنل لاگین نمایید.
                همچنین فروشگاه سرور
                نیز از طریق پنل کاربری در دسترس می باشد و شما میتوانید محصولات سرور را از بخش
                فروشگاه مشاهده نمایید.
            </p>
            {isLoading ? <div>
                <Button color={"info"} className={"loading"} disabled={true}>
                    {buttonText}
                </Button>
            </div> : <div>
                <Button color={"info"} onClick={() => loginClickHandler(setIsLoading)}
                        startIcon={<FontAwesomeIcon icon={["fab", "steam"]}/>}
                >
                    {buttonText}
                </Button>
            </div>}
        </div>
    )
}

async function loginClickHandler(setIsLoading: SetState<boolean>) {
    setIsLoading(true)
    const url: string = await authService.getSteamUrl()
    window.location.href = url
    setIsLoading(false)
}