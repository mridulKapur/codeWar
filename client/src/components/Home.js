import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.joinRoom = this.joinRoom.bind(this);
  }

  componentDidMount() {
    console.log(this.props)
  }

  joinRoom = () => {
    this.props.socket.emit('joinRoom', {
      roomHash: this.props.roomHashDuo
    })
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <Button onClick={this.joinRoom}>
          <Link to={`/code/duo/${this.props.roomHashDuo}`}>
          Duo
        </Link>
        </Button>
        <Button>
          <Link to={`/code/solo/${this.props.roomHashSolo}`}>
          Solo
        </Link>
        </Button>
      </div>
    );
  }
}

export default Home;
