import React, { Component } from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import User from './User'

const root = document.getElementById('root')


class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      filtered: false
    }
    this.toggleFiltered = this.toggleFiltered.bind(this)
  }
  
  componentDidMount(){
    axios.get('/api/users')
      .then(response => response.data)
      .then(users => this.setState({ users }))
  }

  toggleFiltered() {
    this.setState({ filtered: !this.state.filtered })
  }
  
  render() {
    const { toggleFiltered } = this
    const { users, filtered } = this.state
    return (
      <div>
        <h1>Users</h1>
        <button onClick={ toggleFiltered }>{ filtered ? 'Show All' : 'Show Only Users with Things'}</button>
        {
          users.filter(user => !filtered || user.userThings.length > 0).map( user => <User key={ user.id } user={ user } />)          
        }
      </div>
    )
  }
}

render(<App />, root)