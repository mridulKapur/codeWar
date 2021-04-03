import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.joinRoom = this.joinRoom.bind(this);
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
    return (
      <div className="home page">
        <div className="main">
          <div className="ui huge header inverted">
            <span className="span">Code Wars</span>
          </div>
          <div class="ui hidden divider"></div>
          <Link
            to={`/code/duo/${this.props.roomHashDuo}`}
            className="ui button big inverted"
            onClick={this.joinRoom}
            id="button"
          >
            Duo
          </Link>
          <Link
            to={`/code/solo/${this.props.roomHashSolo}`}
            className="ui button big inverted"
            id="button"
          >
            Solo
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
