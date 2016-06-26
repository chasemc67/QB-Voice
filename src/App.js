import React, { Component } from 'react';
import Invoice from "./Components/Invoice";

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    getIntents() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "https://api.api.ai/v1/intents", true);
            xhr.setRequestHeader("Authorization", "Bearer 56b6a6ab491c4850aaaecef72d1b6423");
            xhr.setRequestHeader("accept", "application/json");
            xhr.responseType = "json";
            xhr.onload = function() {
                if (xhr.status === 200) {
                    typeof xhr.response === "object" ? resolve(xhr.response) : resolve(JSON.parse(xhr.response));
                } else {
                    reject(`GET request failed with status = ${xhr.status} - ${xhr.statusText}`);
                }
            };
            xhr.onerror = function() {
                reject(`GET request failed with status = ${xhr.status} - ${xhr.statusText}`);
            };
            xhr.send();
        });
    }

    postIntents(payload) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://api.api.ai/v1/intents", true);
            xhr.setRequestHeader("Authorization", "Bearer 56b6a6ab491c4850aaaecef72d1b6423");
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

    render() {

        return (
            <div className="qbVoice">
                <h1> Hi, I'm QB! what would you like to do? </h1>
                <Invoice />
            </div>
        );
    }
}
