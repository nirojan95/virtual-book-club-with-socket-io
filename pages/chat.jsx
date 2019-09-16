import Layout from "../components/MyLayout";
import React, { Component } from "react";
import io from "socket.io-client";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { hello: "" };
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on("now", data => {
      this.setState({ hello: data.message });
    });
  }

  render() {
    return (
      <Layout>
        <h1>{this.state.hello}</h1>
      </Layout>
    );
  }
}

export default Chat;
