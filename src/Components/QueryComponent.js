// This is a single react component that can be used to query the agent.
// It will include a text field, and a submit button,
// But also a microphone button.
// And (for now) some getContext and deleteContext buttons

// Also contains a field for an agent response

import React, { Component } from 'react';
// var config = require("json!../config.json");
var config = {
    "apiToken": "Bearer 88f0b9f6ed16438c81450397aa3b2385",
    "apiTokenVal": "88f0b9f6ed16438c81450397aa3b2385",
    "sessionID": "123456789"
};

let apiAi;

export default class QueryComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {agentResponse: "", queryString: ""};

        // this.handleAgentResponse = this.handleAgentResponse.bind(this);

        this.onQueryAgentString = this.onQueryAgentString.bind(this);
        this.handleQueryAgent = this.handleQueryAgent.bind(this);
        this.handleStartListening = this.handleStartListening.bind(this);
        this.handleStopListening = this.handleStopListening.bind(this);
        this.getCurrentContext = this.getCurrentContext.bind(this);
        this.deleteCurrentContext = this.deleteCurrentContext.bind(this);
        this.handleStartListening = this.handleStartListening.bind(this);
        this.handleTextToSpeech = this.handleTextToSpeech.bind(this);
        this.handleTestAudio = this.handleTestAudio.bind(this);
    }

    onQueryAgentString(e) {
        this.setState({queryString: e.target.value.toString()});
    }

    handleQueryAgent(e) {
        let query = {
            "query": [
                this.state.queryString
            ],

            "lang": "en",
            "sessionId": config.sessionID
        };

        this.props.Agent.queryAgent(query).then((response) => {
            this.handleAgentResponse(response);
        });
    }

    handleAgentResponse(response) {
        this.setState({agentResponse: response.result.speech})
        if (response.result.speech !== "") {
            this.props.Agent.playTextAsVoice(response.result.speech);
        }
        this.props.onRecieveResponse(response);
    }

    handleStartListening(e) {
        var agentConfig = {
            server: 'wss://api.api.ai:4435/api/ws/query',
            token: config.apiTokenVal, // Use Client access token there (see agent keys).
            sessionId: config.sessionID,
            onInit: function () {
                console.log("> ON INIT use config");
                apiAi.open();
            }
        };

        apiAi = new ApiAi(agentConfig);
        apiAi.init();

        apiAi.onOpen = function () {
            apiAi.startListening();
        };

        apiAi.onResults = function (data) {

            var processResult = function (data) {
                console.log(data);
                this.setState({queryString: data.resolvedQuery});
                this.handleQueryAgent();
            }.bind(this);

            var status = data.status;
            var code;
            if (!(status && (code = status.code) && isFinite(parseFloat(code)) && code < 300 && code > 199)) {
                text.innerHTML = JSON.stringify(status);
                return;
            }
            processResult(data.result);
        }.bind(this);
    }

    handleStopListening() {
        apiAi.stopListening();
    }

    getCurrentContext() {
        this.props.Agent.getContext().then((response) => {
            console.log("Conext is: ");
            console.log(response);
        });
    }

    deleteCurrentContext() {
        this.props.Agent.deleteContext().then((response) => {
            console.log("deleted context");
        });
    }

    handleTextToSpeech() {
        this.props.Agent.getTTS("here+is+some+text").then((response) => {
            console.log(response);
        })
    }

    handleTestAudio() {
        this.props.Agent.playTextAsVoice("here is some text").then((response) => {
            console.log(response);
        })
    }

    playAudio() {
        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            context = new AudioContext();
        } catch(e) {
            alert('Web Audio API is not supported in this browser');
        }
    }

    render() {
        return (
            <div className="QueryComponent">
                <h1> Hi, I'm QB! what would you like to do? </h1>
                <textarea className="queryAgent" rows={1} onInput={this.onQueryAgentString} placeholder="Say something to QB" />
                <button type="button" className="queryAgentButton" onClick={this.handleQueryAgent}>Query Agent</button>
                <button type="button" className="startListeningButton" onClick={this.handleStartListening}>Start Listening</button>
                <button type="button" className="stopListeningButton" onClick={this.handleStopListening}>Stop Listening</button>
                <button type="button" className="getContextButton" onClick={this.getCurrentContext}>Get Context</button>
                <button type="button" className="deleteContextButton" onClick={this.deleteCurrentContext}>Delete Context</button>
                <button type="button" className="Get Test Audio" onClick={this.handleTestAudio}> Text to speech </button>
                <div className="qbResponse">
                    <h2>QB Says: {this.state.agentResponse} </h2>
                </div>
            </div>
        );
    }
}