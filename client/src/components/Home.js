import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <Button>
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
