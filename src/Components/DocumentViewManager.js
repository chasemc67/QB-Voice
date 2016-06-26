import React, { Component } from 'react';
import Invoice from "./Invoice";
import SalesReceipt from "./SalesReceipt";

export default class DocumentViewManager extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.documentType === "Invoice") {
            return(
                <Invoice parameters={this.props.parameters}/>
            );
        } else if (this.props.documentType === "SalesReceipt") {
            return(
                <SalesReceipt parameters={this.props.parameters} />
            );
        } else {
            return(
                <div> </div>
            );
        }
    }
}

DocumentViewManager.propTypes = {
    documentType: React.PropTypes.string,
    documentParameters: React.PropTypes.object
};