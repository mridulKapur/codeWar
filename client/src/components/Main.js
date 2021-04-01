import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SocketIOClient from "socket.io-client";
import AppSolo from "./AppSolo";
import AppDuo from "./AppDuo";
import Home from './Home';
const endpoint = "http://localhost:4333";
const socket = SocketIOClient(endpoint, { transports: ["websocket"] });

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomHashSolo: 'solohash',
      roomHashDuo: 'duohash'
    }
  }
  
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Home roomHashSolo={this.state.roomHashSolo} roomHashDuo={this.state.roomHashDuo} socket={socket} />}></Route>
          <Route path={`/code/duo/${this.state.roomHashDuo}`} component={() => <AppDuo socket={socket} />}></Route>
          <Route path={`/code/solo/${this.state.roomHashSolo}`} component={() => <AppSolo />}></Route>
        </Switch>
      </Router>
    );
  }
}

export default Main;
