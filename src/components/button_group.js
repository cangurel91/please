import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import web3 from "../web3";
import rps from '../rps';

class ButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Pick one now to try your luck!',
      won: '',
      pick: '',
      color: ['black','black','black'],
      errMessage: '',
     };
  }

  onSubmit = async(event) => {
    this.setState({
      errMessage:''
    });
    try {
    const accounts = await web3.eth.getAccounts();

    await rps.methods.play().send({
      from: accounts[0],
      value: web3.utils.toWei("0.01",'ether')});

    const result = await rps.methods.won().call();

    if (result) {
      const color = this.state.color;
      color[(this.state.pick + 2) % 3] = "green";
      this.setState({
        message: 'YOU WON! Reload page to try your luck again',
        color
    });
  } else {
      const color = this.state.color;
      color[(this.state.pick + 1) % 3] = "red";
    this.setState({
      message: 'Damn it! Reload page to try your luck again',
      color
    });
    }
  } catch(err) {
    console.log(err);
    this.setState({
      message: 'Pick one now to try your luck!',
      color: ['black','black','black'],
    });
    if(err.message.indexOf('signature') >= 0){
      this.setState({
        errMessage: 'Canceled transaction'
      });
    } else if(err.message.indexOf('from') >= 0) {
      this.setState({
        errMessage: 'You must be logged in to your wallet to play'
      });
    } else {
      this.setState({
        errMessage: "Something doesn't feel right"
      });
    }
  }
  };

  rock = async() => {
      await this.setState({
        pick: 0,
        color: ['yellow','black','black'],
        message: "Hold on now Rocky..."
      });
      this.onSubmit();
    };

  paper = async() => {
      await this.setState({
        pick: 1,
        color: ['black','yellow','black'],
        message: "Checking papers..."
      });
      this.onSubmit();
    };

  scissors = async() => {
      await this.setState({
        pick: 2,
        color: ['black','black','yellow'],
        message: "Cutting right to the chase..."
      });
      this.onSubmit();
    };

  render() {
    return (
      <div>
      <Button onClick= {this.rock} icon>
        <Icon circular inverted color= {this.state.color[0]} name='hand rock outline' size= 'massive'/>
      </Button>
      <Button onClick= {this.paper} icon>
        <Icon circular inverted color= {this.state.color[1]} name='hand paper outline' size= 'massive'/>
      </Button>
      <Button onClick= {this.scissors} icon>
        <Icon circular inverted color= {this.state.color[2]} name='hand scissors outline' size= 'massive'/>
      </Button>
      <h4>{this.state.message}</h4>
      <h4 style={{color: "red"}}>{this.state.errMessage}</h4>
      </div>
    );
  }
}

export default ButtonGroup;
