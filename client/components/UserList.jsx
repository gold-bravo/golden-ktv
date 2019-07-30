import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserList extends Component {
  render() {
    const {users} = this.props
    const usersInList = users.map((user, index) => {
      return (
        <div className="user" key={index}>
          <span className="user-name">{user}</span>
        </div>
      )
    })

    return (
      <div className="users-in-party-list">
        <h2 className="title">Users in party</h2>
        {usersInList}
      </div>
    )
  }
}

const mSTP = state => ({
  credentials: state.roomReducer
})

export default connect(mSTP)(UserList)
