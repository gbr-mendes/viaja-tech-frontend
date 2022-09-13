export function fetchGet(url, authToken) {
  const data = fetch(
    url,
    authToken ? { headers: { Authorization: `Berear ${authToken}` } } : null
  )
    .then((resp) => resp.json())
    .then((data) => data);
  return data;
}
