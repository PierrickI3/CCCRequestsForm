export const searchMailConfiguration = (token, query) => {
  console.log(`searchMailConfiguration ${JSON.stringify(query)}`);

  const body = {
    token: token,
    region: query.region,
    product: query.product,
    category: query.category,
  };
  return fetch(`http://localhost:3000/mailconfig`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.status < 200 || response.status > 299) throw new Error(JSON.stringify(response));
      if (response && response.length > 0) {
        return response;
      }
      return [];
    });
};

export const updateMailConfiguration = (body) => {
  console.log(`updateMailConfiguration ${JSON.stringify(body)}`);

  return fetch(`http://localhost:3000/mailconfig`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.status < 200 || response.status > 299) throw new Error(JSON.stringify(response));
      if (response && response.length > 0) {
        return response;
      }
      return [];
    });
};
