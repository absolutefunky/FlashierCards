const BASE_URL = "http://localhost:5159";

export const api = {
    get: (path: string) =>
        fetch(`${BASE_URL}${path}`).then(res => res.json()),

    post: (path: string, body: object) =>
        fetch(`${BASE_URL}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then(res => res.json()),

    put: (path: string, body: object) =>
        fetch(`${BASE_URL}${path}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then(res => res.json()),

    delete: (path: string) =>
        fetch(`${BASE_URL}${path}`, { method: "DELETE" }),
};
