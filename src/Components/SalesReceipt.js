import React, { Component } from 'react';

export default class SalesReceipt extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className="salesReceipt">
                <h1> Sales Receipt </h1>
                <h2>To: {this.props.name} </h2>
            </div>
        );
    }

}