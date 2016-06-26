import React, { Component } from 'react';
import Invoice from "./Components/Invoice";
import Agent from "./Utils/Agent";
import DocumentViewManager from "./Components/DocumentViewManager";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {agentResponse: "", queryString: "", documentType: "", documentParameters: {}};
        this.onQueryAgentString = this.onQueryAgentString.bind(this);
        this.handleQueryAgent = this.handleQueryAgent.bind(this);

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
                <h2>QB Says: {this.state.agentResponse} </h2>
                <DocumentViewManager documentType={this.state.documentType} parameters={this.state.documentParameters} />
            </div>
        );
    }
}
