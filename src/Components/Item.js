import React, { Component } from 'react';

export default class Invoice extends Component {
    constructor(props){
        super(props);
        this.state = {itemName: false, quantity: false};
    }

    render() {
        return(
            <div className="invoice">
                <h1> Item </h1>
                <h2>Item Name: {this.props.parameters["service"] || ""} </h2>
                <h2>Quantity: {this.props.parameters["quantity"] || ""} </h2>
            </div>
        );
    }

}