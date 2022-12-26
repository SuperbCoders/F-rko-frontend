const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/";
const APIKey = "91c7605fcecae713ec6b1803fc78fd21722ae2b8";

export const requestDaData = (query) => {
  return fetch(url + "party", {
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

export const requestCountries = (query) => {
  return fetch(url + "country", {
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

export const requestCodes = (query) => {
  return fetch(url + "fms_unit", {
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
