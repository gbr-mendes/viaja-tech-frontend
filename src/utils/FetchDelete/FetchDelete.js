export function fetchDelete(url, authToken) {
  if (authToken !== undefined) {
    const respData = fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Berear ${authToken}` },
    })
      .then((resp) => resp.json())
      .then((data) => data);

    return respData;
  }
  return null;
}
