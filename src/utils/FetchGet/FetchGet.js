export function fetchGet(url, authToken) {
  const data = fetch(url, { headers: { Authorization: `Berear ${authToken}` } })
    .then((resp) => resp.json())
    .then((data) => data);
  return data;
}
