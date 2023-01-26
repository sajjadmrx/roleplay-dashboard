import {User} from "./user.interface";

export interface AuthContext {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: any;
    statusLoading: boolean;
    setStatusLoading: any;
    token: string;
    setToken: any;
}
