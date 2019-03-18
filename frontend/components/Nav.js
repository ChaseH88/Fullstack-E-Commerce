import { Fragment } from "react";
import Link from "next/link";

// Styled Component
import NavStyles from "./styles/NavStyles"

// Regular Components
import User from "./User";
import Signout from "./Signout";

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
              <Signout />
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