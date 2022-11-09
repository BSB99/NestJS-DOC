export interface ErrorObj {
    error: string;
    statusCode: number;
    message: number;
  }

export interface Payload {
  email: string;
  id? : string;
  type: string;
}