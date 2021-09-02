declare module "http" {
  interface IncomingMessage {
    raw: Buffer;
  }
}
