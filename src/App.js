import React, {Component} from 'react';
import 'whatwg-fetch';
import './App.css';

import Countries from './components/Countries';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Countries />
            </div>
        );
    }
}

export default App;
