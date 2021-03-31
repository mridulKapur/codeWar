import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SocketIOClient from "socket.io-client";
import App from "./App";
import Home from './Home';
const endpoint = "http://localhost:4333";
const socket = SocketIOClient(endpoint, { transports: ["websocket"] });

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomHash: 'xyzabc'
    }
  }
  
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Home roomHash={this.state.roomHash} />}></Route>
          <Route path={`/code/${this.state.roomHash}`} component={() => <App socket={socket} />}></Route>
        </Switch>
      </Router>
    );
  }
}

export default Main;
