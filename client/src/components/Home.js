import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.joinRoom = this.joinRoom.bind(this);
    this.state = {
      inputValue: "",
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  joinRoom = () => {
    this.props.socket.emit("joinRoom", {
      roomHash: this.props.roomHashDuo,
    });
  };

  render() {
    const inputChange = (e) => {
      console.log(e);
      this.setState({
        inputValue: e.target.value,
      });
    };

    return (
      <div className="home page">
        <div className="main">
          <div className="ui huge header inverted">
            <span className="span">Code Wars</span>
          </div>
          <div className="ui hidden divider"></div>
          <div className="input">
            <form action={`/code/solo/${this.state.inputValue}`}>
              <input
                type="text"
                placeholder="Join Room"
                name="room"
                onChange={inputChange}
              />
              <Link
                to={`/code/duo/${this.state.inputValue}`}
                className="ui button big inverted"
                onClick={this.joinRoom}
                id="button"
              >
                Duo
              </Link>
              <Link
                to={`/code/solo/${this.state.inputValue}`}
                className="ui button big inverted"
                id="button"
              >
                Solo
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
