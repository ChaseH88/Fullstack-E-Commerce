import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

// Styled Component
import Form from "./styles/Form";
import Error from "./ErrorMessage";

// Queries
import { CURRENT_USER_QUERY } from "./User";

// Mutation
const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($name: String!, $email: String!, $password: String!){
    signup(name: $name, email: $email, password: $password){
      id
      email
      name
    }
  }
`

class Signup extends Component {
  state = {
    name: "",
    password: "",
    email: ""
  }

  // Update the state on user input
  saveToState = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render(){
    return(
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state} refetchQueries={[
        {query: CURRENT_USER_QUERY}
      ]}>
        {(signup, { error, loading }) => {
      return (<Form method="POST" onSubmit={async e =>{
        e.preventDefault();
        const res = await signup();
        console.log(res);
        this.setState({
          name: "",
          password: "",
          email: ""
        })
      }}>
        <fieldset disabled={loading} aria-busy={loading}>
        <Error error={error} />
          <h2>Signup for an account</h2>
          <label htmlFor="email">
            Email
            <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.saveToState} />
          </label>
          <label htmlFor="name">
            Name
            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.saveToState} />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.saveToState} />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </Form>)
      }}
      </Mutation>
    )
  }
}

export default Signup;