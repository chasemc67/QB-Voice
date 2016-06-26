import React, { Component } from 'react';

export default class Invoice extends Component {
    constructor(props){
        super(props);
        this.state = {clientName: false, amount: false, queryString: false, agentResponse: false};

        this.onNameInput = this.onNameInput.bind(this);
        this.onAmountInput = this.onAmountInput.bind(this);
        this.onQueryAgent = this.onQueryAgent.bind(this);
        this.handleQueryAgent = this.handleQueryAgent.bind(this);
    }

    onNameInput(e) {
        return;
    }

    onAmountInput(e) {
        return;
    }

    onQueryAgent(e) {
        this.setState({queryString: e.target.value.toString()});
    }

    handleQueryAgent(e) {
        let query = {
            "query": [
                this.state.queryString
            ],
            "lang": "en"
        };

        this.queryAgent(query).then((response) => {
            console.log(response);
            this.setState({agentResponse: response.result.speech});
        });
    }

    queryAgent(payload) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://api.api.ai/v1/query", true);
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
        return(
            <div className="invoice">
                <h1> Invoice </h1>
                <textarea className="clientName" rows={1} onInput={this.onNameInput} placeholder="Name" />
                <textarea className="clientAmount" rows={1} onInput={this.onAmountInput} placeholder="Amount" />
                <textarea className="queryAgent" rows={1} onInput={this.onQueryAgent} placeholder="Say something to QB" />
                <button type="button" className="queryAgentButton" onClick={this.handleQueryAgent}>Query Agent</button>

                <textarea className="agentOutput" rows={1} placeholder={this.state.agentResponse} />
            </div>
        );
    }

}