import { Alert } from 'react-native';

export async function responseWithJsonSafe<T = unknown>(a: string, b?: RequestInit): Promise<T> {
  const response = await fetch(a, b);
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    Alert.alert('Failed JSON from ' + a + ' Text: ' + text);
    throw new Error(e.message + '\n\n\n' + text);
  }
}
