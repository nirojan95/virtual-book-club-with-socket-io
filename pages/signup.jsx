import Layout from "../components/MyLayout";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  usernameHandler = event => {
    this.setState({ username: event.target.value });
  };

  passwordHandler = event => {
    this.setState({ password: event.target.value });
  };

  signupHandler = async event => {
    event.preventDefault();
    let response = await fetch("/signupEndpoint", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });
    let responseBody = await response.text();
    let parsedBody = JSON.parse(responseBody);
    console.log(parsedBody);
    if (!parsedBody.success) {
      alert(parsedBody.msg);
      this.setState({ password: "", username: "" });
      return;
    }
    if (parsedBody.success) {
      console.log("parsedBody = ", responseBody);
      alert("Signup successful");
    }
  };

  render = () => {
    return (
      <Layout>
        <div>
          <form onSubmit={this.signupHandler}>
            <input
              type="text"
              name="username"
              placeholder="enter a username"
              onChange={this.usernameHandler}
            />
            <input
              type="password"
              name="password"
              placeholder="enter a password"
              onChange={this.passwordHandler}
            />
            <input type="submit" />
          </form>
        </div>
      </Layout>
    );
  };
}

export default Signup;
