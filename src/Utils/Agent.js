export default class Agent {

    postJSON(url, payload) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Authorization", "Bearer 88f0b9f6ed16438c81450397aa3b2385");
            xhr.setRequestHeader("accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.responseType = "json";
            xhr.onload = function() {
                if (xhr.status === 200) {
                    typeof xhr.response === "object" ? resolve(xhr.response) : resolve(JSON.parse(xhr.response));
                } else if (xhr.status === 400) {
                    reject(xhr.response.message);
                } else {
                    reject(`POST request failed with status = ${xhr.status} - ${xhr.statusText}`);
                }
            };
            xhr.onerror = function() {
                reject(`POST request failed with status = ${xhr.status} - ${xhr.statusText}`);
            };
            xhr.send(JSON.stringify(payload));
        });
    }

    getJSON(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.setRequestHeader("Authorization", "Bearer 88f0b9f6ed16438c81450397aa3b2385");
            xhr.setRequestHeader("accept", "application/json");
            xhr.responseType = "json";
            xhr.onload = function() {
                if (xhr.status === 200) {
                    typeof xhr.response === "object" ? resolve(xhr.response) : resolve(JSON.parse(xhr.response));
                } else if (xhr.status === 400) {
                    reject(xhr.response.message);
                } else {
                    reject(`POST request failed with status = ${xhr.status} - ${xhr.statusText}`);
                }
            };
            xhr.onerror = function() {
                reject(`POST request failed with status = ${xhr.status} - ${xhr.statusText}`);
            };
            xhr.send(JSON.stringify(payload));
        });
    }

    postIntents(payload) {
        const url = "https://api.api.ai/v1/intents"

        return new Promise((resolve, reject) => {
            this.postJSON(url, payload).then((response) => {
                resolve(response);
            });
        });
    }

    getIntents() {
        const url = "https://api.api.ai/v1/intents"

        return new Promise((resolve, reject) => {
            this.getJSON(url, payload).then((response) => {
                resolve(response);
            });
        });
    }

    queryAgent(payload) {
        const url = "https://api.api.ai/v1/query"

        console.log("Querying with payload: ");
        console.log(payload);
        return new Promise((resolve, reject) => {
            this.postJSON(url, payload).then((response) => {
                console.log(response);
                resolve(response);
            });
        });
    }

}