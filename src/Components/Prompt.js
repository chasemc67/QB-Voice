// This component will prompt the user with possible things to say.
// In the future, it will even depend on context, and parse out rules for itself
// From the entity and inten json files.

import React, { Component } from 'react';

let thingsToSay = [
    "Send an invoice",
    "send an invoice to john",
    "Send a sales receipt"
]

let complicatedThingsToSay = [
    "Tell me about a sale"
];

export default class Prompt extends Component {

    render() {
        return (
            <div className="Prompt">
                <h2> Not sure what to say? how about: </h2>
                {thingsToSay.map((thing) => {
                        return <h3> {thing} </h3>
                    })
                }
                <h2> Or you could: </h2>
                {complicatedThingsToSay.map((thing) => {
                        return <h3> {thing} </h3>
                    })
                }
            </div>
        );
    }
}

Prompt.propTypes = {
    context: React.PropTypes.object
}