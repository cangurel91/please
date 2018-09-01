import React, { Component } from "react";
import web3 from "./web3";
import rps from './rps';
import CenteredContainer from './components/centered_container';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
    };
  }

  async componentDidMount(){

  }

  cashOut = async(event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await rps.methods.cashOut().send({
      from: accounts[0]
    });
  };

  render() {
    return (
      <div>
        <div style={{position: 'absolute', top: 10, left: 10, right: 10, bottom: 10, justifyContent: 'center', alignItems: 'center'}}>
          <CenteredContainer/>
        </div>
      <button onClick= {this.cashOut}>
      </button>
      </div>
    );
  }
}


export default App;
