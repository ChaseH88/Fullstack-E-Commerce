import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

// Styled Component
import Form from "./styles/Form";
import Error from "./ErrorMessage";

// Queries


// Mutation
const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!){
    requestReset(email: $email){
      message
    }
  }
`

class Signin extends Component {
  state = {
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
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => {
      return (<Form method="POST" onSubmit={async e =>{
        e.preventDefault();
        const res = await reset();
        console.log(res);
        this.setState({
          email: ""
        })
      }}>
        <fieldset disabled={loading} aria-busy={loading}>
        <Error error={error} />
          <h2>Request a Password Reset</h2>
          {/* check to see if reset password was requested */}
          {!error && !loading && called && <p>Check Your Email for Password Reset Link.</p>}
          <label htmlFor="email">
            Email
            <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.saveToState} />
          </label>
          <button type="submit">Request Reset</button>
        </fieldset>
      </Form>)
      }}
      </Mutation>
    )
  }
}

export default Signin;