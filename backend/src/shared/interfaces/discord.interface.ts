export interface IResponseGetToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface IResponseGetIdentity {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  email: string;
  verified: boolean;
  banner: string;
  access_token: string;
  getFullUsername(): string;
}


export interface IErrorGetIdentity extends Error {
  code: number;
  message: string;
  tokenIsExpired: boolean;
}