import React from 'react';
import './App.css';

class MouseCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas = () => {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    ctx.fillRect(this.props.x, this.props.y, 50, 50);
    ctx.fillRect(this.props.sx, this.props.sy, 50, 50);
  }

  render() {
    return (
      <canvas ref="canvas" width={500} height={500}
              x={this.props.x}
              y={this.props.y}
              onMouseMove={this.props.onMouseMove}/>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {x: 0, y: 0, sx: 0, sy: 0};
    this.socket = new WebSocket("ws://localhost:8081");

    this.socket.addEventListener('open', (event) => {
    });

    this.socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
      var data = JSON.parse(event.data);
      this.setState({sx: data.x, sy: data.y});
      //this.setState((state, props) => ({sx: state.sx + 1, sy: state.sy + 1}));
    });
  }

  _onMouseMove = (e) => {
    console.log("mouseMove");
    this.setState({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY});
    this.socket.send(JSON.stringify(this.state));
  }

  render() {
    return (
      <div className="App">
        <h1>Your mouse position: {this.state.x}, {this.state.y}</h1>
        <h1>According to the websocket: {this.state.sx}, {this.state.sy}</h1>
        <MouseCanvas x={this.state.x}
                     y={this.state.y}
                     sx={this.state.sx}
                     sy={this.state.sy}
                     onMouseMove={this._onMouseMove} />
      </div>
    );
  }
}

export default App;
