import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

// Components
import Error from "./ErrorMessage";

// Styled Components
import Form from "./styles/Form";

// Utilities
import formatMoney from "../lib/formatMoney";

// GraphQL Mutation
const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    #set the variables
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      #pass the variables
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      #give id back when complete
      id
    }
  }
`

class CreateItem extends Component {
  
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: null
  }

  handleChange = (e) => {
    //grab the values from the event
    const { name, value, type } = e.target;
    //convert if a number
    const val = type === "number" ? parseFloat(value) : value;
    //set the state
    this.setState({
      [name]: val
    });
    console.log(this.state);
  }

  // Upload File
  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");

    const res = await fetch ("https://api.cloudinary.com/v1_1/chaseh88/image/upload", {
      method: "POST",
      body: data
    });
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  }

  render(){
    return(
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
        <Form onSubmit={async e => {
          // stop from default submit
          e.preventDefault();
          //call mutation
          const res = await createItem();
          // redirect to new item page
          Router.push({
            pathname: "/item",
            query: { id: res.data.createItem.id }
          })
        }}>
        <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="title">Title
              <input type="text" id="title" name="title" required value={this.state.title} onChange={this.handleChange} />
              {this.state.image && <img src={this.state.image} alt="Upload Preview" />}
            </label>
            <label htmlFor="price">Price
              <input type="number" id="price" name="price" required value={this.state.price} onChange={this.handleChange} />
            </label>
            <label htmlFor="price">Description
              <textarea type="text" id="description" name="description" required value={this.state.description} onChange={this.handleChange} />
            </label>
            <label htmlFor="file">Image
              <input type="file" id="file" name="file" required onChange={this.uploadFile} />
            </label>
            <button type="submit">Submit</button>
          </fieldset>
        </Form>
      )}
      </Mutation>
    )
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };