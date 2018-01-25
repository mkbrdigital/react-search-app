import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TableList from './table-list';
import SearchBar from './search';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      items: []
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('https://randomuser.me/api?results=100&nat=us')
      .then(res => {
        return res.json()
      })
      .then(data => {
        let users = data.results.map((user, index) => {
          return user;
        })
        this.setState({
          users: users,
          items: users
        })
      })
  }

  handleChange(event) {
    let filters = this.state.users;
    filters = filters.filter((e) => {
      if (e.name.first.toLowerCase().includes(event.toLowerCase())) {
        return e.name.first.toLowerCase().search(
          event.toLowerCase()
        ) !== -1;
      }
      if (e.name.last.toLowerCase().includes(event.toLowerCase())) {
        return e.name.last.toLowerCase().search(
          event.toLowerCase()
        ) !== -1;
      }
      if (e.email.toLowerCase().includes(event.toLowerCase())) {
        return e.email.toLowerCase().search(
          event.toLowerCase()
        ) !== -1;
      }
      else {
        return null
      }
    })
    this.setState({
      items: filters
    })
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-container">
          <p className="App-intro">
            Fake data is being fetched from the <a href="https://randomuser.me/" target="_blank" rel="noopener noreferrer">Random User Generator</a> API.
          </p>
          <div className="App-container">
            <SearchBar onTermChange={this.handleChange} />
            <TableList users={this.state.items} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
