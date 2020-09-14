export class IpfsFile {
  hash?: string;
  time?: string;
  exists?: boolean;
  url?: string;
  constructor(hash?: string, time?: string, exists?: boolean, url?: string) {
    this.hash = hash;
    this.time = time;
    this.exists = exists;
    this.url = url;
  }
}

// export { IpfsFile };
