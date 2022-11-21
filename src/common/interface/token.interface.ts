export interface Payload {
    no?: number;
    email: string;
    id? : string;
}

export interface Secret {
    key: string;
    expiresin: string;
}