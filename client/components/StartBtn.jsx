import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {withRouter} from 'react-router-dom'

class StartBtn extends Component {
  onClick = () => {
    const body = ReactDOM.findDOMNode(app)
    this.start.style.opacity = 0
    body.parentNode.style.backgroundColor = 'rgba(1, 1, 1, 0.5)'
    setTimeout(() => {
      this.props.history.push('/guest')
    }, 400)
  }
  render() {
    return (
      <input
        style={{marginLeft: '43vw'}}
        ref={e => {
          this.start = e
        }}
        onClick={this.onClick}
        type="button"
        value="START NOW"
        className="button is-primary is-warning is-large"
        id="start"
      />
    )
  }
}

export default withRouter(StartBtn)
