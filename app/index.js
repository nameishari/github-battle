import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Batlle'

// A component is concerned about
// Component
// State
// Lifecycle
// UI

// A component is a class which extends React.Component
class App extends React.Component {
    render() {
        // This is JSX, will be compiled by Babel
        return (
                <div> 
                    <Battle/>
                </div>
            )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)