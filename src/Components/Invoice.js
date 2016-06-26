import React, { Component } from 'react';

export default class Invoice extends Component {
    constructor(props){
        super(props);
        this.state = {clientName: false, amount: false, queryString: false, agentResponse: false};
    }

    render() {
        return(
            <div className="invoice">
                <h1> Invoice </h1>
                <h2>To: {this.props.parameters["given-name"] || ""} </h2>
                <h2>For: {this.props.parameters["unit-currency"].amount || ""} </h2>
            </div>
        );
    }

}