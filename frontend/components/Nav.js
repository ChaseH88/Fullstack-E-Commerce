import Link from "next/link";

// Styled Component
import NavStyles from "./styles/NavStyles"

class Nav extends React.Component {
  render(){
    return(
      <NavStyles>
        <Link href="/items">
          <a>items</a>
        </Link>
        <Link href="/sell">
          <a>sell</a>
        </Link>
        <Link href="/signup">
          <a>signup</a>
        </Link>
        <Link href="/orders">
          <a>orders</a>
        </Link>
        <Link href="/me">
          <a>me</a>
        </Link>
      </NavStyles>
    )
  }
}

export default Nav;