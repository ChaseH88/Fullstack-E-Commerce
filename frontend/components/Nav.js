import { Fragment } from "react";
import Link from "next/link";

// Styled Component
import NavStyles from "./styles/NavStyles"

// Regular Components
import User from "./User";

class Nav extends React.Component {
  render(){
    return(
      <User>
        {({ data: { currentUser } }) => (
          <NavStyles>
          <Link href="/items">
            <a>items</a>
          </Link>
          {currentUser && (
            <Fragment>
              <Link href="/sell">
                <a>sell</a>
              </Link>
              <Link href="/signup">
                <a>Logout</a>
              </Link>
            </Fragment>
          )}
          {!currentUser && (
            <Link href="/signup">
              <a>Login</a>
            </Link>
          )}
        </NavStyles>
        )}
      </User>
    );
  }
}

export default Nav;