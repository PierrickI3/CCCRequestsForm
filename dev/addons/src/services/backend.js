export const searchMailConfiguration = (token, query) => {
    console.log(`searchMailConfiguration ${query}`);

    const body = {
        "token": token,
        "region": query.region,
        "product": query.product
    };
    return fetch(`http://localhost:3000/mailconfig`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            if (response.status < 200 || response.status > 299) throw new Error(JSON.stringify(response));
            if (response.results && response.results.length > 0) {
                return response.results;
            }
            return [];
        });
};
