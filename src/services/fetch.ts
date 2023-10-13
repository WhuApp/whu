export abstract class Service {
  token: string | Promise<string>;
  BASE_URL: string;

  protected constructor(token: string | Promise<string>, BASE_URL: string) {
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
    const json = await response.json();

    console.log(
      `[API_REQUEST] GET ${this.BASE_URL + path}: ${response.status} with text ${JSON.stringify(
        json
      )}`
    );

    return json;
  }

  async innerFetchPost(path: string, body: any): Promise<Response> {
    if (typeof this.token != 'string') {
      this.token = await this.token;
    }
    const options = {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + this.token, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    const response = await fetch(this.BASE_URL + path, options);

    console.log(`[API_REQUEST] POST ${this.BASE_URL + path}: ${response.status}`);

    return response;
  }
}
