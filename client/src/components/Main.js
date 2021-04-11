import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SocketIOClient from "socket.io-client";
import AppSolo from "./AppSolo";
import AppDuo from "./AppDuo";
import Home from "./Home";
const endpoint = "https://code-and-compete.herokuapp.com/";
const socket = SocketIOClient(endpoint, { transports: ["websocket"] });

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomHashSolo: "solohash",
      roomHashDuo: "duohash",
    };
    this.getRandomString = this.getRandomString.bind(this);
  }

  componentDidMount() {
    this.getRandomString(15);
    this.getRandomString(20);

  }

  getRandomString(length) {
    var randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    if (length == 15) {
      this.setState({
        roomHashSolo: result,
      });
    }
    if (length == 20) {
      this.setState({
        roomHashDuo: result,
      });
    }
  }

  render() {
    return (
      <Router>
        <Switch>
        <Route
            exact
            path="/"
            component={() => (
              <Home
                roomHashSolo={this.state.roomHashSolo}
                roomHashDuo={this.state.roomHashDuo}
                socket={socket}
              />
            )}
          ></Route>
          <Route
            path={`/code/duo/${this.state.roomHashDuo}`}
            component={() => <AppDuo socket={socket} />}
          ></Route>
          <Route
            path={`/code/solo/${this.state.roomHashSolo}`}
            component={() => <AppSolo socket={socket} />}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default Main;
