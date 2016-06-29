import React, { Component } from 'react';

export default class SalesReceipt extends Component {
    constructor(props){
        super(props);
        this.state = {clientName: false, amount: false, queryString: false, agentResponse: false};
    }

    render() {
        return(
            <div className="salesReceipt">
                <h1> Sales Receipt </h1>
                <h2>To: {this.props.parameters["name"] || ""} </h2>
                <h2>For: {this.props.parameters["currency"].amount || ""} </h2>
                <h2>Item: {this.props.parameters["service"] || ""} quantity: {this.props.parameters["quantity"] || ""} </h2>
            </div>
        );
    }

}