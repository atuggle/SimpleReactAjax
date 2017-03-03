import React, { Component } from 'react';
import "whatwg-fetch";

import States from './States';

export class Countries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryOptions: [],
            countryCode: ""
        };

        this.handleChange = this.handleChange.bind(this);
    };

    getInitialState = function() {
        return {
            countryOptions: [],
            countryCode: "",
        };
    };

    getCountryData() {
        return fetch('https://xc-ajax-demo.herokuapp.com/api/countries')
            .then((response) => {return response.json();})
            .then((response) => {
                this.setState({countryOptions: response});
            }).catch((error) => {console.log(error);});
    };

    componentDidMount = function () {
        this.getCountryData();
    };

    handleChange = function(event) {
        this.setState({countryCode: event.target.value});
    };

    render() {
        var dropdownOptions = null;
        if(this.state.countryOptions) {
            dropdownOptions = this.state.countryOptions.map((selectableOption) =>
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
                <label htmlFor={this.props.name} className="space">
                    Countries:
                </label>
                <select onChange={this.handleChange}>
                    <option value=''>Please Select...</option>
                    {dropdownOptions}
                </select>
                <br />
                <States countryCode={this.state.countryCode} />
            </div>
        );
    }
}

export default Countries;

