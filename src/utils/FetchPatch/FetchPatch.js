export function fetchPatch(url, body, authToken) {
  const resp = fetch(url, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    });
  return resp;
}
