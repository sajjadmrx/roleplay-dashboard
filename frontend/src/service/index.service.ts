import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {appAxios} from "../utils/axios.util";

export const authService: AuthService = new AuthService(appAxios);
export const userService: UserService = new UserService(appAxios);
