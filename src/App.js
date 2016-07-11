import React, { Component } from 'react';
import Invoice from "./Components/Invoice";
import Agent from "./Agent";
import DocumentViewManager from "./Components/DocumentViewManager";
import QueryComponent from "./Components/QueryComponent";
import Prompt from "./Components/Prompt";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            agentResponse: "",
            queryString: "",
            documentType: "",
            document: {},
            items: [],
            currentContexts: [],
            isAgentPrompting: false
        };

        this.parseAgentResponse = this.parseAgentResponse.bind(this);
        this.Agent = new Agent();
    }

    // Determine if an intent has fully fired, or the agent is prompting the user for more information
    isAgentPrompting(response) {
        for (name in response.metadata.contexts) {
            if (response.metadata.contexts[name].indexOf("_id_dialog_context") > -1){
                this.setState({isAgentPrompting: true});
                return true;
            }
        }
        this.setState({isAgentPrompting: false});
        return false;
    }

    parseAgentResponse(response) {
        console.log(response);
        this.setState({currentContexts: response.metadata.contexts});

        // Agent is prompting for more data ====
        if (this.isAgentPrompting(response)) {
                console.log("Agent is prompting");
                return;
        }

        // Intent fired successfully (or at least, and intent fired and agent isn'r prompting for data) =====
        if (response.action === "InvoiceTo" && !response.metadata.contexts.includes(("creatingDocument").toLowerCase())) {
            console.log("Creating an invoice, but not yet done");
            this.setState({document: {"name": "Invoice"}});

        } else if (response.action === "InvoiceTo" && response.metadata.contexts.includes(("creatingDocument").toLowerCase())) {
            let tempDocument = this.state.document;
            tempDocument.type = "Invoice";
            tempDocument.name = response.parameters.name;
            this.setState({document: tempDocument});

        } else if (response.action === "AddItem") {
            let tempItems = this.state.items;
            tempItems.push({"quantity": response.parameters.quantity, "service": response.parameters.service});
            this.setState({items: tempItems});

        } else if (response.action === "SalesReceiptTo" && !response.metadata.contexts.includes(("creatingDocument").toLowerCase())) {
            console.log("Creating a sales receipt, but not yet done");
            this.setState({document: {"name": "Sales Receipt"}});

        } else if (response.action === "SalesReceiptTo" && response.metadata.contexts.includes(("creatingDocument").toLowerCase())) {
            let tempDocument = this.state.document;
            tempDocument.type = "SalesReceipt";
            tempDocument.name = response.parameters.name;
            this.setState({document: tempDocument});

        } else if (response.action === "iSold" && !response.metadata.contexts.includes(("creatingDocument").toLowerCase())) {
            console.log("Creating a sales receipt, but not yet done");
            this.setState({document: {"name": "Sales Receipt"}});

        } else if (response.action === "iSold" && response.metadata.contexts.includes(("creatingDocument").toLowerCase())) {
            let tempDocument = this.state.document;
            tempDocument.type = "SalesReceipt";
            tempDocument.name = response.parameters.name;
            this.setState({document: tempDocument});
            let tempItems = this.state.items;
            tempItems.push({"quantity": response.parameters.quantity, "service": response.parameters.service});
            this.setState({items: tempItems});
        }
    }

    render() {

        return (
            <div className="qbVoice">
                <QueryComponent Agent={this.Agent} onRecieveResponse={this.parseAgentResponse} />
                <DocumentViewManager document={this.state.document} items={this.state.items} />
                <Prompt context={this.state.currentContexts} isAgentPrompting={this.state.isAgentPrompting}/>
            </div>
        );
    }
}
