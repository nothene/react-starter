import React from 'react';
import ReactDOM from 'react-dom/client';

import './App.css';

import Axios from 'axios';

export default class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      users: {},      
    };

    //this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    Axios.get('http://127.0.0.1:8000/users').then(
      (response) => {
        this.setState({          
          users: response,
          isLoaded: true,
        },
        
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });
      }
    );
  }

  render(){
    const error =  this.state.error;
    const isLoaded = this.state.isLoaded;
    const users =  this.state.users.data;    

    // if(isLoaded){
    //   console.log(users[0]);
    // }   

    if (isLoaded) {
      return(
        <div>
        <form id="create-user" action="http://127.0.0.1:8000/users/create" method="post">
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form> 
        <div>
          <ul>
            {
              users.map(user => (
              <li key={user.id}>
                {user.name}: {user.email}
              </li>
              ))
            }
          </ul>
        </div>
      </div>
      );
    }
  }
}
