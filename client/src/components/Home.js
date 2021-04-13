import React from "react";
import { Link } from "react-router-dom";
import {} from "semantic-ui-react";
import "../styles/home.scss";

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
  joinSolo = () => {
    console.log('in jr')
    this.props.socket.emit("joinSolo", {
      roomHash: this.props.roomHashSolo
    });
  }
  createRoom = () => {
    console.log('in jr')
    this.props.socket.emit("joinRoom", {
      roomHash: this.props.roomHashDuo,
    });
  };

  render() {
    return (
			<div className='container'>
				<h1 className='title'>CodeWars</h1>
				<input className="inputBox" type='text' onChange={this.inputChange} />
				<div className="buttonContainer">
					<Link onClick={this.joinRoom} to={`/code/duo/${this.props.roomHashDuo}`}>
						<div className="link">Duo Join</div>
					</Link>

					<Link onClick={this.createRoom} to={`/code/duo/${this.props.roomHashDuo}`}>
						<div className="link">Duo Create</div>
					</Link>

					<Link onClick={this.joinSolo} to={`/code/solo/${this.props.roomHashSolo}`}>
						<div className="link">Solo</div>
					</Link>
				</div>
			</div>
		);
  }
}

export default Home;
