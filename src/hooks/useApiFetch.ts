import useAuth from '../components/context/AuthContext';
import { API_URL } from '../constants';

// TODO pass errors to react query
const useApiFetch = () => {
  const { idToken } = useAuth();

  async function get<T = unknown>(path: string): Promise<T> {
    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    const response = await fetch(API_URL + path, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + idToken },
    });
    const json = await response.json();

    console.log(`[API_REQUEST] GET ${path}: ${response.status} with text ${JSON.stringify(json)}`);

    return json;
  }

  function post(path: string, body: object) {
    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    const response = fetch(API_URL + path, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + idToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log(`[API_REQUEST] POST ${path} with body ${JSON.stringify(body)}`);

    return response;
  }

  return { get, post };
};

export default useApiFetch;
