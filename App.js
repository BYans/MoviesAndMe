import React from 'react';
import Navigation from "./Navigation/Nav";
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default class App extends React.Component {
    render() {
        return (
             <Provider store={Store}>
                 <Navigation/>
             </Provider>
        )
    }
}


