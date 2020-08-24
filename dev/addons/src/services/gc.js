export const searchUser = (env, token, pattern) => {
  console.log(`searchUser([${pattern}])`);
  const patternParsed = pattern.split(" ");
  let query = [{ type: "EXACT", fields: ["state"], value: "active" }];
  for (const item of patternParsed) {
    if (!item) continue;
    query.push({ type: "QUERY_STRING", fields: ["name", "email", "title", "department"], value: item });
  }
  const body = {
    pageSize: 5,
    pageNumber: 1,
    types: ["users"],
    query,
    sortOrder: "ASC",
    sortBy: "name",
  };
  return fetch(`https://api.${env}/api/v2/search?profile=false`, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.status < 200 || response.status > 299) throw new Error(JSON.stringify(response));
      if (response.results && response.results.length > 0) {
        return response.results;
      }
      return [];
    });
};
