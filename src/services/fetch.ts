export abstract class Service {
  token: string | Promise<string>;
  BASE_URL: string;

  constructor(token: string | Promise<string>, BASE_URL: string) {
    this.token = token;
    this.BASE_URL = BASE_URL;
  }

  async innerFetch<T = unknown>(path: string): Promise<T> {
    if (typeof this.token != 'string') {
      this.token = await this.token;
    }

    const response = await fetch(this.BASE_URL + path, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + this.token },
    });

    return await response.json();
  }

  async innerFetchPost(path: string, body: any): Promise<Response> {
    if (typeof this.token != 'string') {
      this.token = await this.token;
    }
    const o = {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + this.token, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    return await fetch(this.BASE_URL + path, o);
  }
}
