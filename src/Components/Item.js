import React, { Component } from 'react';

export default class Invoice extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className="invoice">
                <h1> Item </h1>
                <h2>Item Name: {this.props.name} </h2>
                <h2>Quantity: {this.props.quantity} </h2>
            </div>
        );
    }

}