export async function responseWithJsonSafe<T = unknown>(a: string, b?: RequestInit): Promise<T> {
  console.log('request to ' + a);
  const response = await fetch(a, b);
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.log('Failed JSON from ' + a + ' Text: ' + text);
    throw new Error(e.message + '\n\n\n' + text);
  }
}
