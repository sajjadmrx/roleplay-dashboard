const steamHex = require("steamhex")

class methods {


    convertSteamHexToSteamId(steamHexInput: string): string {
        return steamHex.hexToDec(steamHexInput)
    }
    getSteamHex(steamId: string): string {
        return steamHex.decToHex(steamId, { prefix: true })
    }


}

export default new methods()