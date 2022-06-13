export async function callFetch(url, onFetchSuccess = () => { }, onFetchFailed = () => { }, request = {}) {
    try {
        const response = await fetch(url, request);
        if (response.ok) {
            const data = await response.json();
            onFetchSuccess(data)
        } else {
            const message = response.status;
            throw new Error(message);
        }
    }
    catch (err) {
        if (err instanceof SyntaxError) {
            onFetchFailed('Bad response from server.');
        } else {
            onFetchFailed(err.message);
        }
    }
}