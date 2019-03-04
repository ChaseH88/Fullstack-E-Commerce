import App, { Container } from "next/app";
import Page from "../components/Page";

// Apollo
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";


// This component will be on every single page
// this will store local state
class MyApp extends App {

  // Next.js lifecycle method - RUNS before render method
  // grabs all queries on the page and runs them no matter which page you're on
  static async getInitialProps({ Component, ctx }){
    let pageProps = {};
    if(Component.getInitialProps){
      //contains queries for corresponding page
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exporese the query to the user
    pageProps.query = ctx.query
    return { pageProps };
  }

  render(){
    // Destructured 
    const { Component, apollo, pageProps } = this.props;

    return(
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp);