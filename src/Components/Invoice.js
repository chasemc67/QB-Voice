import React, { Component } from 'react';

export default class Invoice extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className="invoice">
                <h1> Invoice </h1>
                <h2>To: {this.props.name} </h2>
            </div>
        );
    }

}