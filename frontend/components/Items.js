import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from 'styled-components';

// Required for gql
import gql from "graphql-tag";

// Components
import Item from "./Item";

// Query
const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

// Styled Components
const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  render(){
    return(
      <Center>
        <p>Items</p>
        <Query query={ALL_ITEMS_QUERY}>
        {/*payload = payload.data, payload.error, etc*/}
          {({ data, error, loading }) => {
            if(loading) return <p>Loading...</p>;
            if(error) return <p>Error: {error.message}</p>;
            //map and return the data
            return( 
              <ItemsList>
                {data.items.map(item => 
                  <Item item={item} key={item.id} />
                  )}
              </ItemsList>
            )
          }}
        </Query>
      </Center>
    )
  }
}

export default Items;