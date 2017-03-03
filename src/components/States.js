import React, { Component } from 'react';
import "whatwg-fetch";

export class States extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateOptions: [],
            countryCode: ''
        };
    }

    getStateData(countryCode) {
        if (countryCode) {
            let data = 'country=' + countryCode;
            console.log(data);
            fetch('https://xc-ajax-demo.herokuapp.com/api/states/',
                {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: data
                })
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    let sortedResponse = response.sort(function(a, b) {
                        if(a.name < b.name) return -1;
                        if(a.name > b.name) return 1;
                        return 0;
                    });
                    this.setState({stateOptions: sortedResponse});
                }).catch((error) => {
                    console.log(error);
                });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.getStateData(nextProps.countryCode);

        if (nextProps.countryCode !== this.state.countryCode) {
            this.setState({ countryCode: nextProps.countryCode });
        }
    };

    render() {
        var dropdownOptions = null;
        if(this.state.stateOptions && this.props.countryCode) {
            dropdownOptions = this.state.stateOptions.map((selectableOption) =>
                <option
                    key={selectableOption.code}
                    value={selectableOption.code}>
                    {selectableOption.name}
                </option>).filter(function (child) {
                return child !== undefined;
            });
        }
        return (
            <div className="App-body">
                <label className="space">
                    States:
                </label>
                <select>
                    {dropdownOptions}
                </select>
            </div>
        );
    }
}

export default States;

