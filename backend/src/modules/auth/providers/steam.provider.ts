// @ts-ignore
import SteamWebAPI from "steam-web";


export function getSteamUserProfile(key: string, steamID: string): Promise<any> {
    const steam = new SteamWebAPI({apiKey: key, format: "json"});
    return new Promise((resolve, reject) => {
        steam.getPlayerSummaries({
            steamids: [steamID],
            callback: function (err: any, result: any) {
                if (err) {
                    return reject(err);
                }

                if (
                    !(
                        result &&
                        result.response &&
                        Array.isArray(result.response.players) &&
                        result.response.players.length > 0
                    )
                ) {
                    return reject(
                        new Error(
                            "Malformed response while retrieving user's Steam profile information"
                        )
                    );
                }
                const player = result.response.players[0];
                const profile = {
                    provider: "steam",
                    id: player.steamid,
                    displayName: player.personaname,
                    real_name: player.realname,
                    photos: {
                        medium: player.avatarmedium,
                        full: player.avatarfull,
                    },
                };

                resolve(profile);
            },
        });
    });
}
