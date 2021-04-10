import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.joinRoom = this.joinRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.state = {
      inputValue: "",
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  inputChange = (e) => {
    this.setState({inputValue: e.target.value})
  }

  joinRoom = () => {
    console.log('in jr')
    this.props.socket.emit("joinRoom", {
      roomHash: this.state.inputValue,
    });
  };
  createRoom = () => {
    console.log('in jr')
    this.props.socket.emit("createRoom", {
      roomHash: this.props.roomHashDuo,
    });
  };

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <input type="text" onChange={this.inputChange}/>
        
          <Link to={`/code/duo/${this.props.roomHashDuo}`} onClick={this.joinRoom} className="ui button">
          Duo Join
          </Link>
        
          <Link to={`/code/duo/${this.props.roomHashDuo}`} onClick={this.createRoom} className="ui button">
          Duo Create
        </Link>
                  <Link to={`/code/solo/${this.props.roomHashSolo}`} className="ui button">
          Solo
        </Link>
      </div>
    );
  }
}

export default Home;
