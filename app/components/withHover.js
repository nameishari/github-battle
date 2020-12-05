import * as React from 'react'

// This is a higher order component which takes a component and return a new component
export default function withHover(Componet, propName='hovering') {
    return class WithHover extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                hovering: false
            }
            this.onMouseOut = this.onMouseOut.bind(this)
            this.onMouseOver = this.onMouseOver.bind(this)
        }

        onMouseOver() {
            this.setState({
                hovering: true
            })
        }
    
        onMouseOut() {
            this.setState({
                hovering: false
            })
        }
        render() {
            const props = {
                [propName]: this.state.hovering,
                ...this.props
            }
            return (
                <div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                    <Componet {...props}/>
                </div>
            )
        }
    }
}