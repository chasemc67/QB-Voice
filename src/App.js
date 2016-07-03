import React, { Component } from 'react';
import Invoice from "./Components/Invoice";
import Agent from "./Agent";
import DocumentViewManager from "./Components/DocumentViewManager";
import QueryComponent from "./Components/QueryComponent";

let apiAi;

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {agentResponse: "", queryString: "", documentType: "", document: {}, items: []};

        this.parseAgentResponse = this.parseAgentResponse.bind(this);
        this.Agent = new Agent();

        // This is where we will save the state of the docuemnt (invoice/sales receipt)
    }

    parseAgentResponse(response) {
        console.log(response);

        if (response.result.action === "Invoice" && !response.result.metadata.contexts.includes(("creatingDocument").toLowerCase())) {
            console.log("Creating an invoice, but not yet done");
            this.setState({document: {"name": "Invoice"}});
        } else if (response.result.action === "Invoice" && response.result.metadata.contexts.includes(("creatingDocument").toLowerCase())) {
            console.log("Creating an invoice, all fields are filled in");
            let tempDocument = this.state.document;
            tempDocument.type = "Invoice";
            tempDocument.name = response.result.parameters.name;
            this.setState({document: tempDocument});

        } else if (response.result.action === "AddItem") {
            // I need to know what I'm done so i wont add duplicate items,
            console.log("Adding an Item, but i don't know if im done with it yet");
            let tempItems = this.state.items;
            tempItems.push({"quantity": response.result.parameters.quantity, "service": response.result.parameters.service});
            this.setState({items: tempItems});
        }
    }

    render() {

        return (
            <div className="qbVoice">
                <QueryComponent Agent={this.Agent} onRecieveResponse={this.parseAgentResponse} />
                <DocumentViewManager document={this.state.document} items={this.state.items} />
            </div>
        );
    }
}
