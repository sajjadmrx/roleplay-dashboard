// import refreshTokenService from "../services/refreshToken.service";
// export interface IRefreshToken {
//     id: number;
//     user_id: number;
//     token: string;
//     createdAt: Date;
// }
// export class RefreshToken implements IRefreshToken {
//     id: number;
//     user_id: number;
//     token: string;
//     createdAt: Date;
//     constructor(refresh: IRefreshToken) {
//         this.id = refresh.id;
//         this.user_id = refresh.user_id;
//         this.token = refresh.token;
//         this.createdAt = refresh.createdAt;
//     }

//     update(): Promise<string> {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 const result = await refreshTokenService.updateToken(this.user_id, this.token)
//                 resolve(result)
//             } catch (error) {
//                 reject(error)
//             }
//         })
//     }
//     deleteToken(): Promise<void> {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 const result = await refreshTokenService.deleteToken(this.user_id, this.token)
//                 resolve()
//             } catch (error) {
//                 reject(error)
//             }
//         })
//     }


// }
