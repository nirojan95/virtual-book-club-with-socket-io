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
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/signup", { method: "POST", body: data });
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
              onChange={this.usernameHandler}
            />
            <input type="submit" />
          </form>
        </div>
      </Layout>
    );
  };
}

export default Signup;
