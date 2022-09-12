export function fetchPost(url, body, authToken) {
  const resp = fetch(url, {
    method: "POST",
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
