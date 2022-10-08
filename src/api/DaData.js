const url =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
const APIKey = "91c7605fcecae713ec6b1803fc78fd21722ae2b8";

export const requestDaData = (query) => {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${APIKey}`,
    },
    body: JSON.stringify({ query }),
  });
};
