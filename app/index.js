import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {ThemeProvider} from './contexts/theme'
import Nav from './components/Nav'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Loading from './components/Loading'

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

// A component is concerned about
// Component
// State
// Lifecycle
// UI

// A component is a class which extends React.Component
class App extends React.Component {
    
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    }
    render() {
        // This is JSX, will be compiled by Babel
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            <Nav />
                            <React.Suspense fallback={<Loading />} >
                                <Switch>
                                    <Route exact path='/' component={Popular}/>
                                    <Route exact path='/battle' component={Battle}/>
                                    <Route path='/battle/results' component={Results} />
                                    {/* <Redirect from='/old' to='/new'/> */}
                                    <Route render={() => (<h1>404</h1>)}/>
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)