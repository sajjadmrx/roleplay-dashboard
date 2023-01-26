const steamHex = require("steamhex");

export class SteamIdConverter {
  constructor(private id: string) {}

  steamHexToSteamId(): string {
    return steamHex.hexToDec(this.id);
  }

  getSteamHex(): string {
    return steamHex.decToHex(this.id, { prefix: true });
  }
}
