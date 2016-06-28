import React, { Component } from 'react';
import Invoice from "./Components/Invoice";
import Agent from "./Utils/Agent";
import DocumentViewManager from "./Components/DocumentViewManager";

let apiAi;

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {agentResponse: "", queryString: "", documentType: "", documentParameters: {}};
        this.onQueryAgentString = this.onQueryAgentString.bind(this);
        this.handleQueryAgent = this.handleQueryAgent.bind(this);
        this.handleStartListening = this.handleStartListening.bind(this);
        this.handleStopListening = this.handleStopListening.bind(this);

        this.Agent = new Agent();
    }

    onQueryAgentString(e) {
        this.setState({queryString: e.target.value.toString()});
    }

    handleQueryAgent(e) {
        let query = {
            "query": [
                this.state.queryString
            ],
            "lang": "en"
        };

        this.Agent.queryAgent(query).then((response) => {
            this.parseAgentResponse(response);
        });

        this.setState({queryString: ""});
    }

    handleStartListening(e) {
        var config = {
            server: 'wss://api.api.ai:4435/api/ws/query',
            token: "88f0b9f6ed16438c81450397aa3b2385",// Use Client access token there (see agent keys).
            sessionId: "0000000000000",
            onInit: function () {
                console.log("> ON INIT use config");
                apiAi.open();
            }
        };

        apiAi = new ApiAi(config);
        apiAi.init();

        apiAi.onOpen = function () {
            apiAi.startListening();
        };

        apiAi.onResults = function (data) {

            var processResult = function (data) {
                console.log(data);
            }

            var status = data.status;
            var code;
            if (!(status && (code = status.code) && isFinite(parseFloat(code)) && code < 300 && code > 199)) {
                text.innerHTML = JSON.stringify(status);
                return;
            }
            processResult(data.result);
        };
    }



    handleStopListening() {
        apiAi.stopListening();
    }


    parseAgentResponse(response) {
        this.setState({
            agentResponse: response.result.speech,
            documentType: response.result.action,
            documentParameters: response.result.parameters
        });
    }

    render() {

        return (
            <div className="qbVoice">
                <h1> Hi, I'm QB! what would you like to do? </h1>
                <textarea className="queryAgent" rows={1} onInput={this.onQueryAgentString} placeholder="Say something to QB" />
                <button type="button" className="queryAgentButton" onClick={this.handleQueryAgent}>Query Agent</button>
                <button type="button" className="queryAgentButton" onClick={this.handleStartListening}>Start Listening</button>
                <button type="button" className="queryAgentButton" onClick={this.handleStopListening}>Stop Listening</button>
                <div className="qbResponse">
                    <h2>QB Says: {this.state.agentResponse} </h2>
                </div>
                <DocumentViewManager documentType={this.state.documentType} parameters={this.state.documentParameters} />
            </div>
        );
    }
}
